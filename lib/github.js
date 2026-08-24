import projectData from '@data/projects.json'

const GITHUB_API = 'https://api.github.com'
const REQUEST_TIMEOUT_MS = 5000

const githubHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'novandra-portfolio'
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return headers
}

const fetchGitHub = async path => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${GITHUB_API}${path}`, {
      headers: githubHeaders(),
      signal: controller.signal
    })

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`)
    }

    return response.json()
  } finally {
    clearTimeout(timeout)
  }
}

const findProjectConfig = repo =>
  projectData.projects.find(
    project => project.repo.toLowerCase() === repo.toLowerCase()
  )

const titleFromRepo = repo =>
  repo
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const normalizeProject = (repo, fallback) => ({
  repo: repo.name,
  title: fallback?.title || titleFromRepo(repo.name),
  description:
    fallback?.description || repo.description || 'Currently in development.',
  url: repo.html_url,
  homepage: repo.homepage || null,
  language: repo.language || null,
  updatedAt: repo.pushed_at || null
})

const localFallback = projectData.projects
  .filter(project => project.status === 'building')
  .slice(0, projectData.buildingLimit)
  .map(project => ({
    ...project,
    url: `https://github.com/${projectData.githubOwner}/${project.repo}`,
    homepage: project.homepage || null,
    language: null,
    updatedAt: null
  }))

const fetchTopicProjects = async () => {
  const repos = await fetchGitHub(
    `/users/${projectData.githubOwner}/repos?type=owner&sort=pushed&per_page=100`
  )

  return repos
    .filter(
      repo =>
        !repo.fork &&
        !repo.archived &&
        repo.name.toLowerCase() !== 'novandra' &&
        repo.topics?.includes(projectData.buildingTopic)
    )
    .slice(0, projectData.buildingLimit)
    .map(repo => normalizeProject(repo, findProjectConfig(repo.name)))
}

const enrichFallbackProjects = async () => {
  const projects = await Promise.allSettled(
    localFallback.map(project =>
      fetchGitHub(
        `/repos/${projectData.githubOwner}/${encodeURIComponent(project.repo)}`
      )
    )
  )

  return projects.map((result, index) =>
    result.status === 'fulfilled'
      ? normalizeProject(result.value, localFallback[index])
      : localFallback[index]
  )
}

export const getBuildingProjects = async () => {
  try {
    const topicProjects = await fetchTopicProjects()

    if (topicProjects.length > 0) {
      return topicProjects
    }
  } catch (error) {
    console.warn(`Unable to load GitHub building topics: ${error.message}`)
  }

  try {
    return await enrichFallbackProjects()
  } catch (error) {
    console.warn(`Unable to enrich GitHub projects: ${error.message}`)
    return localFallback
  }
}

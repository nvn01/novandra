import Page from '@components/page'
import Link from '@components/link'
import { ArrowUpRight } from '@components/icons'
import { getBuildingProjects } from '@lib/github'
import profile from '@data/profile.json'
import portfolio from '@data/portfolio.json'
import publications from '@data/publications.json'
import styles from './index.module.css'

const About = ({ buildingProjects }) => {
  const featuredProjects = portfolio.featured
    .filter(project => project.title !== 'RECON')
    .slice(0, 2)
  const featuredPublication = publications.data[0]
  const projectSummaries = {
    'Tanya Pajak AI': 'Indonesian tax answers powered by RAG.',
    'Bubbles IDX': 'A live market map for Indonesian stocks.'
  }

  return (
    <Page home description={`${profile.headline} ${profile.summary}`}>
      <article className={styles.homeArticle}>
        <h1>{profile.name}</h1>

        <p>
          <em>{profile.headline}</em>
        </p>
        <p>{profile.summary}</p>

        <section className={styles.contentGrid}>
          <div className={styles.column}>
            <h2>Building</h2>
            <ul>
              {buildingProjects.map(project => (
                <li className={styles.item} key={project.repo}>
                  <div className={styles.itemTitle}>
                    <Link underline href={project.url} external>
                      <span className={styles.externalLinkLabel}>
                        <strong>{project.title}</strong>
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  </div>
                  <p className={styles.itemDescription}>
                    {project.description}
                  </p>
                  {project.updatedAt && (
                    <span className={styles.projectMeta}>
                      Updated{' '}
                      {new Date(project.updatedAt).toLocaleDateString('en', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        timeZone: 'UTC'
                      })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2>Projects</h2>
            <ul>
              {featuredProjects.map(project => (
                <li className={styles.item} key={project.title}>
                  <div className={styles.itemTitle}>
                    <Link underline href={project.href} external>
                      <span className={styles.externalLinkLabel}>
                        {project.title}
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  </div>
                  <p className={styles.itemDescription}>
                    {projectSummaries[project.title] || project.description}
                  </p>
                </li>
              ))}
              <li className={styles.item}>
                <div className={styles.itemTitle}>
                  <Link underline href="/projects">
                    More Projects
                  </Link>
                </div>
                <p className={styles.itemDescription}>
                  Data, infrastructure, and earlier work.
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2>Writing</h2>
            <ul>
              <li className={styles.item}>
                <div className={styles.itemTitle}>
                  <Link underline href={featuredPublication.url} external>
                    <span className={styles.externalLinkLabel}>
                      Tanya Pajak AI Research
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </div>
                <p className={styles.itemDescription}>
                  A RAG tax assistant tested with tax experts.
                </p>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTitle}>
                  <Link underline href="/publications">
                    Publications
                  </Link>
                </div>
                <p className={styles.itemDescription}>
                  Research and community work.
                </p>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTitle}>
                  <Link underline href="/blog">
                    Template Writing Archive
                  </Link>
                </div>
                <p className={styles.itemDescription}>
                  Paco&apos;s original writing, kept as a reference.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.readingSection}>
          <h2>Now</h2>
          {profile.now.map(item => (
            <p key={item}>{item}</p>
          ))}
        </section>

        <section className={styles.readingSection}>
          <h2>About</h2>
          <p>
            My work sits between backend engineering, retrieval systems, data
            ingestion, and infrastructure. Read the longer story on the{' '}
            <Link underline href="/about">
              about page
            </Link>
            .
          </p>
        </section>

        <section className={styles.readingSection}>
          <h2>Connect</h2>
          <p>
            Reach me at{' '}
            <Link underline href={profile.links.twitter} external>
              @novandraanugrah
            </Link>{' '}
            or{' '}
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>.
          </p>
        </section>
      </article>

    </Page>
  )
}

export const getStaticProps = async () => ({
  props: {
    buildingProjects: await getBuildingProjects()
  },
  revalidate: 3600
})

export default About

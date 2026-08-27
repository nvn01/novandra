import Page from '@components/page'
import Entry from '@components/entry'
import TextEntry from '@components/entry/text'
import Link from '@components/link'

import portfolio from '@data/portfolio.json'
import templateProjects from '@data/template-projects.json'

const Projects = () => {
  return (
    <Page
      title="Projects"
      description="Selected products, data tools, infrastructure, and earlier work by Novandra Anugrah."
    >
      <article>
        <p>
          Products and experiments built around applied AI, data collection,
          backend systems, and infrastructure.
        </p>

        {portfolio.featured.map(project => (
          <Entry
            key={project.title}
            title={project.title}
            description={`${project.status} — ${project.description}`}
            image={project.image}
            href={project.href}
            position={project.position || 'top'}
          />
        ))}

        <h2>Data, Infrastructure, and Earlier Work</h2>
        <ul>
          {portfolio.supporting.map(project => (
            <TextEntry
              key={project.title}
              title={project.title}
              description={project.description}
              type={project.type}
              href={project.href}
            />
          ))}
        </ul>

        <h2>Paco Template Archive</h2>
        <p>
          The original project collection from{' '}
          <Link underline href={templateProjects.sourceUrl} external>
            {templateProjects.source}
          </Link>{' '}
          is intentionally preserved below while this portfolio is rebuilt.
        </p>

        {templateProjects.data.map(project => (
          <Entry
            key={project.title}
            title={project.title}
            description={project.description}
            image={project.image}
            href={project.href}
            position={project.position}
          />
        ))}
      </article>
    </Page>
  )
}

export default Projects

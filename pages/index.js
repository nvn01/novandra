import Page from '@components/page'
import Link from '@components/link'
import { ArrowUpRight } from '@components/icons'
import { getBuildingProjects } from '@lib/github'
import profile from '@data/profile.json'
import portfolio from '@data/portfolio.json'
import publications from '@data/publications.json'

const About = ({ buildingProjects }) => {
  const featuredProjects = portfolio.featured.slice(0, 3)
  const featuredPublication = publications.data[0]

  return (
    <Page description={`${profile.headline} ${profile.summary}`}>
      <article>
        <h1>{profile.name}</h1>

        <p>
          <em>{profile.headline}</em>
        </p>
        <p>{profile.summary}</p>

        <section className="content-grid">
          <div className="column">
            <h2>Building</h2>
            <ul>
              {buildingProjects.map(project => (
                <li key={project.repo}>
                  <Link underline href={project.url} external>
                    <span className="external-link-label">
                      <strong>{project.title}</strong>
                      <ArrowUpRight size={13} />
                    </span>
                  </Link>{' '}
                  - {project.description}
                  {project.updatedAt && (
                    <span className="project-meta">
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

          <div className="column">
            <h2>Projects</h2>
            <ul>
              {featuredProjects.map(project => (
                <li key={project.title}>
                  <Link underline href={project.href} external>
                    <span className="external-link-label">
                      {project.title}
                      <ArrowUpRight size={13} />
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link underline href="/projects">
                  More Projects
                </Link>
              </li>
            </ul>
          </div>

          <div className="column">
            <h2>Writing</h2>
            <ul>
              <li>
                <Link underline href={featuredPublication.url} external>
                  <span className="external-link-label">
                    Tanya Pajak AI Research
                    <ArrowUpRight size={13} />
                  </span>
                </Link>
              </li>
              <li>
                <Link underline href="/publications">
                  Publications
                </Link>
              </li>
              <li>
                <Link underline href="/blog">
                  Template Writing Archive
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Now</h2>
          {profile.now.map(item => (
            <p key={item}>{item}</p>
          ))}
        </section>

        <section>
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

        <section>
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

      <style jsx>{`
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .column {
          padding: 1rem;
        }
        h1,
        h2,
        h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 0.9rem;
        }
        ul {
          list-style: none;
          padding-left: 0;
        }
        li {
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .project-meta {
          display: block;
          margin-top: 0.25rem;
          color: var(--gray);
          font-size: 0.75rem;
          letter-spacing: 0;
        }
        .external-link-label {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          white-space: nowrap;
        }
        .external-link-label :global(svg) {
          flex: none;
          color: var(--gray);
        }
      `}</style>
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

import Page from '@components/page'
import Link from '@components/link'

const About = () => {
  return (
    <Page description="Hi, I'm Novandra Anugrah. Computer science student, developer, and tech enthusiast.">
      <article>
        <h1>Novandra Anugrah</h1>

        <p>
          <em>Crafting experiences.</em> Exploring creativity through code and
          design.
        </p>
        <p>
          Currently a Computer Science student aspiring to work on impactful
          tech projects.
        </p>

        <section className="content-grid">
          <div className="column">
            <h3>Building</h3>
            <ul>
              <li>
                <strong>Project A</strong> - Experimenting with web interfaces
                and interactions.
              </li>
            </ul>
          </div>

          <div className="column">
            <h3>Projects</h3>
            <ul>
              <li>
                <Link underline href="https://github.com/your-project" external>
                  Your GitHub Project ↗
                </Link>
              </li>
              <li>
                <Link underline href="/projects">
                  More Projects
                </Link>
              </li>
            </ul>
          </div>

          <div className="column">
            <h3>Writing</h3>
            <ul>
              <li>
                <Link underline href="/blog/react-hooks">
                  Exploring React Hooks
                </Link>
              </li>
              <li>
                <Link underline href="/blog">
                  All Writing
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Now</h2>
          <p>
            Currently learning new technologies, developing coding skills, and
            exploring design. Striving to bring creativity into each project I
            work on.
          </p>
          <p>
            Enjoying the challenge of building efficient and clean user
            experiences while having fun with side projects.
          </p>
        </section>

        <section>
          <h2>Connect</h2>
          <p>
            Reach me at [your email address] or follow me on [your social media
            link].
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
      `}</style>
    </Page>
  )
}

export default About

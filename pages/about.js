import Page from '@components/page'
import Link from '@components/link'

import profile from '@data/profile.json'

const About = () => {
  return (
    <Page
      title="About"
      description="About Novandra Anugrah, a software builder focused on backend systems, applied AI, data collection, and infrastructure."
    >
      <article>
        <p>
          <em>{profile.headline}</em>
        </p>
        <p>{profile.summary}</p>

        <p>
          I am based in {profile.location}. A recurring theme in my work is
          finding information that is scattered or difficult to use, building a
          reliable ingestion or retrieval layer around it, and turning it into a
          product people can understand.
        </p>

        <h2>Focus</h2>
        <p>
          Backend engineering, data acquisition and normalization,
          retrieval-augmented generation, scheduled data pipelines, PostgreSQL,
          Docker, Linux, and product-oriented frontend development.
        </p>

        <h2>Experience</h2>
        <p>
          In 2025, I worked with a three-person internship team at KSPPS BMT
          Fatihul Barokah, leading the core technical implementation of a React
          Native and Expo mobile prototype for digital member services. Earlier,
          I worked in an insurance-agency environment, learning customer-facing
          operations and the repetitive workflows that later inspired an
          internal insurance-management application.
        </p>

        <h2>Beyond the Application</h2>
        <p>
          I maintain a personal homelab using Proxmox, Linux virtual machines,
          Docker, and self-hosted services. It is where I learn what happens
          after an application leaves a laptop: deployment, networking,
          persistence, monitoring, and recovery.
        </p>

        <h2>Elsewhere</h2>
        <p>
          Find my work on{' '}
          <Link underline href={profile.links.github} external>
            GitHub
          </Link>
          , datasets on{' '}
          <Link underline href={profile.links.kaggle} external>
            Kaggle
          </Link>
          , or my professional history on{' '}
          <Link underline href={profile.links.linkedin} external>
            LinkedIn
          </Link>
          .
        </p>

        <h2>Template</h2>
        <p>
          This website keeps the original structure and interaction ideas of{' '}
          <Link underline href="https://paco.me" external>
            Paco Coursey&apos;s portfolio
          </Link>
          . His original collections remain available as a clearly labelled
          template archive while my own material is added.
        </p>
      </article>
    </Page>
  )
}

export default About

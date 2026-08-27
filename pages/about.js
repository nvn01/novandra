import Page from '@components/page'
import Link from '@components/link'

import profile from '@data/profile.json'

const About = () => {
  return (
    <Page
      title="About"
      description="About Novandra Anugrah, a software builder working across web, mobile, AI, design, data mining, and systems for complex operations."
    >
      <article>
        <p>
          <em>{profile.headline}</em>
        </p>
        <p>{profile.summary}</p>

        <p>
          I am based in {profile.location}. AI has changed the scale of what one
          developer can attempt. I am interested in ideas that sit somewhere
          between a side project, a startup, and “too big”—then turning them
          into working websites, native software, and complete systems.
        </p>

        <h2>Focus</h2>
        <p>
          Web, mobile, AI, digital design, data mining, and end-to-end software
          systems for complex operational work—from business workflows to
          integrations with real hardware.
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

        <h2>{profile.studio.name}</h2>
        <p>
          I manage {profile.studio.name}, an independent digital studio with
          two arms: app-pixel for business software and operational systems,
          and Repixel for websites and digital design shaped with human taste.
          Its website is still in development. RECON and Bubbles IDX are
          independent products presented under its portfolio, not client work.
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

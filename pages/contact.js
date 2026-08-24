import Page from '@components/page'
import Link from '@components/link'
import profile from '@data/profile.json'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch.</p>

        <blockquote>
          <a
            href={`mailto:${profile.links.email}?subject=Hello`}
            className="reset"
          >
            {profile.links.email}
          </a>
        </blockquote>

        <p>
          You can also find me on{' '}
          <Link underline href={profile.links.github} external>
            GitHub
          </Link>{' '}
          and{' '}
          <Link underline href={profile.links.linkedin} external>
            LinkedIn
          </Link>
          .
        </p>
      </article>
    </Page>
  )
}

export default Contact

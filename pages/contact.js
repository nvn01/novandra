import Page from '@components/page'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch.</p>

        <blockquote>
          <a
            href="mailto:novandraanugrah91@gmail.com?subject=Hello"
            className="reset"
          >
            novandraanugrah91@gmail.com
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contact

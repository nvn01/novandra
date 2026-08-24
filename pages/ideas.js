import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'
import Link from '@components/link' // eslint-disable-line

const Ideas = ({ html }) => {
  return (
    <Page
      title="Ideas"
      description="A collection of my personal ideas for side projects and blog posts, aiming to inspire future work."
    >
      <article>
        <p>
          Paco&apos;s original ideas remain below. New Novandra projects will be
          appended without removing this archive.
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/ideas.md')

  return {
    props: {
      html: md
    }
  }
}

export default Ideas

import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'
import Link from '@components/link' // eslint-disable-line

const Ideas = ({ html }) => {
  return (
    <Page
      title="Ideas"
      description="A collection of my personal ideas for side projects and blog posts, aiming to inspire future work."
    >
      <article dangerouslySetInnerHTML={{ __html: html }} />
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

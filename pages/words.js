import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'

const Words = ({ html }) => {
  return (
    <Page
      title="Words"
      description="Collection of words I read but didn't understand."
    >
      <article>
        <p>
          Original Paco template collection, preserved while my own notes are
          added.
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/words.md')

  return {
    props: {
      html: md
    }
  }
}

export default Words

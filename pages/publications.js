import Page from '@components/page'
import Entry from '@components/entry/text'

import publications from '@data/publications.json'

const Publications = () => {
  return (
    <Page
      title="Publications"
      description="Research and community publications by Novandra Anugrah."
    >
      <article>
        <p>
          Published work across applied AI, financial technology, and community
          education.
        </p>
        <ul>
          {publications.data.map(entry => (
            <Entry
              key={entry.title}
              title={entry.title}
              description={entry.description}
              type={entry.key}
              href={entry.url}
            />
          ))}
        </ul>
      </article>
    </Page>
  )
}

export default Publications

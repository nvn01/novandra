import Page from '@components/page'
import Entry from '@components/entry'

// Data
import { data as items } from '@data/music.json'

const Music = () => {
  return (
    <Page
      title="Music"
      description="Original Paco template music collection, preserved during the portfolio rebuild."
    >
      <article>
        <p>
          Original Paco template collection, preserved while my personal music
          archive is added.
        </p>
        {items.map(entry => {
          return (
            <Entry
              key={entry.title}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              description={entry.description}
            />
          )
        })}
      </article>
    </Page>
  )
}

export default Music

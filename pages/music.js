import Page from '@components/page'
import Entry from '@components/entry'

// Data
import music from '@data/music.json'

const items = music.data

const Music = () => {
  return (
    <Page
      title="Music"
      description="Public Spotify playlists curated by Novandra Anugrah."
    >
      <article>
        <p>A small set of public playlists I return to.</p>
        {items.map(entry => {
          return (
            <Entry
              key={entry.url}
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

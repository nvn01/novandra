import Page from '@components/page'
import TextEntry from '@components/entry/text'

import analog from '@data/analog.json'

const films = analog.data

const Analog = () => {
  return (
    <Page
      title="Analog Film"
      description="An index of analog film stocks used by Novandra Anugrah."
    >
      <article>
        <p>
          An index of the film stocks I have used. Individual pages are
          ready for scans and notes later.
        </p>
        <ul>
          {films.map(film => (
            <TextEntry
              key={film.slug}
              title={film.title}
              href="/analog/[slug]"
              as={`/analog/${film.slug}`}
            />
          ))}
        </ul>
      </article>
    </Page>
  )
}

export default Analog

import Page from '@components/page'
import Entry from '@components/entry'
import TextEntry from '@components/entry/text'

// Data
import { data } from '@data/design.json'

const Design = () => {
  const imageItems = data.filter(x => x.image)
  const nonImageItems = data.filter(x => !x.image)

  return (
    <Page
      title="Design"
      description="A collection of beautiful websites and portfolios that I admire, reflecting my inspiration and design preferences."
    >
      <article>
        {imageItems.map(entry => {
          return (
            <Entry
              key={`${entry.title}-${entry.url}`}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              type={entry.key}
              description={entry.description}
            />
          )
        })}

        {nonImageItems.map(entry => {
          return (
            <TextEntry
              key={`${entry.title}-${entry.url}`}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              type={entry.key}
              description={entry.description}
            />
          )
        })}
      </article>
    </Page>
  )
}

export default Design

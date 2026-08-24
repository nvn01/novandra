import Page from '@components/page'
import Entry from '@components/entry'
import TextEntry from '@components/entry/text'

// Data
import { data } from '@data/design.json'
import portfolio from '@data/portfolio.json'

const Design = () => {
  const imageItems = data.filter(x => x.image)
  const nonImageItems = data.filter(x => !x.image)

  return (
    <Page
      title="Design"
      description="A collection of beautiful websites and portfolios that I admire, reflecting my inspiration and design preferences."
    >
      <article>
        <h2>Design Work and Experiments</h2>
        <ul>
          {portfolio.supporting
            .filter(entry => entry.type === 'Design lab')
            .map(entry => (
              <TextEntry
                key={entry.title}
                title={entry.title}
                href={entry.href}
                type={entry.type}
                description={entry.description}
              />
            ))}
        </ul>

        <h2>Original Template Inspiration Archive</h2>
        <p>
          Paco&apos;s original collection is preserved below as design reference
          material while my own work is added.
        </p>
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

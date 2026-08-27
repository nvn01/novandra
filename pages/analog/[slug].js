import Page from '@components/page'

import analog from '@data/analog.json'

const films = analog.data

const AnalogRoll = ({ film }) => {
  return (
    <Page
      title={film.title}
      description={`Analog film stock: ${film.title}.`}
    >
      <article />
    </Page>
  )
}

export const getStaticProps = ({ params: { slug } }) => {
  const film = films.find(item => item.slug === slug)

  if (!film) {
    return { notFound: true }
  }

  return { props: { film } }
}

export const getStaticPaths = () => ({
  paths: films.map(film => ({ params: { slug: film.slug } })),
  fallback: false
})

export default AnalogRoll

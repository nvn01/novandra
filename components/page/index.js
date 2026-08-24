import Head from '@components/head'
import Header from '@components/header'
import styles from './page.module.css'

const Page = ({
  header = true,
  footer = true,
  title,
  description,
  image,
  showHeaderTitle = true,
  home = false,
  children
}) => {
  return (
    <div
      className={`${styles.wrapper} ${home ? styles.homeWrapper : ''}`}
    >
      <Head
        title={`${title ? `${title} - ` : ''}Novandra Anugrah`}
        description={description}
        image={image}
      />

      {header && <Header home={home} title={showHeaderTitle && title} />}
      <main className={`${styles.main} ${home ? styles.homeMain : ''}`}>
        {children}
      </main>
    </div>
  )
}

export default Page

import NextHead from 'next/head'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const BASE_URL = `https://novandra.vercel.app`
const defaultOgImage =
  'https://res.cloudinary.com/do88fwqec/image/upload/v1733386910/og-image.png'
const useCurrentPath = () => useRouter().asPath.split('?')[0]

const Head = ({
  title = 'Novandra Anugrah',
  description = "Hi, I'm Novandra Anugrah, a computer science student and tech enthusiast.",
  image = defaultOgImage,
  children
}) => {
  const { systemTheme } = useTheme()
  const path = useCurrentPath()

  return (
    <NextHead>
      {/* Preload font */}
      <link
        rel="preload"
        href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Title */}
      <title>{title}</title>
      <meta name="og:title" content={title} />

      {/* Description */}
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />

      {/* Image */}
      <meta name="twitter:image" content={image} />
      <meta name="og:image" content={image} />

      {/* URL */}
      <meta name="og:url" content="https://novandra.vercel.app" />
      <link key="canonical" rel="canonical" href={BASE_URL + path} />

      {/* General */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@novandraanugrah" />
      <meta name="apple-mobile-web-app-title" content="Novandra" />
      <meta name="author" content="Novandra Anugrah" />

      {/* RSS feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for novandra.vercel.app"
        href="/feed.xml"
      />

      {/* Favicons */}
      <link rel="manifest" href="/favicons/manifest.json" />
      <meta name="theme-color" content="#000000" />
      <link rel="mask-icon" href="/favicons/pinned.svg" color="#000000" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />

      {/* Dynamic favicon */}
      {!systemTheme || systemTheme === 'dark' ? (
        <>
          <link
            rel="alternate icon"
            type="image/png"
            href="/favicons/dark.png"
            key="dynamic-favicon-alternate"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/favicons/dark.svg"
            key="dynamic-favicon"
          />
        </>
      ) : (
        <>
          <link
            rel="alternate icon"
            type="image/png"
            href="/favicons/light.png"
            key="dynamic-favicon-alternate"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/favicons/light.svg"
            key="dynamic-favicon"
          />
        </>
      )}
      {children}
    </NextHead>
  )
}

export default Head

const fs = require('fs')
const RSS = require('rss')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

// Read all posts from the posts directory
const posts = fs
  .readdirSync(path.resolve(__dirname, '../posts/'))
  .filter(file => path.extname(file) === '.md')
  .map(file => {
    const postContent = fs.readFileSync(`./posts/${file}`, 'utf8')
    const { data, content } = matter(postContent)
    return { ...data, body: content }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

// Custom renderer for links in markdown content
const renderer = new marked.Renderer()

renderer.link = (href, _, text) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  renderer
})

const renderPost = md => marked(md)

const main = () => {
  // Create the RSS feed
  const feed = new RSS({
    title: 'Novandra Anugrah',
    site_url: 'https://novandra.vercel.app',
    feed_url: 'https://novandra.vercel.app/feed.xml',
    image_url: 'https://novandra.vercel.app/og.png',
    language: 'en'
  })

  // Add each post to the feed
  posts.forEach(post => {
    const url = `https://novandra.vercel.app/blog/${post.slug}`

    feed.item({
      title: post.title,
      description: renderPost(post.body),
      date: new Date(post.date),
      author: 'Novandra Anugrah',
      url,
      guid: url
    })
  })

  // Write the RSS feed to a file
  const rss = feed.xml({ indent: true })
  fs.writeFileSync(path.join(__dirname, '../public/feed.xml'), rss)
}

main()

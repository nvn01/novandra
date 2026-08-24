import React from 'react'

import Page from '@components/page'
import PostsList from '@components/posts-list'
import Link from '@components/link'
import getPosts from '@lib/get-posts'

const Blog = ({ posts }) => {
  return (
    <Page
      title="Blog"
      description="The original Paco portfolio writing archive, preserved during Novandra's portfolio rebuild."
    >
      <article>
        <p>
          These posts are preserved from the original{' '}
          <Link underline href="https://paco.me" external>
            Paco Coursey
          </Link>{' '}
          template and are not presented as my writing. My published work is on
          the{' '}
          <Link underline href="/publications">
            publications page
          </Link>
          .
        </p>
        <ul>
          <PostsList posts={posts} />
        </ul>
      </article>
    </Page>
  )
}

export const getStaticProps = () => {
  const posts = getPosts()

  return {
    props: {
      posts
    }
  }
}

export default Blog

import { InferGetStaticPropsType } from 'next'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'

const Container = styled.div`
  padding: 40px 0;
`
const BlogTitle = styled.h1`
  margin: 0 auto;
  color: navy;
  text-align: center;
`

const title: string = "Next.js + TypeScript"

const List = styled.ul`
  list-style: square;
`

const ListItem = styled.li`
  padding: 10px;
  text-transform: capitalize;
  margin: 20px 0;
  cursor: pointer;
  color: #252525;
  font-size: 1em;

  &:hover {
    background: #f0f0f0;
  }
`

const PostTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container className={styles.container}>
      <BlogTitle>{title}</BlogTitle>
      <List>
        {posts.map(post => (
          <ListItem key={post.id}>
            <a href={`/posts/${post.id}`}>
              <PostTitle>{post.title}</PostTitle>
            </a>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")

  const posts: Post[] = await res.json()

  return {
    props: {
      posts
    }
  }
}
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Content from '../components/Content';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../types';

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className=" max-w-4xl mx-auto">
      <Head>
        <title>Madillus Blogged</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Content posts={posts} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}

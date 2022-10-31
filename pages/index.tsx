import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../types';

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto ">
      <Head>
        <title>Madillus Blogged</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <Header />
      <Hero />
      <Content posts={posts} />
      <div className="flex grow"></div>
      <Footer />
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

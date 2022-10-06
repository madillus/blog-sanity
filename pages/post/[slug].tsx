import { GetStaticProps } from 'next';
import PortableText from 'react-portable-text';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../types';

interface Props {
  post: Post
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />
      {post.mainImage && (
        <img
          className=" h-40 w-full object-cover max-w-4xl mx-auto lg:h-60"
          src={urlFor(post.mainImage).url()!}
          alt="Main image"
          // width="40%"
          // height="40%"
        />
      )}

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className=" h-12 w-10 rounded-lg"
            src={urlFor(post.author.image).url()!}
            alt="Author Image"
            // width="50%"
            // height="50%"
          />
          <p className="font-extralight text-xs">
            Blog post by <span className="font-bold">{post.author.name}</span> -
            Published at{' '}
            {new Date(post._createdAt).toLocaleString('at-AT', {
              timeZone: 'UTC',
            })}
          </p>
        </div>

        <div>
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANIY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-3xl my-10 mx-auto border border-violet-600" />
    </main>
  )
}
export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
  slug {
    current
  }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
    name,
    image
  },
  'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true],
  description,
  mainImage,
  slug,
  body[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      },
    },
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 86400,
  }
}

// image: (props: any) => (
//   <img
//     className="w-auto h-auto object-cover"
//     imageOptions={{
//       width: 500,
//       height: 500,
//     }}
//     // width="40%"
//     // height="40%"
//     {...props}
//   />
// ),

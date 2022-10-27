import Image from 'next/image';
import Link from 'next/link';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../types';

interface Props {
  posts: [Post]
}

function Content({ posts }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border rounded-lg group cursor-pointer align-middle overflow-hidden">
                {post.mainImage && (
                  <img
                    className=" h-60 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200 ease-in-out"
                    src={urlFor(post.mainImage).url()!}
                    alt="Main image"
                    // width="40%"
                    // height="40%"
                  />
                )}
                <div className="flex justify-between items-center p-5 bg-white">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {post.description} by{' '}
                      <span className="text-sm italic font-semibold">
                        {post.author.name}
                      </span>
                    </p>
                  </div>
                  <img
                    className=" h-18 w-14 rounded-lg"
                    src={urlFor(post.author.image).url()!}
                    alt="Author Image"
                    // width="50%"
                    // height="50%"
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
export default Content
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

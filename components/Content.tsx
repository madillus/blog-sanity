import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../types'

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
              <a className="border rounded-lg overflow-hidden">
                <div className="group cursor-pointer align-middle overflow-hidden">
                  {post.mainImage && (
                    <div className="relative h-60 w-full object-cover ">
                      <Image
                        className="h-60 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200 ease-in-out"
                        src={urlFor(post.mainImage).url()!}
                        alt="Main image"
                        layout="fill"
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-start p-5 bg-white">
                    <div>
                      <p className="font-bold">{post.title}</p>
                      <p>
                        {post.description} by{' '}
                        <span className="text-sm italic font-semibold">
                          {post.author.name}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center p-2">
                      <Image
                        className="rounded-lg object-cover"
                        src={urlFor(post.author.image).url()!}
                        alt="Author Image"
                        width="100%"
                        height="100%"
                        layout="fixed"
                      />
                    </div>
                  </div>
                </div>
              </a>
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
    _createdAt,
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

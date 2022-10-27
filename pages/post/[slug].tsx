import { PortableText } from '@portabletext/react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../types';

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const components = {
  types: {
    image: ({ value }: { value: string }) => {
      return (
        <img
          className="w-auto h-auto object-cover"
          src={urlFor(value).url()!}
        />
      )
    },
    code: (props: any) => {
      return (
        <pre className="p-3 mx-2 my-4" data-language={props.language}>
          <SyntaxHighlighter language="react" style={nightOwl}>
            {props.value.code}
          </SyntaxHighlighter>
        </pre>
      )
    },
    h1: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
    h2: (props: any) => <h2 className="text-xl font-bold my-5" {...props} />,
    h3: (props: any) => (
      <h3 className="bg-slate-200 p-3 mx-4 my-4" {...props} />
    ),
    li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
    normal: (props: any) => (
      <p className="font-sans font-normal mx-2 leading-relaxed	" {...props} />
    ),
    link: ({ href, children }: any) => {
      return (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
    h2: (props: any) => <h2 className="text-xl font-bold my-5" {...props} />,
    h3: (props: any) => (
      <h3 className="bg-slate-200 p-3 mx-4 my-4" {...props} />
    ),
    li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
    normal: (props: any) => (
      <p className="font-sans font-normal mx-2 leading-relaxed	" {...props} />
    ),
    code: (props: any) => {
      return (
        <pre className="p-3 mx-2 my-4" data-language={props.language}>
          <SyntaxHighlighter language="react" style={nightOwl}>
            {props.value.code}
          </SyntaxHighlighter>
        </pre>
      )
    },
    image: (props: any) => (
      <img
        className="w-auto h-auto object-cover"
        src={urlFor().url()!}
        {...props}
      />
    ),
    link: ({ href, children }: any) => {
      return (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      )
    },
  },
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }
  const { title, mainImage, body, slug } = post

  return (
    <main>
      <Header />
      {post.mainImage && (
        <img
          className=" h-40 w-full object-cover max-w-4xl mx-auto lg:h-80"
          src={urlFor(post.mainImage).url()!}
          alt="Main image"
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
        <hr className="max-w-sm my-10 mx-auto border md:max-w-3xl border-violet-600" />
        <div className="prose m-auto">
          // eslint-disable-next-line
          <PortableText value={body} components={components} />
        </div>
      </article>
      <hr className="max-w-sm my-10 mx-auto border md:max-w-3xl border-violet-600" />

      {submitted ? (
        <div className="flex flex-col justify-center items-center py-10 my-10 bg-violet-600 text-white max-w-sm mx-auto md:max-w-3xl rounded">
          <h3 className="flex text-center justify-center text-2xl font-bold">
            Thank you for submitting a comment!
          </h3>
          <p>Once it has been approved it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-violet-600">Enjoyed the article?</h3>
          <h4 className="text-xl font-bold">
            Leave a comment and/or tips and advice below!
          </h4>
          <hr className="py-3 mt-2" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-800">Name</span>
            <input
              {...register('name', { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-violet-600 outline-none focus:ring"
              placeholder="Name"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-800">Email</span>
            <input
              {...register('email', { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-violet-600 outline-none focus:ring"
              placeholder="Email"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-800">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-violet-600 outline-none focus:ring"
              placeholder="Comment"
              rows={8}
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && <p className="text-red-600">- Name is required</p>}
            {errors.email && (
              <p className="text-red-600">- Email is required</p>
            )}
            {errors.comment && (
              <p className="text-red-600">- Comment is required</p>
            )}
          </div>
          <input
            type="submit"
            className="shadow bg-violet-600 hover:bg-violet-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          />
        </form>
      )}

      <div className="flex flex-col p-10 my-10 max-w-md mx-auto md:max-w-xl shadow-violet-600 shadow space-y-2">
        <h3 className="text-2xl text-violet-600 font-bold">Comments</h3>

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <hr className="max-w-sm my-2 mx-auto border md:max-w-3xl border-violet-600" />
            <p>
              <span className="text-violet-600 font-bold uppercase">
                {comment.name} :{' '}
              </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
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

// ...,
// _type == "code" => {
//   ...,
//   asset->
// },

// <PortableText
//             className=""
//             dataset={process.env.NEXT_PUBLIC_SANIY_DATASET!}
//             projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
//             content={post.body}
//             serializers={{
//               h1: (props: any) => (
//                 <h1 className="text-2xl font-bold my-5" {...props} />
//               ),
//               h2: (props: any) => (
//                 <h2 className="text-xl font-bold my-5" {...props} />
//               ),
//               h3: (props: any) => (
//                 <h3 className="bg-slate-200 p-3 mx-4 my-4" {...props} />
//               ),
//               li: ({ children }: any) => (
//                 <li className="ml-4 list-disc">{children}</li>
//               ),
//               normal: (props: any) => (
//                 <p
//                   className="font-sans font-normal mx-2 leading-relaxed	"
//                   {...props}
//                 />
//               ),
//               code: (props: any) => (
//                 <div className="bg-gray-100 p-4 my-4 rounded-lg" {...props} />
//               ),

//               link: ({ href, children }: any) => (
//                 <a href={href} className="text-blue-500 hover:underline">
//                   {children}
//                 </a>
//               ),

//               // code: (props: any) => (
//               //   <code className="my-2">
//               //     <SyntaxHighlighter language={props.node.language}>
//               //       {props}
//               //     </SyntaxHighlighter>
//               //   </code>
//               // ),
//             }}
//           />

// const CodeSnippet = ({ code, language }) => {
//   return (
//     <div>
//       <span className="code-lang">{language}</span>
//       <pre data-language={language} className={`language-${language}`}>
//         <code>{code}</code>
//       </pre>
//     </div>
//   )
// }

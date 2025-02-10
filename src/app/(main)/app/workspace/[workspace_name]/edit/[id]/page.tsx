// app/app/edit/[id]/page.tsx
import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import ContentForm from '@/components/content-form'

// type Params = {
//   id : string
// }

// type Params = {
//   params : Promise<{id : string}>
// }

type Params = Promise<{ id: string }>

export default async function EditPage({ params }: { params: Params }) {
  // const id = parseInt(params.id, 10)
  const { id } = await params
  const parsedId = parseInt(id)
  const post = await prisma.blog.findUnique({
    where: { id: parsedId}
  })

  if (!post) {
    notFound()
  }
  // await fetch("", {
  //   headers:{
  //     append(name, value) {
  //       // passing my api key
  //       process.env.BLOGEE_CMS_API_KEY
  //     },
  //   }
  // })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Blog Post</h1>
      <ContentForm
        actionType="edit"
        id={post.id}
        initialData={{
          title: post.title,
          slug: post.slug,
          content: post.content // Pass the content directly
        }}
      />
    </div>
  )
}


/*
function
  get params (blog slug)
  blogee.vercel.app/api/all

*/
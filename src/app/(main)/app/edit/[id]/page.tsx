// app/app/edit/[id]/page.tsx
import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import ContentForm from '@/components/content-form'

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  
  const post = await prisma.post.findUnique({
    where: { id }
  })

  if (!post) {
    notFound()
  }

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
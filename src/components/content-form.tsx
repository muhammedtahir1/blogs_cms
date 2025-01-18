'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Editor from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBlog, editBlog } from '@/actions/action'

interface ContentFormProps {
  id?: number
  actionType: "edit" | "create"
  html?: string
  initialData?: {
    title: string
    slug: string
    content?: unknown  // Add content to initialData
  }
}

export default function ContentForm({ actionType, id, initialData }: ContentFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [content, setContent] = useState({})
  const [pending, setPending] = useState(false)
  const [defaultValue, setDefaultValue] = useState(
    initialData?.content || {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: []
        }
      ]
    }
  )

  useEffect(() => {
    if (initialData?.content) {
      setContent(initialData.content)
      setDefaultValue(initialData.content)
    }
  }, [initialData])

  useEffect(() => {
    const generateSlug = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    if (!initialData?.slug) {
      setSlug(generateSlug(title))
    }
  }, [title, initialData?.slug])

  const handleSubmit = async () => {
    setPending(true)
    try {
      const result = actionType === "create" 
        ? await createBlog({ title, slug, content })
        : await editBlog({ id: id!, title, slug, content })

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Blog ${actionType === "create" ? "created" : "updated"} successfully`)
      }
    } catch (error) {
      toast.error('An error occurred while saving')
      console.error('Submission error:', error)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mt-6 flex max-w-2xl flex-col gap-4">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
        />
      </div>

      <Editor
        initialValue={defaultValue} 
        onChange={setContent}
      />

      <Button
        onClick={handleSubmit}
        disabled={pending}
      >
        {pending ? 'Submitting...' : actionType === "create" ? 'Create' : 'Update'}
      </Button>
    </div>
  )
}
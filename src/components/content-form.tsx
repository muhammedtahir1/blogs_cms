'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { parse } from 'himalaya'
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
  }
}

export default function ContentForm({ actionType, html, id, initialData }: ContentFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [content, setContent] = useState<string>('')
  const [pending, setPending] = useState(false)
  const [defaultValue, setDefaultValue] = useState({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: []
      },
      {
        type: 'paragraph',
        content: ["Hi there", ]
      },
      {
        type: 'paragraph',
        content: ["Hi there", "2"]

      },

    ]
  })

  useEffect(() => {
    // Generate slug from title only if slug hasn't been set from initialData
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

  useEffect(() => {
    // Handle initialization for edit mode
    const initializeEditMode = async () => {
      if (actionType === "edit" && html) {
        try {
          // Try to parse the HTML content into the editor's required format
          const parsedContent = parse(html)
          setDefaultValue(parsedContent)
          setContent(html)  // Set initial content
        } catch (error) {
          toast.error('Error parsing HTML content')
          console.error('Error parsing HTML:', error)
        }
      }
    }

    initializeEditMode()
  }, [actionType, html])

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    if (!content.trim()) {
      toast.error('Content is required')
      return
    }

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
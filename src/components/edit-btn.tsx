"use client"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function EditBtn({ id }: { id: number }) {
  const router = useRouter()
  
  return (
    <Button onClick={() => router.push(`/app/edit/${id}`)}>
      Edit
    </Button>
  )
}

// app/app/edit/[id]/page.tsx

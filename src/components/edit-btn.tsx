"use client"
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'

export default function EditBtn({ id }: { id: number }) {

  const pathname = usePathname()
  const workspace_name = pathname.split("/")[3]


  const router = useRouter()
  
  return (
    <Button className='w-full' onClick={() => router.push(`/app/workspace/${workspace_name}/edit/${id}`)}>
      Edit
    </Button>
  )
}

// app/app/edit/[id]/page.tsx

"use client"
import { deleteBlog } from '@/actions/action'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Blog } from '@prisma/client'

export default function DeleteBtn({id} : {id: Blog["id"]}) {

  async function onSubmit(){
    const error = await deleteBlog({id})

    if(!error){
      toast("blog successfully deleted")
    }
  }

  return (
    <Button className='w-full' variant={"destructive"} onClick={()=>onSubmit()}>Delete</Button>
  )
}

"use client"
import { deleteBlog } from '@/actions/action'
import { Button } from './ui/button'
import { Post } from '@prisma/client'
import { toast } from 'sonner'

export default function DeleteBtn({id} : {id: Post["id"]}) {

  async function onSubmit(){
    const error = await deleteBlog({id})

    if(!error){
      toast("blog successfully deleted")
    }
  }

  return (
    <Button variant={"destructive"} onClick={()=>onSubmit()}>Delete</Button>
  )
}

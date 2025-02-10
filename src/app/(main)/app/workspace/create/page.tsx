"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createWorkspace } from "@/actions/action"
import { useToast } from "@/hooks/use-toast"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
})


export default function WorkspaceNameForm() {

  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await createWorkspace(data)
    if (response.sucess) {
      toast({
        title: `Workspace ${response.data?.name} created`
      })
      redirect(`/app/workspace/${response.data?.slug}`)
    } else {
      toast({
        title: `Workspace could not be created!`
      })
    }
  }


  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-emerald-950 text-emerald-400 hover:bg-emerald-950">
            <Users2 className="mr-2 h-4 w-4" />
            Team Name
          </Badge>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">What should we call your workspace?</h1>
          <p className="text-gray-600">You can always change this later from settings.</p>
        </div>

        <div className="space-y-4">
          {/* <Input
            type="text"
            placeholder="Enter workspace name"
            className=" border-neutral-80 placeholder:text-neutral-500"
          // onChange={e => handleChange()}
          />

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            Continue
          </Button> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg" type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}











"use client"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authClient } from "@/lib/auth-client"
// import { auth } from "@/lib/auth"

const formSchema = z.object({
  email: z.string(),
  password: z.string()
});

export default function MyForm() {
  // const session = await auth.api.getSession({
  //   headers: await headers()
  // })
  // if (session) {
  //   redirect('/app')
  // }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await authClient.signIn.email({
        email: values.email,
        password: values.password,
      }, {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          //redirect to dashboard
          alert("successfull")
          redirect('/app')
          // TODO
        },
        onError: (ctx) => {
          alert(ctx.error.message)
        }
      })
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          {/* <code className="text-white">{JSON.stringify(values, null, 2)}</code> */}
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  placeholder="tahir@gmail.com"

                  type="email"
                  {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"

                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
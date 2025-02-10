"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useState } from 'react';

export default function SignUp() {
  // const session = await auth.api.getSession({
  //   headers: await headers()
  // })
  // if (session) {
  //   redirect('/app')
  // }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [image, setImage] = useState<File | null>(null);

  const signUp = async () => {

    // const { data, error } = 
    await authClient.signUp.email({
      email,
      password,
      name,
      // image: image ? convertImageToBase64(image) : undefined, 
    }, {
      onRequest: (ctx) => { 
       //show loading
      }, 
      onSuccess: (ctx) => { 
        //redirect to the dashboard
        alert("done");
        redirect("/login")
      }, 
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <Input type="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="****" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* <Input type="file" onChange={(e) => setImage(e.target.files?.[0])} /> */}
      <Button onClick={signUp}>Sign Up</Button>
    </div>
  );
}
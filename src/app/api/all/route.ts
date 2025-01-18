import prisma from "@/lib/db"
// import { NextRequest } from "next/server"

export async function GET() {
    // TODO: check auth


    const allBlogs = await prisma.post.findMany()
    // console.log(req.headers)
        // console.log(req.headers.values)
    return Response.json(allBlogs)
}
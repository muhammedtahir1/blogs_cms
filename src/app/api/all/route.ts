import prisma from "@/lib/db"

export async function GET() {
    // TODO: check auth
    const allBlogs = await prisma.post.findMany()

    return Response.json(allBlogs)
}
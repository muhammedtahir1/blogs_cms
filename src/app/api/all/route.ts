import prisma from "@/lib/db"
import { NextRequest } from "next/server"
// import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    // console.log(req.headers.values)
    // console.log(req.headers.get('apikey'))
    const userApiKey = req.headers.get('apikey')

    // TODO: check auth
    const user = await prisma.user.findFirst({
        where: {
            apiKey: userApiKey
        }
    })

    if (!user) {
        return Response.json({
            success: false,
            message: "unauthorized"
        })
    }

    const allBlogs = await prisma.blog.findMany({
        where: {
            userId: user.id
        }
    })
    // console.log(req.headers)
    // console.log(req.headers.values)
    return Response.json(allBlogs)
}
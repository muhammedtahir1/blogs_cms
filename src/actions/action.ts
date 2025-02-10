"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { Blog } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
// import uniqid from "uniqid"
import { v4 as uuidv4 } from 'uuid';

const generateApiKeyAction = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const newGeneratedApikey = uuidv4()
    const user = await prisma.user.update({
        where: {
            id: session?.user.id
        },
        data: {
            apiKey: newGeneratedApikey
        }
    })

    return newGeneratedApikey

}
const createBlog = async (data: {
    title: string,
    slug: string,
    content: object,
    workspace: string
}) => {

    let post
    console.log(data);
    console.log(data.content);

    const serializedContent = JSON.parse(JSON.stringify(data.content))

    const session = await auth.api.getSession({
        headers: await headers()
    })
    try {

        const workspace = await prisma.workspace.findFirst({
            where: {
                slug: data.workspace
            },
        })

        if (!workspace?.id) return { success: false, message: "No such workspace found" }

        post = await prisma.blog.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: serializedContent,
                // workspace: data.workspace,
                // userId: session?.user.id
                // workspaceId: 
                workspaceId: workspace?.id
            }
        })

        if (!post) {
            return { error: "Failed to create the blog" }
        }
    } catch (e) {
        // if (error.code === 'P2002') {
        //     return { error: 'That slug already exists.' }
        // }
        return { error: (e as Error).message || 'Failed to create the blog.' }
    }
    // revalidatePath('/')

}

const editBlog = async (data: {
    id: number,
    title: string,
    slug: string,
    content: object
}) => {
    const serializedContent = JSON.parse(JSON.stringify(data.content))

    try {
        const post = await prisma.blog.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title,
                slug: data.slug,
                content: serializedContent
            }
        })

        if (!post) {
            return { error: "Failed to update the blog" }
        }

        revalidatePath('/')
        return { success: true, post }

    } catch (e) {
        // if (error.code === 'P2002') {
        //     return { error: 'That slug already exists.' }
        // }

        return { error: (e as Error).message || 'Failed to update the blog.' }
    }
}

const deleteBlog = async ({ id }: { id: Blog["id"] }) => {

    try {
        await prisma.blog.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        return { error: (e as Error).message || 'Failed to delete the blog.' }
    }

    revalidatePath("/app")

}


const createWorkspace = async (data: { name: string }) => {

    const slug = data.name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    try {
        const workspace = await prisma.workspace.create({
            data: {
                name: data.name,
                slug: slug

                // TODO : how to even save the user details while creating a workspace
                // User: {
                //     connect: 
                // }
            }
        })
        revalidatePath("/app/workspace/create")
        return { sucess: true, data: workspace }

    } catch (error) {
        return { sucess: false, error }
    }
}


const getWorkspaces = async () => {
    try {
        const workspaces = await prisma.workspace.findMany()
        return { success: true, data: workspaces }
    } catch (error) {
        return { success: false, error }
    }
}






export { createBlog, editBlog, deleteBlog, generateApiKeyAction, createWorkspace, getWorkspaces }

"use server"

import prisma from "@/lib/db"
import { Post } from "@prisma/client"
import { revalidatePath } from "next/cache"

const createBlog = async (data: {
    title: string,
    slug: string,
    content: object
}) => {

    let post
    console.log(data);
    console.log(data.content);

    const serializedContent = JSON.parse(JSON.stringify(data.content))


    try {
        post = await prisma.post.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: serializedContent
            }
        })

        if (!post) {
            return { error: "Failed to create the blog" }
        }

    } catch (e) {
        // if (error.code === 'P2002') {
        //     return { error: 'That slug already exists.' }
        // }
        return { error: (e as Error).message ||'Failed to create the blog.'}
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
        const post = await prisma.post.update({
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
        
        return { error: (e as Error).message || 'Failed to update the blog.'}
    }
}

const deleteBlog = async({id} : {id : Post["id"]})=> {

    try {
        await prisma.post.delete({
            where: {
                id : id
            }
        })
    } catch (e) {
        return { error: (e as Error).message || 'Failed to delete the blog.' }
    }

    revalidatePath("/app")

}




export { createBlog, editBlog, deleteBlog }

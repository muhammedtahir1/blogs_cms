import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import prisma from '@/lib/db'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteBtn from '@/components/delete-btn'
import EditBtn from '@/components/edit-btn'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'


const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return <div>Not authenticated</div>
    }
    const allBlogs = await prisma.post.findMany()
    return (
        <div>
            <div>
                <Link href={"/app/create"}>
                    <Button>New Blog</Button>
                </Link>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Number</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allBlogs.map(blog =>

                        <TableRow key={blog.id}>
                            <TableCell className="font-medium">{blog.id}</TableCell>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{blog.slug}</TableCell>
                            <TableCell className="text-right">
                                {/* TODO: Dropdown */}
                                {/* <EditBlog/> */}
                                {/* <DeleteBlog/> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                                        {/* <DropdownMenuSeparator /> */}
                                        <DropdownMenuItem>
                                            <DeleteBtn id={blog.id} />
                                        </DropdownMenuItem> 
                                        <DropdownMenuItem>
                                            <EditBtn id={blog.id} />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>


                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    )
}

export default page
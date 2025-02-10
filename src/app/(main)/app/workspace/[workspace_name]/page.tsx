import Link from "next/link"
import {
    Bell,
    CircleUser,
    EllipsisVertical,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
import DeleteBtn from '@/components/delete-btn'
import EditBtn from '@/components/edit-btn'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import WorkspaceChanger from "@/components/workspace-changer"
import AppSideBar from "@/components/app-sidebar"
const page = async ({ params }: { params: Promise<{ workspace_name: string }> }) => {

    const workspace_name = (await params).workspace_name
    // const allBlogs = await prisma.blog.findMany({
    //     where: {
    //         // username
    //         workspace: workspace_name
    //     }
    // })

    const workspace = await prisma.workspace.findFirst({
        where:{
            slug: workspace_name
        }
        // TODO : connect the workspace to the USER
        // what if it shows someone's blog
    })
    const allBlogs = await prisma.blog.findMany({where:{
        workspaceId: workspace?.id
    }})

    const workspaceName = workspace_name.charAt(0).toUpperCase() + workspace_name.slice(1)

    return (
        <div className="md:px-4 md:py-4">
            <div className="flex items-center justify-between pb-2">
                <h1 className="text-lg font-semibold md:text-2xl">{workspaceName}</h1>
                <Link href={`/app/workspace/${workspace_name}/create`}>
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
                                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                                        {/* <DropdownMenuSeparator /> */}
                                        <DropdownMenuItem className="w-full p-0">
                                            <DeleteBtn id={blog.id} />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="w-full px-0">
                                            <EditBtn id={blog.id} />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>


                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table></div>
    )
}

export default page
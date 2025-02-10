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

export const description =
    "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action."

export default async function Dashboard() {
    // TODO: handle this in middleware
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        redirect('/login')
    }

    return (
        <div >

            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
                    <Link href={"/app/create"}>
                        <Button>New Blog</Button>
                    </Link>
                </div>
                <div
                    x-chunk="dashboard-02-chunk-1"
                >

                    {/* <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no products
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                You can start selling as soon as you add a product.
                            </p>
                            <Button className="mt-4">Add Product</Button>
                        </div> */}
                </div>
            </main>
        </div>

    )
}

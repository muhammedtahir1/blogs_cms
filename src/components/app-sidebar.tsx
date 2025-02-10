import React from 'react'
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
import { getWorkspaces } from '@/actions/action'

const AppSideBar = async () => {

    
    // try {
    //     const response = await getWorkspaces()
    //     console.log(response);
    // } catch (e) {
    //     return e
    // }

    return (
        <><div className="h-full hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Bloggie</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1 p-2 md:p-4">
                    <WorkspaceChanger />
                </div>
                <div className="">
                    <nav className="grid items-end px-2 py-2 text-sm font-medium lg:px-4 md:py-4">
                        {/* <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link> */}
                        {/* <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link> */}
                        {/* <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <Package className="h-4 w-4" />
                            Products{" "}
                        </Link> */}
                        {/* <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Users className="h-4 w-4" />
                            Blogs
                        </Link> */}
                        <Link
                            href="/app/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <LineChart className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>

            </div>
        </div></>
    )
}

export default AppSideBar
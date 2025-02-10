"use client"

import { generateApiKeyAction } from "@/actions/action"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clipboard } from "lucide-react"
import { useState } from "react"

export default function Component() {
    const [apiKey, setApiKey] = useState('***********')
    // prefetch api using session and conditional render if api key exist,
    // if exist then disable generate button.
    return (
        <Card>
            <CardHeader>
                <CardTitle>API key</CardTitle>
                <CardDescription>
                    Used to identify your store in the marketplace.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <h2>hi</h2> */}
                <div className="flex items-center">
                    <Input value={apiKey} readOnly placeholder="Store Name" />
                    <Button variant={"secondary"}>View API key</Button>
                    <Clipboard />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={async () => {
                    const newApiKey = await generateApiKeyAction()
                    setApiKey(newApiKey)
                }} disabled>Generate New</Button>
            </CardFooter>
        </Card>
    )
}

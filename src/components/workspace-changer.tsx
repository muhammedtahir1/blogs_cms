"use client"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getWorkspaces } from "@/actions/action";

// Updated types to match your Prisma model
type Workspace = {
  id: number;
  name: string;
  slug: string;
  userId: string | null;
}

type WorkspaceResponse = {
  success: boolean;
  data?: Workspace[];
  error?: unknown;
}

export default function WorkspaceChanger() {
  const path = usePathname();
  const router = useRouter();
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  
  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        setIsLoading(true);
        const response = await getWorkspaces();
        
        // Type assertion to handle the response
        const typedResponse = response as WorkspaceResponse;
        
        if (typedResponse.success && typedResponse.data) {
          setWorkspaces(typedResponse.data);
          
          // Set default workspace if we have workspaces and none is selected
          if (typedResponse.data.length > 0 && !currentWorkspace) {
            setCurrentWorkspace(String(typedResponse.data[0].id));
          }
        } else {
          setError('Failed to fetch workspaces');
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorkspaces();
  }, [currentWorkspace]);
  
  useEffect(() => {
    if (path.startsWith('/app/workspace/')) {
      const workspace = path.split('/')[3];
      console.log(workspace);
      setCurrentWorkspace(workspace);
    }
  }, [path]);

  const handleWorkspaceChange = (workspace: string) => {
    setCurrentWorkspace(workspace);
    const slug = workspace.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') .replace(/-+/g, '-')

    router.push(`/app/workspace/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>Loading workspaces...</Label>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Label className="text-red-500">Error: {error}</Label>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Select workspace</Label>
      <Select
        value={currentWorkspace}
        onValueChange={handleWorkspaceChange}
      >
        <SelectTrigger
          id={id}
          className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Choose a workspace" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <div className="pb-2">
            <Link href={"/app/workspace/create"} className="flex items-center gap-2">
              <Button variant={"secondary"} className="block font-medium p-2 w-full">Create a workspace</Button>
            </Link>
            <hr />
          </div>

          {workspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.name}>
              <span className="flex items-center gap-2">
                <span>
                  <span className="block font-medium">{workspace.name}</span>
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
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
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const id = useId();
  
  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        setIsLoading(true);
        const response = await getWorkspaces();
        const typedResponse = response as WorkspaceResponse;
        
        if (typedResponse.success && typedResponse.data) {
          setWorkspaces(typedResponse.data);
          
          // Always set the first workspace as default
          if (typedResponse.data.length > 0) {
            const firstWorkspace = typedResponse.data[0];
            setCurrentWorkspace(firstWorkspace.name);
            
            // Redirect to the first workspace if not already on a workspace page
            if (!path.startsWith('/app/workspace/')) {
              router.push(`/app/workspace/${firstWorkspace.slug}`);
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorkspaces();
  }, []);
  
  useEffect(() => {
    if (path.startsWith('/app/workspace/')) {
      const workspace = path.split('/')[3];
      // Find the workspace that matches the current path slug
      const matchedWorkspace = workspaces.find(w => w.slug === workspace);
      if (matchedWorkspace) {
        setCurrentWorkspace(matchedWorkspace.name);
      }
    }
  }, [path, workspaces]);

  const handleWorkspaceChange = (workspaceName: string) => {
    // Find the selected workspace to get its slug
    const selectedWorkspace = workspaces.find(w => w.name === workspaceName);
    if (selectedWorkspace) {
      setCurrentWorkspace(workspaceName);
      router.push(`/app/workspace/${selectedWorkspace.slug}`);
    }
  };

  if (isLoading) {
    return <div className="space-y-2"><Label>Loading workspaces...</Label></div>;
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
import Link from "next/link";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useGetProject } from "@/hooks/use-get-project";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  projectId: string;
}

export const ProjectHeader = ({ projectId }: Props) => {
  const { data: project } = useGetProject(projectId);
  const { data: session } = authClient.useSession();

  const { setTheme, theme } = useTheme();

  const showSignUpPrompt = project.isAnonymous && !session?.user;

  return (
    <div className="flex flex-col">
      {showSignUpPrompt && (
        <div className="px-3 py-2 bg-primary/10 border-b flex items-center justify-between gap-2">
          <p className="text-xs text-primary">
            <Icon icon="tabler:info-circle" className="size-3.5 inline mr-1" />
            Sign up to save this project to your account
          </p>
          <Button asChild size="sm" variant="default" className="h-6 text-xs">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
      <header className="p-2 flex justify-between items-center border-b bg-sidebar">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2!"
          >
            <Logo size={18} />
            <span className="text-sm font-medium">{project.name}</span>
            <Icon icon="tabler:chevron-down" className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem asChild>
            <Link href="/">
              <Icon icon="tabler:chevron-left" className="size-4" />
              <span>
                Go to Dashboard
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <Icon icon="tabler:sun-moon" className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      </header>
    </div>
  );
};

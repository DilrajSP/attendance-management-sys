"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LockKeyhole, LogOut, User } from "lucide-react";

export default function ClientNavbar() {
  const { data: session } = useSession();
  const initial = session?.user?.name?.charAt(0).toUpperCase() ?? "S";

  return (
    <header className="h-14 w-full sticky z-50 top-0 border-b backdrop-blur-md border-white/5 bg-black/40 flex items-center px-6">
      {/* Left */}
      <div className="text-sm font-semibold tracking-wide">AMS</div>
      {/* Right */}
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full focus-visible:ring-0"
            >
              <Avatar>
                <AvatarFallback className="text-xs bg-black/40 border border-white/15 backdrop-blur-xl">
                  {initial}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/student/profile" className="cursor-pointer">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/change-password"
                target="_blank"
                className="cursor-pointer"
              >
                <LockKeyhole />
                Change Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer"
            >
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

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

export default function ClientNavbar() {
  const { data: session } = useSession();
  const initial = session?.user?.name?.charAt(0).toUpperCase() ?? "S";

  return (
    <header className="h-14 border-b border-zinc-800 bg-zinc-950 flex items-center px-6">
      {/* Left */}
      <div className="text-sm font-semibold tracking-wide">
        Attendance System
      </div>

      {/* Right */}
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className=" text-xs">
                  {initial}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-zinc-900 border-zinc-800 text-zinc-100"
          >
            <DropdownMenuLabel>
              {session?.user?.name}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/student/profile"
                className="cursor-pointer"
              >
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/change-password"
                target="_blank"
                className="cursor-pointer focus:"
              >
                Change Password
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer text-red-400 focus:text-red-400"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

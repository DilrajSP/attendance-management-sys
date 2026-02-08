"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
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
import { LockKeyhole, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  const initial = session?.user?.name?.charAt(0).toUpperCase() ?? "T";

  return (
    <header className="h-14 w-full border-b sticky z-50 top-0 backdrop-blur-md border-white/5 flex items-center px-6">
      {/* Left */}
      <div className="text-sm font-semibold tracking-wide">AMS</div>
      {/* Right */}
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
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
              className="cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
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

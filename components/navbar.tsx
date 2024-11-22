"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Rocket } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6" />
            <span className="font-bold text-lg">StartupSwipe</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Button variant="ghost" asChild className="text-base">
                  <Link href="/swipe">Explore</Link>
                </Button>
                <Button variant="ghost" asChild className="text-base">
                  <Link href="/leaderboard">Leaderboard</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild className="py-2">
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="py-2">
                      <Link href="/submit">Submit Idea</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 py-2"
                      onClick={() => signOut(auth)}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-base">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="text-base">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { useToast } from "./ui/use-toast";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [user, router, toast]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
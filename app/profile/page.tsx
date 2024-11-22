"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { AuthGuard } from "@/components/auth-guard";

interface StartupIdea {
  id: string;
  title: string;
  description: string;
  likes: number;
}

function ProfileContent() {
  const { user } = useAuth();
  const [userIdeas, setUserIdeas] = useState<StartupIdea[]>([]);

  useEffect(() => {
    const fetchUserIdeas = async () => {
      if (!user) return;

      const ideasRef = collection(db, "ideas");
      const q = query(ideasRef, where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const ideas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StartupIdea[];

      setUserIdeas(ideas);
    };

    fetchUserIdeas();
  }, [user]);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{user?.displayName || "User Profile"}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Submitted Ideas</h2>
          {userIdeas.length === 0 ? (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven't submitted any ideas yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {userIdeas.map((idea) => (
                <Card key={idea.id}>
                  <CardHeader>
                    <CardTitle>{idea.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{idea.description}</p>
                    <p className="mt-2 text-sm">
                      <span className="font-medium">{idea.likes}</span> likes
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
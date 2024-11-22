"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trophy, Award, Medal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthGuard } from "@/components/auth-guard";

interface StartupIdea {
  id: string;
  title: string;
  description: string;
  likes: number;
  userId: string;
}

function LeaderboardContent() {
  const [topIdeas, setTopIdeas] = useState<StartupIdea[]>([]);

  useEffect(() => {
    const fetchTopIdeas = async () => {
      const ideasRef = collection(db, "ideas");
      const q = query(ideasRef, orderBy("likes", "desc"), limit(10));
      const snapshot = await getDocs(q);
      const ideas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as StartupIdea));
      setTopIdeas(ideas);
    };

    fetchTopIdeas();
  }, []);

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Top Startup Ideas</h1>
          <p className="text-muted-foreground">
            The most popular ideas ranked by community support
          </p>
        </div>

        <div className="grid gap-4">
          {topIdeas.map((idea, index) => (
            <Card key={idea.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(index)}
                    <div>
                      <CardTitle>{idea.title}</CardTitle>
                      <CardDescription>Rank #{index + 1}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{idea.likes}</span>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{idea.description}</p>
              </CardContent>
              {index < 3 && (
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <AuthGuard>
      <LeaderboardContent />
    </AuthGuard>
  );
}
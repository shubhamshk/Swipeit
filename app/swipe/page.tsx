"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthGuard } from "@/components/auth-guard";

interface StartupIdea {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  market: string;
  userId: string;
  likes: number;
  imageUrl?: string;
}

function SwipeContent() {
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchIdeas = async () => {
      const ideasRef = collection(db, "ideas");
      const q = query(ideasRef, where("userId", "!=", user?.uid || ""));
      const snapshot = await getDocs(q);
      const ideaList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as StartupIdea));
      setIdeas(ideaList);
    };

    fetchIdeas();
  }, [user]);

  const currentIdea = ideas[currentIndex];

  const handleSwipe = async (direction: "left" | "right") => {
    if (direction === "right") {
      const ideaRef = doc(db, "ideas", currentIdea.id);
      await updateDoc(ideaRef, {
        likes: currentIdea.likes + 1
      });

      toast({
        title: "Liked!",
        description: "You've supported this startup idea.",
      });
    }
    
    if (currentIndex < ideas.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      toast({
        title: "All caught up!",
        description: "You've seen all available ideas.",
      });
    }
  };

  if (!currentIdea) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <Lightbulb className="w-20 h-20 text-muted-foreground mb-6" />
        <h2 className="text-3xl font-bold text-center mb-3">No More Ideas</h2>
        <p className="text-muted-foreground text-center text-lg">
          You've seen all available startup ideas. Check back later for more!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdea.id}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          className="bg-card rounded-2xl shadow-lg overflow-hidden"
        >
          {currentIdea.imageUrl && (
            <div className="w-full h-64 bg-muted">
              <img
                src={currentIdea.imageUrl}
                alt={currentIdea.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold">{currentIdea.title}</h2>
            <p className="text-muted-foreground text-lg">{currentIdea.description}</p>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Problem</h3>
              <p className="text-muted-foreground">{currentIdea.problem}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Solution</h3>
              <p className="text-muted-foreground">{currentIdea.solution}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Market</h3>
              <p className="text-muted-foreground">{currentIdea.market}</p>
            </div>

            <div className="flex justify-center gap-6 pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSwipe("left")}
                className="rounded-full h-20 w-20"
              >
                <ThumbsDown className="h-8 w-8 text-destructive" />
              </Button>
              <Button
                size="lg"
                onClick={() => handleSwipe("right")}
                className="rounded-full h-20 w-20"
              >
                <ThumbsUp className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SwipePage() {
  return (
    <AuthGuard>
      <SwipeContent />
    </AuthGuard>
  );
}
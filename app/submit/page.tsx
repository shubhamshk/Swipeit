"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AuthGuard } from "@/components/auth-guard";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  problem: z.string().min(20, "Problem statement must be at least 20 characters"),
  solution: z.string().min(20, "Solution must be at least 20 characters"),
  market: z.string().min(20, "Market analysis must be at least 20 characters"),
});

function SubmitContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      problem: "",
      solution: "",
      market: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(storage, `ideas/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "ideas"), {
        ...values,
        userId: user?.uid,
        createdAt: new Date(),
        likes: 0,
        imageUrl,
      });

      toast({
        title: "Success!",
        description: "Your startup idea has been submitted.",
      });

      router.push("/swipe");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submit Your Startup Idea</h1>
          <p className="text-muted-foreground">
            Share your innovative concept with our community of entrepreneurs and investors.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your startup idea title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A catchy, memorable name for your startup idea
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe your startup idea"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A concise overview of your startup concept
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What problem does your startup solve?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How does your startup solve this problem?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="market"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Analysis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your target market and potential opportunities"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Cover Image (Optional)</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-1"
              />
              <FormDescription>
                Add a visual representation of your idea
              </FormDescription>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Idea"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <AuthGuard>
      <SubmitContent />
    </AuthGuard>
  );
}
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="text-center space-y-8 max-w-3xl mx-auto px-6">
        <div className="space-y-6">
          <Rocket className="w-20 h-20 mx-auto text-primary animate-bounce" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Where Great Ideas Find Their Wings
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
            Join the community of innovators, investors, and dreamers. Swipe through groundbreaking startup ideas or share your own vision with the world.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/swipe">Start Exploring</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8">
            <Link href="/submit">Submit Your Idea</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
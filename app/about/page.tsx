"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Lightbulb, Target, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const features = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovative Ideas",
    description: "Discover groundbreaking startup concepts from creative minds worldwide."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Vibrant Community",
    description: "Connect with entrepreneurs, investors, and industry experts."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Smart Matching",
    description: "Our algorithm connects ideas with the right supporters and investors."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Growth Tracking",
    description: "Monitor your idea's performance and community engagement."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Idea Protection",
    description: "Advanced measures to protect your intellectual property."
  }
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "5K+", label: "Startup Ideas" },
  { value: "500+", label: "Success Stories" },
  { value: "$2M+", label: "Funding Secured" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <motion.section 
        className="container px-4 py-24 mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Rocket className="w-16 h-16 mx-auto text-primary mb-6" />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          {...fadeIn}
        >
          Empowering the Next Generation
          <span className="text-primary"> of Startups</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          {...fadeIn}
        >
          StartupSwipe is revolutionizing how innovative ideas find their perfect match. 
          We connect visionary entrepreneurs with passionate investors through an 
          intuitive, engaging platform.
        </motion.p>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="container px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-2">{stat.value}</h2>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container px-4 py-16">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why Choose StartupSwipe?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="container px-4 py-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="max-w-2xl mx-auto space-y-6"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Revolution?</h2>
          <p className="text-muted-foreground mb-8">
            Start your journey today and become part of the fastest-growing startup community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/swipe">Explore Ideas</Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
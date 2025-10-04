import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, Users, Trophy, Brain, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Ask!y</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-balance mb-6">
            Your AI-Powered <span className="text-primary">Study Companion</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8">
            Master any subject with comprehensive resources, personalized quizzes, flashcards, and AI assistance that
            provides exact answers. Join thousands of students accelerating their learning across all disciplines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105">
                Start Learning Free ✨
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 hover:bg-primary/5 transform transition-all duration-200 hover:scale-105">
                Try AI Chat 🤖
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Everything You Need to Excel</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Ask!y AI Assistant</CardTitle>
              <CardDescription>
                Get instant answers to your DBMS and Networking questions with our intelligent chatbot
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Smart Flashcards</CardTitle>
              <CardDescription>
                Upload documents and automatically generate flashcards for efficient studying
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Practice Quizzes</CardTitle>
              <CardDescription>
                Test your knowledge with adaptive quizzes that adjust to your learning pace
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <Users className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Community Forum</CardTitle>
              <CardDescription>
                Connect with peers, ask questions, and share knowledge in our active community
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Gamification</CardTitle>
              <CardDescription>Earn XP, maintain streaks, unlock badges, and compete on leaderboards</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <Brain className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Progress Analytics</CardTitle>
              <CardDescription>Track your learning progress with detailed analytics and insights</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-xl text-muted-foreground mb-8">Join Ask!y today and experience the future of education</p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Ask!y. All rights reserved. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  )
}

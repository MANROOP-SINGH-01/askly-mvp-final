import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Ask!y</h1>
          </Link>
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Try Ask!y Demo</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience our AI-powered learning platform with sample content
          </p>

          <Card className="text-left">
            <CardHeader>
              <CardTitle>Demo Features</CardTitle>
              <CardDescription>Explore these features without creating an account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Sky AI Chat Demo</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Try asking questions about DBMS or Computer Networking
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <strong>You:</strong> What is normalization in DBMS?
                  <br />
                  <strong>Sky:</strong> Database normalization is the process of structuring a database to reduce
                  redundancy and improve data integrity...
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Sample Quiz</h3>
                <p className="text-sm text-muted-foreground mb-3">Take a practice quiz on database concepts</p>
                <div className="bg-muted p-3 rounded text-sm">
                  <strong>Question:</strong> Which normal form eliminates transitive dependencies?
                  <br />
                  <strong>Options:</strong> 1NF, 2NF, 3NF, BCNF
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Flashcard Preview</h3>
                <p className="text-sm text-muted-foreground mb-3">See how our smart flashcards work</p>
                <div className="bg-muted p-3 rounded text-sm">
                  <strong>Front:</strong> What is a primary key?
                  <br />
                  <strong>Back:</strong> A primary key is a unique identifier for each record in a database table.
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Ready to Start Learning? Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

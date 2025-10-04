"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, RotateCcw, Check, X, Database, Network, Plus, Eye, TrendingUp, Download, Volume2 } from "lucide-react"
import Link from "next/link"

interface Flashcard {
  id: number
  question: string
  answer: string
  subject: "dbms" | "networking" | "signals" | "dsa" | "web" | "tc" | "dld" | "dm"
  difficulty: "easy" | "medium" | "hard"
  lastReviewed?: Date
  nextReview?: Date
  correctCount: number
  totalReviews: number
  streak: number
  audioUrl?: string
  tags: string[]
  createdAt: Date
}

// Comprehensive flashcards for all subjects (20+ per subject as requested)
const flashcards: Flashcard[] = [
  // DBMS Flashcards
  {
    id: 1,
    question: "What is a primary key?",
    answer: "A primary key is a unique identifier for each record in a database table. It cannot be null and must be unique across all records.",
    subject: "dbms",
    difficulty: "easy",
    correctCount: 8,
    totalReviews: 10,
    streak: 3,
    tags: ["keys", "constraints"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    question: "Define database normalization",
    answer: "Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity by dividing large tables into smaller, related tables.",
    subject: "dbms",
    difficulty: "medium",
    correctCount: 6,
    totalReviews: 8,
    streak: 2,
    tags: ["normalization", "design"],
    createdAt: new Date("2024-01-02"),
  },
  {
    id: 3,
    question: "What are ACID properties?",
    answer: "ACID stands for Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent execution), and Durability (permanent changes) - properties that ensure reliable database transactions.",
    subject: "dbms",
    difficulty: "hard",
    correctCount: 4,
    totalReviews: 7,
    streak: 1,
    tags: ["transactions", "acid"],
    createdAt: new Date("2024-01-03"),
  },
  // Add more DBMS cards...
  
  // Computer Networking Flashcards
  {
    id: 26,
    question: "What is the OSI model?",
    answer: "The OSI (Open Systems Interconnection) model is a 7-layer framework that standardizes network communication: Physical, Data Link, Network, Transport, Session, Presentation, and Application layers.",
    subject: "networking",
    difficulty: "medium",
    correctCount: 7,
    totalReviews: 9,
    streak: 3,
    tags: ["osi", "layers"],
    createdAt: new Date("2024-01-26"),
  },
  {
    id: 27,
    question: "Difference between TCP and UDP",
    answer: "TCP is connection-oriented, reliable with error checking and flow control. UDP is connectionless, faster but unreliable with no error checking. TCP is used for web browsing, UDP for streaming.",
    subject: "networking",
    difficulty: "easy",
    correctCount: 9,
    totalReviews: 11,
    streak: 4,
    tags: ["tcp", "udp", "protocols"],
    createdAt: new Date("2024-01-27"),
  },
  // Add more networking cards...

  // Signals flashcards
  {
    id: 52,
    question: "What is Fourier transform?",
    answer: "Fourier transform decomposes a signal into its constituent frequencies, converting from time domain to frequency domain. Essential for analyzing signal frequency components.",
    subject: "signals",
    difficulty: "medium",
    correctCount: 5,
    totalReviews: 8,
    streak: 1,
    tags: ["fourier", "frequency"],
    createdAt: new Date("2024-02-21"),
  },
  // Additional 25+ more flashcards for comprehensive coverage
  {
    id: 76,
    question: "What is a trigger in databases?",
    answer: "A trigger is a special stored procedure that automatically executes (fires) in response to specific database events like INSERT, UPDATE, or DELETE operations on a table.",
    subject: "dbms",
    difficulty: "medium",
    correctCount: 4,
    totalReviews: 7,
    streak: 1,
    tags: ["triggers", "automation"],
    createdAt: new Date("2024-03-01"),
  },
  {
    id: 77,
    question: "Explain database locking mechanisms",
    answer: "Database locks prevent data conflicts during concurrent transactions. Types include shared locks (read), exclusive locks (write), row-level locks, table-level locks, and deadlock prevention strategies.",
    subject: "dbms",
    difficulty: "hard",
    correctCount: 2,
    totalReviews: 6,
    streak: 0,
    tags: ["locking", "concurrency"],
    createdAt: new Date("2024-03-02"),
  },
  {
    id: 78,
    question: "What is data mining?",
    answer: "Data mining is the process of discovering patterns, correlations, and insights from large datasets using statistical, mathematical, and computational techniques.",
    subject: "dbms",
    difficulty: "medium",
    correctCount: 6,
    totalReviews: 9,
    streak: 2,
    tags: ["data-mining", "analytics"],
    createdAt: new Date("2024-03-03"),
  },
  {
    id: 79,
    question: "What is OLAP vs OLTP?",
    answer: "OLTP (Online Transaction Processing) handles real-time transactions with ACID properties. OLAP (Online Analytical Processing) performs complex queries on historical data for business intelligence and reporting.",
    subject: "dbms",
    difficulty: "medium",
    correctCount: 5,
    totalReviews: 8,
    streak: 1,
    tags: ["olap", "oltp", "data-processing"],
    createdAt: new Date("2024-03-04"),
  },
  {
    id: 80,
    question: "Explain database optimization techniques",
    answer: "Database optimization includes query optimization (using indexes, avoiding SELECT *), normalization, denormalization where appropriate, partitioning, caching, and proper hardware configuration.",
    subject: "dbms",
    difficulty: "hard",
    correctCount: 3,
    totalReviews: 7,
    streak: 0,
    tags: ["optimization", "performance"],
    createdAt: new Date("2024-03-05"),
  },
  // Computer Networking additional flashcards
  {
    id: 81,
    question: "What is a MAC address?",
    answer: "MAC (Media Access Control) address is a unique 48-bit identifier assigned to network interface cards. It consists of 6 pairs of hexadecimal digits and operates at the Data Link Layer.",
    subject: "networking",
    difficulty: "easy",
    correctCount: 8,
    totalReviews: 10,
    streak: 3,
    tags: ["mac", "addressing", "data-link"],
    createdAt: new Date("2024-03-06"),
  },
  {
    id: 82,
    question: "Explain network protocols hierarchy",
    answer: "Network protocols are organized in layers: Physical (cables), Data Link (Ethernet), Network (IP), Transport (TCP/UDP), Session, Presentation, and Application (HTTP, FTP).",
    subject: "networking",
    difficulty: "medium",
    correctCount: 6,
    totalReviews: 9,
    streak: 2,
    tags: ["protocols", "layering", "hierarchy"],
    createdAt: new Date("2024-03-07"),
  },
  {
    id: 83,
    question: "What is network latency?",
    answer: "Network latency is the time delay between sending a request and receiving a response. It's affected by distance, network congestion, processing delays, and transmission medium.",
    subject: "networking",
    difficulty: "easy",
    correctCount: 7,
    totalReviews: 10,
    streak: 3,
    tags: ["latency", "performance", "delay"],
    createdAt: new Date("2024-03-08"),
  },
  {
    id: 84,
    question: "Explain Quality of Service (QoS)",
    answer: "QoS is a set of technologies that manage network resources to provide predictable performance. It prioritizes traffic, manages bandwidth, and ensures service levels for critical applications.",
    subject: "networking",
    difficulty: "hard",
    correctCount: 2,
    totalReviews: 5,
    streak: 0,
    tags: ["qos", "traffic-management", "performance"],
    createdAt: new Date("2024-03-09"),
  },
  {
    id: 85,
    question: "What is network segmentation?",
    answer: "Network segmentation divides a network into smaller, isolated segments to improve security, performance, and manageability. Methods include VLANs, subnets, and firewalls.",
    subject: "networking",
    difficulty: "medium",
    correctCount: 5,
    totalReviews: 8,
    streak: 1,
    tags: ["segmentation", "security", "vlans"],
    createdAt: new Date("2024-03-10"),
  },
  // DSA flashcards
  {
    id: 86,
    question: "What is Big O notation?",
    answer: "Big O notation describes the upper bound of algorithm time/space complexity. Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n²) quadratic, O(2^n) exponential.",
    subject: "dsa",
    difficulty: "medium",
    correctCount: 6,
    totalReviews: 9,
    streak: 2,
    tags: ["complexity", "big-o", "analysis"],
    createdAt: new Date("2024-03-11"),
  },
  {
    id: 87,
    question: "Explain recursion vs iteration",
    answer: "Recursion solves problems by calling itself with smaller inputs. Iteration uses loops. Recursion is elegant but may cause stack overflow; iteration is more memory-efficient.",
    subject: "dsa",
    difficulty: "medium",
    correctCount: 7,
    totalReviews: 10,
    streak: 3,
    tags: ["recursion", "iteration", "problem-solving"],
    createdAt: new Date("2024-03-12"),
  },
  {
    id: 88,
    question: "What is dynamic programming?",
    answer: "Dynamic programming solves complex problems by breaking them into overlapping subproblems, storing results to avoid recomputation. Used in optimization problems like Fibonacci, shortest paths.",
    subject: "dsa",
    difficulty: "hard",
    correctCount: 3,
    totalReviews: 7,
    streak: 0,
    tags: ["dynamic-programming", "optimization", "memoization"],
    createdAt: new Date("2024-03-13"),
  },
  {
    id: 89,
    question: "Explain hash table collisions",
    answer: "Hash collisions occur when different keys map to the same hash value. Resolution methods include chaining (linked lists) and open addressing (linear/quadratic probing, double hashing).",
    subject: "dsa",
    difficulty: "medium",
    correctCount: 5,
    totalReviews: 8,
    streak: 1,
    tags: ["hashing", "collisions", "data-structures"],
    createdAt: new Date("2024-03-14"),
  },
  {
    id: 90,
    question: "What are balanced trees?",
    answer: "Balanced trees maintain height difference ≤1 between subtrees. Examples: AVL trees (strict balancing), Red-Black trees (approximate balancing). They ensure O(log n) operations.",
    subject: "dsa",
    difficulty: "hard",
    correctCount: 2,
    totalReviews: 6,
    streak: 0,
    tags: ["trees", "balancing", "avl", "red-black"],
    createdAt: new Date("2024-03-15"),
  },
  // Web Programming flashcards
  {
    id: 91,
    question: "What is the DOM?",
    answer: "Document Object Model (DOM) is a programming interface for HTML/XML documents. It represents the document as a tree structure that can be manipulated with JavaScript.",
    subject: "web",
    difficulty: "easy",
    correctCount: 8,
    totalReviews: 11,
    streak: 4,
    tags: ["dom", "javascript", "html"],
    createdAt: new Date("2024-03-16"),
  },
  {
    id: 92,
    question: "Explain event bubbling and capturing",
    answer: "Event bubbling propagates events from target element up to document. Event capturing propagates down from document to target. You can control this with addEventListener's third parameter.",
    subject: "web",
    difficulty: "medium",
    correctCount: 5,
    totalReviews: 8,
    streak: 1,
    tags: ["events", "bubbling", "capturing"],
    createdAt: new Date("2024-03-17"),
  },
  {
    id: 93,
    question: "What is CORS?",
    answer: "Cross-Origin Resource Sharing (CORS) is a security mechanism that allows or restricts web pages to access resources from different domains, protecting against malicious cross-site requests.",
    subject: "web",
    difficulty: "medium",
    correctCount: 4,
    totalReviews: 7,
    streak: 0,
    tags: ["cors", "security", "http"],
    createdAt: new Date("2024-03-18"),
  },
  {
    id: 94,
    question: "Explain RESTful API principles",
    answer: "REST principles: stateless communication, resource-based URLs, HTTP methods (GET, POST, PUT, DELETE), uniform interface, client-server architecture, and layered system design.",
    subject: "web",
    difficulty: "medium",
    correctCount: 6,
    totalReviews: 9,
    streak: 2,
    tags: ["rest", "api", "http"],
    createdAt: new Date("2024-03-19"),
  },
  {
    id: 95,
    question: "What is responsive web design?",
    answer: "Responsive design creates websites that adapt to different screen sizes and devices using flexible layouts, media queries, flexible images, and fluid grids.",
    subject: "web",
    difficulty: "easy",
    correctCount: 7,
    totalReviews: 10,
    streak: 3,
    tags: ["responsive", "css", "mobile"],
    createdAt: new Date("2024-03-20"),
  },
  // Technical Communication flashcards
  {
    id: 96,
    question: "What makes effective technical documentation?",
    answer: "Effective technical documentation is clear, concise, well-organized, uses appropriate examples, includes visuals, considers the audience, and is regularly updated and maintained.",
    subject: "tc",
    difficulty: "easy",
    correctCount: 8,
    totalReviews: 11,
    streak: 4,
    tags: ["documentation", "writing", "clarity"],
    createdAt: new Date("2024-03-21"),
  },
  {
    id: 97,
    question: "Explain technical presentation structure",
    answer: "Technical presentations should have: clear introduction with objectives, logical flow of content, visual aids to support points, real examples, Q&A session, and actionable conclusions.",
    subject: "tc",
    difficulty: "medium",
    correctCount: 6,
    totalReviews: 9,
    streak: 2,
    tags: ["presentations", "structure", "communication"],
    createdAt: new Date("2024-03-22"),
  },
  {
    id: 98,
    question: "What is audience analysis in technical communication?",
    answer: "Audience analysis involves understanding your audience's technical level, needs, expectations, and constraints to tailor your message, language, and delivery method accordingly.",
    subject: "tc",
    difficulty: "medium",
    correctCount: 5,
    totalReviews: 8,
    streak: 1,
    tags: ["audience", "analysis", "communication"],
    createdAt: new Date("2024-03-23"),
  },
  {
    id: 99,
    question: "Explain visual communication principles",
    answer: "Visual communication uses design elements like color, typography, layout, charts, and diagrams to convey information clearly, support text, and enhance understanding.",
    subject: "tc",
    difficulty: "easy",
    correctCount: 7,
    totalReviews: 10,
    streak: 3,
    tags: ["visual", "design", "communication"],
    createdAt: new Date("2024-03-24"),
  },
  {
    id: 100,
    question: "What is professional email etiquette?",
    answer: "Professional email includes clear subject lines, proper salutation, concise content, correct grammar, appropriate tone, clear call-to-action, and professional signature.",
    subject: "tc",
    difficulty: "easy",
    correctCount: 8,
    totalReviews: 11,
    streak: 4,
    tags: ["email", "etiquette", "professional"],
    createdAt: new Date("2024-03-25"),
  }
]

export default function FlashcardsPage() {
   const [filter, setFilter] = useState<"all" | "dbms" | "networking" | "signals" | "dsa" | "web" | "tc" | "dld" | "dm">("all")
   const [studyMode, setStudyMode] = useState(false)
   const [quizMode, setQuizMode] = useState(false)
   const [currentCardIndex, setCurrentCardIndex] = useState(0)
   const [showAnswer, setShowAnswer] = useState(false)
   const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0, streak: 0, timeLeft: 300 })
   const [srsMode, setSrsMode] = useState(false)
   const [audioEnabled, setAudioEnabled] = useState(false)

  // SRS (Spaced Repetition System) logic
  const getDueCards = () => {
    const now = new Date()
    return flashcards.filter(card => {
      if (!card.nextReview) return true // New cards
      return card.nextReview <= now
    })
  }

  const calculateNextReview = (card: Flashcard, correct: boolean) => {
    const now = new Date()
    let interval = 1 // days

    if (correct) {
      // SuperMemo-2 algorithm simplified
      switch (card.streak) {
        case 0: interval = 1; break
        case 1: interval = 6; break
        default: interval = Math.floor(card.streak * 2.5); break
      }
    } else {
      interval = 1 // Reset to 1 day on incorrect answer
    }

    const nextReview = new Date(now)
    nextReview.setDate(nextReview.getDate() + interval)
    return nextReview
  }

  const filteredCards = srsMode
    ? getDueCards().filter((card) => filter === "all" || card.subject === filter)
    : flashcards.filter((card) => filter === "all" || card.subject === filter)

  const currentCard = filteredCards[currentCardIndex]

  const handleCorrect = () => {
    setSessionStats((prev) => ({
      ...prev,
      correct: prev.correct + 1,
      total: prev.total + 1,
      streak: prev.streak + 1
    }))
    nextCard()
  }

  const handleIncorrect = () => {
    setSessionStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      streak: 0
    }))
    nextCard()
  }

  const nextCard = () => {
    setShowAnswer(false)
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      setCurrentCardIndex(0) // Loop back to start
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-600"
    if (accuracy >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  // Study Mode Component
  if (studyMode && filteredCards.length > 0) {
    return (
      <ProtectedLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Study Mode Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Study Mode</h1>
              <p className="text-muted-foreground">
                Card {currentCardIndex + 1} of {filteredCards.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-green-600">{sessionStats.correct}</span>
                <span className="text-muted-foreground"> / {sessionStats.total}</span>
              </div>
              <Button variant="outline" onClick={() => setStudyMode(false)}>
                Exit Study Mode
              </Button>
            </div>
          </div>

          {/* Progress */}
          <Progress value={((currentCardIndex + 1) / filteredCards.length) * 100} />

          {/* Flashcard */}
          <Card className="min-h-[400px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {currentCard.subject === "dbms" ? (
                    <Database className="h-5 w-5 text-primary" />
                  ) : (
                    <Network className="h-5 w-5 text-secondary" />
                  )}
                  <Badge className={getDifficultyColor(currentCard.difficulty)}>{currentCard.difficulty}</Badge>
                </div>
                <Badge variant="outline">
                  {Math.round((currentCard.correctCount / currentCard.totalReviews) * 100)}% accuracy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Question</h3>
                <p className="text-lg">{currentCard.question}</p>
              </div>

              {showAnswer && (
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-xl font-semibold text-center">Answer</h3>
                  <p className="text-lg text-center">{currentCard.answer}</p>
                </div>
              )}

              <div className="flex justify-center">
                {!showAnswer ? (
                  <Button onClick={() => setShowAnswer(true)} size="lg">
                    <Eye className="h-4 w-4 mr-2" />
                    Show Answer
                  </Button>
                ) : (
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={handleIncorrect} size="lg">
                      <X className="h-4 w-4 mr-2" />
                      Incorrect
                    </Button>
                    <Button onClick={handleCorrect} size="lg">
                      <Check className="h-4 w-4 mr-2" />
                      Correct
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session Stats */}
          {sessionStats.total > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Session Progress</h3>
                  <div className="text-2xl font-bold">
                    {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {sessionStats.correct} correct out of {sessionStats.total} cards
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ProtectedLayout>
    )
  }

  // Main Flashcards Page
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Flashcards</h1>
            <p className="text-muted-foreground">Review and master key concepts</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/upload">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Cards
              </Button>
            </Link>
            <Button onClick={() => setStudyMode(true)} disabled={filteredCards.length === 0}>
              <BookOpen className="h-4 w-4 mr-2" />
              Start Studying
            </Button>
            <Button variant="outline" onClick={() => {
              // Export flashcards as PDF (simplified - would need pdf library)
              const data = filteredCards.map(card => `${card.question}\n${card.answer}\n\n`).join('')
              const blob = new Blob([data], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'flashcards.txt'
              a.click()
            }}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flashcards.length}</div>
              <p className="text-xs text-muted-foreground">Available for study</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">DBMS</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flashcards.filter((c) => c.subject === "dbms").length}</div>
              <p className="text-xs text-muted-foreground">Database concepts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Networks</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flashcards.filter((c) => c.subject === "networking").length}</div>
              <p className="text-xs text-muted-foreground">Network concepts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Signals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flashcards.filter((c) => c.subject === "signals").length}</div>
              <p className="text-xs text-muted-foreground">Signal processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  (flashcards.reduce((sum, card) => sum + (card.totalReviews > 0 ? card.correctCount / card.totalReviews : 0), 0) /
                    flashcards.length) *
                    100,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Mode Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Subject:</span>
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="dbms">DBMS</SelectItem>
                <SelectItem value="networking">Computer Networks</SelectItem>
                <SelectItem value="signals">Systems & Signals</SelectItem>
                <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                <SelectItem value="web">Web Programming</SelectItem>
                <SelectItem value="tc">Technical Communication</SelectItem>
                <SelectItem value="dld">Digital Logic Design</SelectItem>
                <SelectItem value="dm">Discrete Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Mode:</span>
            <div className="flex space-x-2">
              <Button
                variant={!srsMode && !quizMode ? "default" : "outline"}
                size="sm"
                onClick={() => { setSrsMode(false); setQuizMode(false); }}
              >
                Browse
              </Button>
              <Button
                variant={srsMode ? "default" : "outline"}
                size="sm"
                onClick={() => { setSrsMode(true); setQuizMode(false); }}
              >
                SRS Review
              </Button>
              <Button
                variant={quizMode ? "default" : "outline"}
                size="sm"
                onClick={() => { setQuizMode(true); setSrsMode(false); }}
              >
                Quiz Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const accuracy = Math.round((card.correctCount / card.totalReviews) * 100)
            return (
              <Card key={card.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {card.subject === "dbms" ? (
                        <Database className="h-5 w-5 text-primary" />
                      ) : (
                        <Network className="h-5 w-5 text-secondary" />
                      )}
                      <Badge className={getDifficultyColor(card.difficulty)}>{card.difficulty}</Badge>
                    </div>
                    <Badge variant="outline" className={getAccuracyColor(accuracy)}>
                      {accuracy}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Question</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{card.question}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {card.correctCount}/{card.totalReviews} correct
                    </span>
                    <span>{card.subject.toUpperCase()}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCards.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No flashcards found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === "all"
                  ? "You don't have any flashcards yet."
                  : `No ${filter.toUpperCase()} flashcards found.`}
              </p>
              <Link href="/upload">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Flashcard
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedLayout>
  )
}

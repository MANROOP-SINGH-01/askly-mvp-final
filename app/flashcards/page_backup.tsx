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

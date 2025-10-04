"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Clock, Trophy, Target, Database, Network, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

const quizzes = [
  {
    id: 1,
    title: "Database Fundamentals",
    subject: "dbms",
    difficulty: "Beginner",
    questions: 15,
    duration: 20,
    xp: 150,
    completed: true,
    score: 85,
  },
  {
    id: 2,
    title: "SQL Queries & Joins",
    subject: "dbms",
    difficulty: "Intermediate",
    questions: 20,
    duration: 30,
    xp: 200,
    completed: false,
    score: null,
  },
  {
    id: 3,
    title: "Database Normalization",
    subject: "dbms",
    difficulty: "Advanced",
    questions: 12,
    duration: 25,
    xp: 250,
    completed: false,
    score: null,
  },
  {
    id: 4,
    title: "OSI Model & Protocols",
    subject: "networking",
    difficulty: "Beginner",
    questions: 18,
    duration: 25,
    xp: 180,
    completed: true,
    score: 92,
  },
  {
    id: 5,
    title: "TCP/IP & Routing",
    subject: "networking",
    difficulty: "Intermediate",
    questions: 22,
    duration: 35,
    xp: 220,
    completed: false,
    score: null,
  },
  {
    id: 6,
    title: "Network Security",
    subject: "networking",
    difficulty: "Advanced",
    questions: 16,
    duration: 30,
    xp: 280,
    completed: false,
    score: null,
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function QuizzesPage() {
  const [filter, setFilter] = useState<"all" | "dbms" | "networking">("all")
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "Beginner" | "Intermediate" | "Advanced">("all")

  const filteredQuizzes = quizzes.filter((quiz) => {
    const subjectMatch = filter === "all" || quiz.subject === filter
    const difficultyMatch = difficultyFilter === "all" || quiz.difficulty === difficultyFilter
    return subjectMatch && difficultyMatch
  })

  const completedQuizzes = quizzes.filter((q) => q.completed).length
  const totalXP = quizzes.filter((q) => q.completed).reduce((sum, q) => sum + q.xp, 0)
  const averageScore = quizzes
    .filter((q) => q.completed && q.score)
    .reduce((sum, q, _, arr) => sum + q.score! / arr.length, 0)

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and earn XP</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedQuizzes}</div>
              <p className="text-xs text-muted-foreground">Out of {quizzes.length} quizzes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalXP}</div>
              <p className="text-xs text-muted-foreground">From quizzes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(averageScore)}%</div>
              <p className="text-xs text-muted-foreground">Keep improving!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((completedQuizzes / quizzes.length) * 100)}%</div>
              <Progress value={(completedQuizzes / quizzes.length) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Subject:</span>
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="dbms">DBMS</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Difficulty:</span>
            <Select value={difficultyFilter} onValueChange={(value: any) => setDifficultyFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {quiz.subject === "dbms" ? (
                      <Database className="h-5 w-5 text-primary" />
                    ) : (
                      <Network className="h-5 w-5 text-secondary" />
                    )}
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  </div>
                  {quiz.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <CardDescription>
                  {quiz.subject.toUpperCase()} • {quiz.questions} questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.duration}m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>{quiz.xp} XP</span>
                    </div>
                  </div>
                </div>

                {quiz.completed && quiz.score && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Your Score</span>
                      <span className="font-medium">{quiz.score}%</span>
                    </div>
                    <Progress value={quiz.score} className="h-2" />
                  </div>
                )}

                <Link href={`/quizzes/${quiz.id}`}>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No quizzes found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more quizzes.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedLayout>
  )
}

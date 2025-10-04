"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, Trophy, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const sampleQuestions: Question[] = [
   {
     id: 1,
     question: "What is the primary purpose of database normalization?",
     options: [
       "To increase data redundancy",
       "To reduce data redundancy and improve data integrity",
       "To make queries run faster",
       "To increase storage space",
     ],
     correctAnswer: 1,
     explanation:
       "Database normalization is primarily used to reduce data redundancy and improve data integrity by organizing data into separate, related tables.",
   },
   {
     id: 2,
     question: "Which normal form eliminates transitive dependencies?",
     options: [
       "First Normal Form (1NF)",
       "Second Normal Form (2NF)",
       "Third Normal Form (3NF)",
       "Boyce-Codd Normal Form (BCNF)",
     ],
     correctAnswer: 2,
     explanation:
       "Third Normal Form (3NF) eliminates transitive dependencies, where a non-key attribute depends on another non-key attribute.",
   },
   {
     id: 3,
     question: "What is a foreign key in a relational database?",
     options: [
       "A key that uniquely identifies each record",
       "A key that links to the primary key of another table",
       "A key used for indexing",
       "A key that cannot be null",
     ],
     correctAnswer: 1,
     explanation:
       "A foreign key is a field (or collection of fields) in one table that refers to the primary key in another table, establishing a link between the two tables.",
   },
   {
     id: 4,
     question: "What does ACID stand for in database transactions?",
     options: [
       "Atomicity, Consistency, Isolation, Durability",
       "Accuracy, Completeness, Integrity, Durability",
       "Atomicity, Consistency, Indexing, Durability",
       "Accuracy, Consistency, Isolation, Durability",
     ],
     correctAnswer: 0,
     explanation:
       "ACID stands for Atomicity, Consistency, Isolation, and Durability, which are properties that guarantee reliable database transactions.",
   },
   {
     id: 5,
     question: "What is the difference between a primary key and a unique key?",
     options: [
       "Primary key can be null, unique key cannot",
       "Primary key cannot be null, unique key can be null",
       "They are the same",
       "Primary key is for indexing, unique key is for constraints",
     ],
     correctAnswer: 1,
     explanation:
       "A primary key cannot be null and uniquely identifies each record, while a unique key can be null but ensures uniqueness when not null.",
   },
   {
     id: 6,
     question: "What is a database index?",
     options: [
       "A way to store data",
       "A data structure that improves the speed of data retrieval",
       "A type of database",
       "A backup mechanism",
     ],
     correctAnswer: 1,
     explanation:
       "A database index is a data structure that improves the speed of data retrieval operations on a database table.",
   },
   {
     id: 7,
     question: "What is the purpose of the GROUP BY clause in SQL?",
     options: [
       "To sort data",
       "To filter data",
       "To group rows that have the same values",
       "To join tables",
     ],
     correctAnswer: 2,
     explanation:
       "The GROUP BY clause groups rows that have the same values in specified columns into summary rows.",
   },
   {
     id: 8,
     question: "What is a stored procedure?",
     options: [
       "A type of database",
       "A prepared SQL code that can be saved and reused",
       "A backup file",
       "A data type",
     ],
     correctAnswer: 1,
     explanation:
       "A stored procedure is a prepared SQL code that can be saved and reused, often containing multiple SQL statements.",
   },
   {
     id: 9,
     question: "What is database concurrency control?",
     options: [
       "Controlling database size",
       "Managing simultaneous access to data",
       "Backing up data",
       "Optimizing queries",
     ],
     correctAnswer: 1,
     explanation:
       "Database concurrency control manages simultaneous access to data to prevent conflicts and ensure data integrity.",
   },
   {
     id: 10,
     question: "What is a database trigger?",
     options: [
       "A type of index",
       "A stored procedure that automatically executes in response to events",
       "A backup mechanism",
       "A data type",
     ],
     correctAnswer: 1,
     explanation:
       "A database trigger is a stored procedure that automatically executes in response to certain events on a particular table or view.",
   },
   {
     id: 11,
     question: "What is the difference between INNER JOIN and LEFT JOIN?",
     options: [
       "INNER JOIN returns all rows, LEFT JOIN returns matching rows",
       "INNER JOIN returns matching rows, LEFT JOIN returns all rows from left table",
       "They are the same",
       "INNER JOIN is faster than LEFT JOIN",
     ],
     correctAnswer: 1,
     explanation:
       "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table.",
   },
   {
     id: 12,
     question: "What is database sharding?",
     options: [
       "A backup technique",
       "Horizontal partitioning of data across multiple databases",
       "Vertical partitioning of data",
       "Data encryption",
     ],
     correctAnswer: 1,
     explanation:
       "Database sharding is a method of horizontal partitioning of data across multiple databases or servers.",
   },
   {
     id: 13,
     question: "What is the CAP theorem?",
     options: [
       "Consistency, Availability, Partition tolerance",
       "Concurrency, Atomicity, Persistence",
       "Cache, Access, Performance",
       "Create, Alter, Protect",
     ],
     correctAnswer: 0,
     explanation:
       "The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition tolerance.",
   },
   {
     id: 14,
     question: "What is a database view?",
     options: [
       "A physical table",
       "A virtual table based on the result of a SELECT query",
       "A backup file",
       "An index type",
     ],
     correctAnswer: 1,
     explanation:
       "A database view is a virtual table based on the result of a SELECT query, which can be used like a regular table.",
   },
   {
     id: 15,
     question: "What is database replication?",
     options: [
       "Creating backups",
       "Copying and maintaining database objects across multiple databases",
       "Data encryption",
       "Query optimization",
     ],
     correctAnswer: 1,
     explanation:
       "Database replication is the process of copying and maintaining database objects, such as tables, in multiple databases.",
   },
 ]

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizStarted, showResults])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === sampleQuestions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / sampleQuestions.length) * 100)
  }

  const score = showResults ? calculateScore() : 0
  const correctAnswers = showResults
    ? selectedAnswers.filter((answer, index) => answer === sampleQuestions[index].correctAnswer).length
    : 0

  if (!quizStarted) {
    return (
      <ProtectedLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Link href="/quizzes">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Button>
          </Link>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Database Fundamentals Quiz</CardTitle>
              <CardDescription>Test your knowledge of basic database concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">20</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Quiz Instructions:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• You have 20 minutes to complete all questions</li>
                  <li>• Each question has only one correct answer</li>
                  <li>• You can navigate between questions freely</li>
                  <li>• Your progress is automatically saved</li>
                  <li>• You'll earn 150 XP for completing this quiz</li>
                </ul>
              </div>

              <Button onClick={() => setQuizStarted(true)} className="w-full" size="lg">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedLayout>
    )
  }

  if (showResults) {
    return (
      <ProtectedLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">{score}%</div>
                <div className="text-lg text-muted-foreground">
                  {correctAnswers} out of {sampleQuestions.length} correct
                </div>
                <Badge
                  variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}
                  className="text-lg px-4 py-2"
                >
                  {score >= 80 ? "Excellent!" : score >= 60 ? "Good Job!" : "Keep Practicing!"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">XP Earned</div>
                  <div className="text-2xl font-bold text-primary">150</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">Time Used</div>
                  <div className="text-2xl font-bold text-secondary">{formatTime(1200 - timeLeft)}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Answers:</h3>
                {sampleQuestions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-2 mb-2">
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your answer: {question.options[selectedAnswers[index]] || "Not answered"}
                        </p>
                        {selectedAnswers[index] !== question.correctAnswer && (
                          <p className="text-sm text-green-600 mt-1">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Link href="/quizzes" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Back to Quizzes
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setQuizStarted(false)
                    setShowResults(false)
                    setCurrentQuestion(0)
                    setSelectedAnswers([])
                    setTimeLeft(1200)
                  }}
                  className="flex-1"
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedLayout>
    )
  }

  const currentQ = sampleQuestions[currentQuestion]

  return (
    <ProtectedLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Database Fundamentals Quiz</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / sampleQuestions.length) * 100)}%</span>
          </div>
          <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} />
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestion === sampleQuestions.length - 1 ? (
            <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {sampleQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={
                    currentQuestion === index
                      ? "default"
                      : selectedAnswers[index] !== undefined
                        ? "secondary"
                        : "outline"
                  }
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className="aspect-square"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}

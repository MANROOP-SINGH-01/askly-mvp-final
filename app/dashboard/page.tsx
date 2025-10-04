"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookOpen, MessageSquare, Zap, Trophy, TrendingUp, Target, Sparkles, Star, Flame, Award, Plus, Check, X } from "lucide-react"
import Link from "next/link"

interface Goal {
  id: string
  text: string
  completed: boolean
  progress: number
  target: number
}

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Complete 1 quiz", completed: false, progress: 0, target: 1 },
    { id: "2", text: "Study 10 flashcards", completed: false, progress: 0, target: 10 },
    { id: "3", text: "Ask Ask!y AI 1 question", completed: false, progress: 0, target: 1 },
  ])
  const [newGoalText, setNewGoalText] = useState("")
  const [showAddGoal, setShowAddGoal] = useState(false)

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : goal.target }
        : goal
    ))
  }

  const addNewGoal = () => {
    if (newGoalText.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        text: newGoalText.trim(),
        completed: false,
        progress: 0,
        target: 1
      }
      setGoals([...goals, newGoal])
      setNewGoalText("")
      setShowAddGoal(false)
    }
  }

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId))
  }
  return (
    <ProtectedLayout>
      <div className="space-y-8 page-transition">
        {/* Welcome Header */}
        <div className="flex flex-col space-y-4 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
              Welcome back to Ask!y 🚀
            </h1>
            <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-600 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Continue your amazing learning journey in DBMS and Computer Networking
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-orange-50/70 to-red-50/70 backdrop-blur-md animate-scale-in" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Current Streak</CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg">
                <Flame className="h-4 w-4 text-white animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-800 flex items-center">
                7 days <div className="ml-2 text-lg">🔥</div>
              </div>
              <p className="text-xs text-orange-600 font-medium">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-blue-50/70 to-cyan-50/70 backdrop-blur-md animate-scale-in" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total XP</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white animate-bounce" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800 flex items-center">
                1,247 <div className="ml-2 text-lg">⭐</div>
              </div>
              <p className="text-xs text-blue-600 font-medium">Level 5</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-purple-50/70 to-pink-50/70 backdrop-blur-md animate-scale-in" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Quizzes Completed</CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg">
                <Zap className="h-4 w-4 text-white animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800 flex items-center">
                23 <div className="ml-2 text-lg">⚡</div>
              </div>
              <p className="text-xs text-purple-600 font-medium">This month</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-green-50/70 to-emerald-50/70 backdrop-blur-md animate-scale-in" style={{animationDelay: '0.4s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Flashcards Studied</CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg">
                <BookOpen className="h-4 w-4 text-white animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800 flex items-center">
                156 <div className="ml-2 text-lg">📚</div>
              </div>
              <p className="text-xs text-green-600 font-medium">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your progress in each subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Database Management Systems</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Computer Networking</span>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Badges and milestones you've unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Quiz Master</Badge>
                <Badge variant="secondary">Week Warrior</Badge>
                <Badge variant="secondary">DBMS Expert</Badge>
                <Badge variant="outline">Networking Novice</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200"
                >
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    <span className="text-purple-600">🤖</span>
                  </div>
                  <span className="font-semibold text-purple-700">Ask!y AI</span>
                </Button>
              </Link>

              <Link href="/quizzes">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <Zap className="h-6 w-6" />
                  <span>Take Quiz</span>
                </Button>
              </Link>

              <Link href="/flashcards">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Study Cards</span>
                </Button>
              </Link>

              <Link href="/community">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Community</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Today's Goals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Today's Goals</span>
                </CardTitle>
                <CardDescription>Complete these tasks to maintain your streak</CardDescription>
              </div>
              <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Goal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter your goal..."
                      value={newGoalText}
                      onChange={(e) => setNewGoalText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addNewGoal()}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addNewGoal} disabled={!newGoalText.trim()}>
                        Add Goal
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-3 group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-4 h-4 p-0 rounded-full"
                  onClick={() => toggleGoalCompletion(goal.id)}
                >
                  {goal.completed ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-muted border-2 border-gray-300" />
                  )}
                </Button>
                <span 
                  className={`text-sm flex-1 ${goal.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {goal.text} ({goal.progress}/{goal.target})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0 w-6 h-6"
                  onClick={() => deleteGoal(goal.id)}
                >
                  <X className="w-3 h-3 text-red-500" />
                </Button>
              </div>
            ))}
            {goals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No goals yet. Add your first goal to get started!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}

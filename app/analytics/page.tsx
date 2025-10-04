"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import ProtectedLayout from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Users, MessageSquare, BookOpen, Award, Target, Calendar, Clock, Brain, Zap } from "lucide-react"

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalQuizzes: number
  totalFlashcards: number
  totalPosts: number
  averageScore: number
  studyStreak: number
  weeklyActivity: Array<{ day: string; sessions: number; score: number }>
  subjectProgress: Array<{ subject: string; progress: number; color: string }>
  recentAchievements: Array<{ title: string; description: string; date: string; icon: string }>
}

const COLORS = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return

      try {
        // Mock data - simulate analytics
        const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (6 - i))
          const dayName = date.toLocaleDateString("en", { weekday: "short" })
          
          return {
            day: dayName,
            sessions: Math.floor(Math.random() * 8) + 2, // 2-10 sessions
            score: Math.floor(Math.random() * 30) + 70, // 70-100 score
          }
        })

        // Subject progress
        const subjectProgress = [
          { subject: "DBMS", progress: 75, color: "#6366f1" },
          { subject: "Computer Networking", progress: 60, color: "#06b6d4" },
          { subject: "General", progress: 45, color: "#10b981" },
        ]

        // Recent achievements
        const recentAchievements = [
          {
            title: "Quiz Master",
            description: "Completed 10 quizzes with 80%+ score",
            date: "2 days ago",
            icon: "trophy",
          },
          {
            title: "Study Streak",
            description: "7 day study streak achieved",
            date: "1 week ago",
            icon: "fire",
          },
          {
            title: "Knowledge Sharer",
            description: "Posted 5 helpful forum answers",
            date: "2 weeks ago",
            icon: "star",
          },
        ]

        setAnalytics({
          totalUsers: 1250, // Mock data
          activeUsers: 890,
          totalQuizzes: 28,
          totalFlashcards: 15,
          totalPosts: 7,
          averageScore: 84,
          studyStreak: 7,
          weeklyActivity,
          subjectProgress,
          recentAchievements,
        })
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [user, timeRange])

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </ProtectedLayout>
    )
  }

  if (!analytics) {
    return (
      <ProtectedLayout>
        <div className="text-center py-8">
          <p className="text-gray-600">Unable to load analytics data</p>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your learning progress and achievements</p>
          </div>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quizzes Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalQuizzes}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-full">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.averageScore}%</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+5% improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.studyStreak} days</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Keep it up!</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Forum Posts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalPosts}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Users className="w-4 h-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600 dark:text-purple-400">Community active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#6366f1" name="Study Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Brain className="w-5 h-5 mr-2" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analytics.subjectProgress.map((subject, index) => (
                <div key={subject.subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject.subject}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} name="Average Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Award className="w-5 h-5 mr-2" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analytics.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                  <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                    New
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Study Insights */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Study Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Best Study Time</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">You perform best between 2-4 PM with an average score of 85%</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Strength Area</h4>
                <p className="text-sm text-green-700 dark:text-green-400">DBMS is your strongest subject with 75% mastery</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">Focus Area</h4>
                <p className="text-sm text-orange-700 dark:text-orange-400">Spend more time on Computer Networking to improve scores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}

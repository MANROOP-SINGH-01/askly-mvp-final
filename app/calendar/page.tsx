"use client"

import { useState } from "react"
import ProtectedLayout from "@/components/layout/protected-layout"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, BookOpen, Zap, AlertTriangle, CheckCircle } from "lucide-react"

interface ExamEvent {
  id: string
  title: string
  subject: string
  type: "midterm" | "final" | "quiz" | "assignment"
  date: Date
  time: string
  status: "upcoming" | "completed" | "missed"
  importance: "high" | "medium" | "low"
  syllabus?: string[]
  fullName?: string
}

const MOCK_EXAM_EVENTS: ExamEvent[] = [
  // Midterm Examinations (Sept 28 - Oct 10)
  {
    id: "1",
    title: "DBMS Midterm",
    subject: "Database Management Systems",
    fullName: "Database Management Systems Midterm Examination",
    type: "midterm",
    date: new Date(2025, 8, 30), // September 30, 2025
    time: "10:00 AM",
    status: "upcoming",
    importance: "high",
    syllabus: ["Normalization", "ACID Properties", "SQL Joins", "Indexing"]
  },
  {
    id: "2",
    title: "Networks Midterm",
    subject: "Computer Networks",
    fullName: "Computer Networks Midterm Examination",
    type: "midterm",
    date: new Date(2025, 9, 2), // October 2, 2025
    time: "2:00 PM",
    status: "upcoming",
    importance: "high",
    syllabus: ["OSI Model", "TCP/UDP", "Subnetting", "Routing Algorithms"]
  },
  {
    id: "3",
    title: "DSA Midterm",
    subject: "Data Structures and Algorithms",
    fullName: "Data Structures and Algorithms Midterm Examination",
    type: "midterm",
    date: new Date(2025, 9, 5), // October 5, 2025
    time: "9:00 AM",
    status: "upcoming",
    importance: "high",
    syllabus: ["Arrays & Linked Lists", "Stacks & Queues", "Trees", "Sorting Algorithms"]
  },
  {
    id: "4",
    title: "Web Programming Midterm",
    subject: "Web Programming",
    fullName: "Web Programming Midterm Examination",
    type: "midterm",
    date: new Date(2025, 9, 8), // October 8, 2025
    time: "11:00 AM",
    status: "upcoming",
    importance: "high",
    syllabus: ["HTML/CSS", "JavaScript", "React Components", "RESTful APIs"]
  },
  
  // Term-End Examinations (Oct 22 - Oct 30)
  {
    id: "5",
    title: "DBMS Final",
    subject: "Database Management Systems",
    fullName: "Database Management Systems Final Examination",
    type: "final",
    date: new Date(2025, 9, 23), // October 23, 2025
    time: "10:00 AM",
    status: "upcoming",
    importance: "high",
    syllabus: ["Complete DBMS Syllabus", "Advanced SQL", "Database Security", "Performance Tuning"]
  },
  {
    id: "6",
    title: "Networks Final",
    subject: "Computer Networks",
    fullName: "Computer Networks Final Examination",
    type: "final",
    date: new Date(2025, 9, 25), // October 25, 2025
    time: "2:00 PM",
    status: "upcoming",
    importance: "high",
    syllabus: ["Complete Networking Syllabus", "Network Security", "Wireless Networks"]
  },
  {
    id: "7",
    title: "DSA Final",
    subject: "Data Structures and Algorithms",
    fullName: "Data Structures and Algorithms Final Examination",
    type: "final",
    date: new Date(2025, 9, 28), // October 28, 2025
    time: "9:00 AM",
    status: "upcoming",
    importance: "high",
    syllabus: ["Complete DSA Syllabus", "Advanced Algorithms", "Graph Algorithms", "Dynamic Programming"]
  },
  {
    id: "8",
    title: "Web Programming Final",
    subject: "Web Programming",
    fullName: "Web Programming Final Examination",
    type: "final",
    date: new Date(2025, 9, 30), // October 30, 2025
    time: "11:00 AM",
    status: "upcoming",
    importance: "high",
    syllabus: ["Complete Web Development", "Full-Stack Development", "API Design", "Security"]
  }
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarPage() {
  const { userProfile } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(month - 1)
    } else {
      newDate.setMonth(month + 1)
    }
    setCurrentDate(newDate)
  }

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event =>
      event.date.toDateString() === date.toDateString()
    )
  }

  const getEventTypeIcon = (type: ExamEvent["type"]) => {
    switch (type) {
      case "midterm":
      case "final":
        return <AlertTriangle className="w-3 h-3" />
      case "quiz":
        return <Zap className="w-3 h-3" />
      case "assignment":
        return <BookOpen className="w-3 h-3" />
      default:
        return <CalendarIcon className="w-3 h-3" />
    }
  }

  const getEventColor = (event: ExamEvent) => {
    if (event.status === "completed") return "bg-green-500"
    if (event.status === "missed") return "bg-gray-500"

    switch (event.type) {
      case "midterm":
        return "bg-red-500"
      case "final":
        return "bg-red-700"
      case "quiz":
        return "bg-blue-500"
      case "assignment":
        return "bg-yellow-500"
      default:
        return "bg-purple-500"
    }
  }

  const renderCalendarDays = () => {
    const days = []
    const today = new Date()

    // Midterm Examination Period (Sept 28 - Oct 10)
    const midtermStart = new Date(2025, 8, 28) // September 28
    const midtermEnd = new Date(2025, 9, 10)   // October 10

    // Term-End Examination Period (Oct 22 - Oct 30) 
    const termEndStart = new Date(2025, 9, 22) // October 22
    const termEndEnd = new Date(2025, 9, 30)   // October 30

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const events = getEventsForDate(date)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      const isMidtermPeriod = date >= midtermStart && date <= midtermEnd
      const isTermEndPeriod = date >= termEndStart && date <= termEndEnd

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 dark:border-gray-700 p-1 cursor-pointer transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 relative ${
            isToday ? "bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-400" : ""
          } ${
            isSelected ? "ring-2 ring-purple-500" : ""
          } ${
            isMidtermPeriod ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700" : ""
          } ${
            isTermEndPeriod ? "bg-red-200 dark:bg-red-900/50 border-red-400 dark:border-red-600" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {isMidtermPeriod && (
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-red-400"></div>
          )}
          {isTermEndPeriod && (
            <div className="absolute top-0 left-0 w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-red-600"></div>
          )}
          <div className={`text-sm font-semibold ${isToday ? "text-purple-700 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {events.slice(0, 2).map((event, index) => (
              <TooltipProvider key={event.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`${getEventColor(event)} text-white text-xs rounded px-1 py-0.5 flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      {getEventTypeIcon(event.type)}
                      <span className="truncate">{event.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{event.fullName || event.title}</h4>
                      <p className="text-sm">📅 {event.date.toLocaleDateString()} at {event.time}</p>
                      {event.syllabus && event.syllabus.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">📚 Syllabus:</p>
                          <ul className="text-xs space-y-1">
                            {event.syllabus.map((topic, i) => (
                              <li key={i}>• {topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {events.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{events.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  // Get relevant subjects based on user's branch
  const getRelevantSubjects = (branch?: string) => {
    switch (branch) {
      case "cse":
        return ["Database Management Systems", "Data Structures and Algorithms", "Computer Networks", "Web Programming"]
      case "it":
        return ["Database Management Systems", "Computer Networks", "Web Programming", "Technical Communication"]
      case "ece":
        return ["Computer Networks", "Systems and Signals", "Digital Logic Design", "Technical Communication"]
      case "ee":
        return ["Systems and Signals", "Digital Logic Design", "Discrete Mathematics"]
      case "me":
        return ["Technical Communication", "Discrete Mathematics"]
      case "ce":
        return ["Technical Communication", "Discrete Mathematics"]
      default:
        return ["Database Management Systems", "Computer Networks", "Data Structures and Algorithms", "Web Programming"]
    }
  }

  const relevantSubjects = getRelevantSubjects(userProfile?.branch)

  const filteredEvents = MOCK_EXAM_EVENTS.filter(event =>
    relevantSubjects.includes(event.subject)
  )

  const upcomingEvents = filteredEvents
    .filter(event => event.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <ProtectedLayout>
      <div className="space-y-8 page-transition">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Academic Calendar 📅
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            Track your exams, assignments, and important academic dates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                    {MONTHS[month]} {year}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/30"
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map(day => (
                    <div key={day} className="h-10 flex items-center justify-center font-semibold text-gray-600 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Legend */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg animate-slide-up" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-red-400"></div>
                    <span className="text-sm font-semibold text-red-700 dark:text-red-300">Midterm Examination Period</span>
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400">📅 September 28 - October 10, 2025</p>
                </div>

                <div className="p-3 bg-red-200 dark:bg-red-900/50 rounded-lg border border-red-400 dark:border-red-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-0 h-0 border-r-[8px] border-r-transparent border-b-[8px] border-b-red-600"></div>
                    <span className="text-sm font-semibold text-red-800 dark:text-red-200">Term-End Examination Period</span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300">📅 October 22 - October 30, 2025</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm dark:text-gray-300">Mid-term / Final Exams</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm dark:text-gray-300">Quizzes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm dark:text-gray-300">Assignments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm dark:text-gray-300">Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg animate-slide-up" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-slide-in-left" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getEventTypeIcon(event.type)}
                          <h4 className="font-semibold text-sm text-gray-800 dark:text-white">{event.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{event.subject}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{event.date.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Badge
                        variant={event.importance === "high" ? "destructive" : event.importance === "medium" ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {event.importance}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {upcomingEvents.length === 0 && (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No upcoming events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}

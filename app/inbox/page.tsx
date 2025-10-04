"use client"

import { useState } from "react"
import ProtectedLayout from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useNotifications } from "@/lib/notifications-context"
import { Search, Filter, MailOpen, Mail, Trash2, Archive, Star, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function InboxPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "unread" | "announcements" | "exams" | "achievements">("all")
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null)

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && !notification.read) ||
                         (filterType === "announcements" && notification.type === "announcement") ||
                         (filterType === "exams" && notification.type === "exam") ||
                         (filterType === "achievements" && notification.type === "achievement")

    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      case "exam":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "achievement":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "update":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "notice":
        return <Mail className="w-4 h-4 text-purple-500" />
      default:
        return <Mail className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMillis = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <ProtectedLayout>
      <div className="space-y-8 page-transition">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Inbox 📬
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
                All your notifications, announcements, and updates in one place
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="hover:bg-purple-50 dark:hover:bg-purple-900/30"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark all read
                </Button>
              )}
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                {unreadCount} unread
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
                
                <div className="space-y-2">
                  {[
                    { key: "all", label: "All", count: notifications.length },
                    { key: "unread", label: "Unread", count: unreadCount },
                    { key: "announcements", label: "Announcements", count: notifications.filter(n => n.type === "announcement").length },
                    { key: "exams", label: "Exams", count: notifications.filter(n => n.type === "exam").length },
                    { key: "achievements", label: "Achievements", count: notifications.filter(n => n.type === "achievement").length },
                  ].map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setFilterType(filter.key as any)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                        filterType === filter.key
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span>{filter.label}</span>
                      <Badge variant="secondary" className="ml-2">
                        {filter.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg animate-slide-up" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                    Notifications ({filteredNotifications.length})
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No notifications found</p>
                    <p className="text-sm">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer animate-slide-in-right ${
                          !notification.read
                            ? "bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                            : "bg-gray-50/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600"
                        } hover:shadow-md hover:scale-[1.02]`}
                        style={{animationDelay: `${0.4 + index * 0.05}s`}}
                        onClick={() => {
                          setSelectedNotification(notification.id)
                          if (!notification.read) {
                            markAsRead(notification.id)
                          }
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h3 className={`text-sm font-semibold truncate ${
                                  !notification.read 
                                    ? "text-gray-900 dark:text-white" 
                                    : "text-gray-700 dark:text-gray-300"
                                }`}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {formatTimeAgo(notification.date)}
                                </span>
                              </div>
                            </div>
                            <p className={`text-sm line-clamp-2 ${
                              !notification.read 
                                ? "text-gray-700 dark:text-gray-300" 
                                : "text-gray-600 dark:text-gray-400"
                            }`}>
                              {notification.message}
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.type}
                              </Badge>
                              {notification.icon && (
                                <span className="text-lg">{notification.icon}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

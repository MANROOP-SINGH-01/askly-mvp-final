"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useNotifications } from "@/lib/notifications-context"
import { useTheme } from "@/lib/theme-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Brain, Bell, Search, Settings, LogOut, User, Sparkles, Moon, Sun, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, userProfile, logout } = useAuth()
  const { notifications, unreadCount } = useNotifications()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  if (!user) return null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-gray-700/20"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Ask!y
            </span>
            <div className="text-yellow-400 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
          </Link>

          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-purple-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                onFocus={(e) => {
                  // Show search suggestions
                  const suggestions = document.getElementById('search-suggestions')
                  if (suggestions) suggestions.style.display = 'block'
                }}
                onBlur={(e) => {
                  // Hide search suggestions after a delay
                  setTimeout(() => {
                    const suggestions = document.getElementById('search-suggestions')
                    if (suggestions) suggestions.style.display = 'none'
                  }, 200)
                }}
              />
              {/* Search Suggestions Dropdown */}
              <div
                id="search-suggestions"
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 hidden"
              >
                <div className="p-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Recent Questions</div>
                  <div className="space-y-1">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      onClick={() => router.push('/chat')}
                    >
                      What is database normalization?
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      onClick={() => router.push('/chat')}
                    >
                      Explain OSI model layers
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      onClick={() => router.push('/quizzes')}
                    >
                      Practice DBMS quiz
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      onClick={() => router.push('/notes')}
                    >
                      Download study materials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-200"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 hover:scale-110"
                  title="Notifications"
                >
                  <Bell className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-all duration-200 ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold animate-pulse shadow-lg">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl animate-slide-in-right" align="end">
                <DropdownMenuLabel className="font-normal p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-gray-900 dark:text-white text-lg">Inbox</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          {unreadCount} new
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/inbox")}
                        className="text-xs hover:bg-purple-50 dark:hover:bg-purple-900/30"
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="max-h-[500px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <Bell className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <h3 className="font-medium mb-2">No notifications yet</h3>
                      <p className="text-sm">We'll notify you when something important happens</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      {notifications.slice(0, 8).map((notification, index) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="p-4 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer animate-slide-in-left"
                          style={{animationDelay: `${index * 0.05}s`}}
                          onClick={() => {
                            router.push("/inbox")
                            // Optional: Mark as read when clicked
                            // markAsRead(notification.id)
                          }}
                        >
                          <div className="flex items-start space-x-3 w-full">
                            {/* Icon and Priority Indicator */}
                            <div className="flex-shrink-0 relative">
                              <div className={`p-2 rounded-lg ${
                                notification.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                                notification.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                'bg-gray-100 dark:bg-gray-700'
                              }`}>
                                <span className="text-lg">{notification.icon}</span>
                              </div>
                              {!notification.read && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-semibold truncate ${
                                  !notification.read 
                                    ? "text-gray-900 dark:text-white" 
                                    : "text-gray-700 dark:text-gray-300"
                                }`}>
                                  {notification.title}
                                </h4>
                                <div className="flex items-center space-x-1">
                                  <Badge 
                                    className={`text-xs ${
                                      notification.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    {notification.priority}
                                  </Badge>
                                </div>
                              </div>
                              
                              <p className={`text-xs line-clamp-2 ${
                                !notification.read 
                                  ? "text-gray-700 dark:text-gray-300" 
                                  : "text-gray-600 dark:text-gray-400"
                              }`}>
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700">
                                    {notification.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    {(() => {
                                      const now = new Date()
                                      const notifDate = new Date(notification.date)
                                      const diffInMillis = now.getTime() - notifDate.getTime()
                                      const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60))
                                      const diffInDays = Math.floor(diffInHours / 24)

                                      if (diffInHours < 1) return "Just now"
                                      if (diffInHours < 24) return `${diffInHours}h ago`
                                      if (diffInDays < 7) return `${diffInDays}d ago`
                                      return notifDate.toLocaleDateString()
                                    })()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                      
                      {notifications.length > 8 && (
                        <div className="p-4 text-center border-t border-gray-100 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            +{notifications.length - 8} more notifications
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push("/inbox")}
                            className="w-full hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-700"
                          >
                            View All in Inbox
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {notifications.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                      <Button
                        variant="ghost"
                        onClick={() => router.push("/inbox")}
                        className="w-full text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Open Full Inbox
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-purple-500/20 transition-all duration-200" title={userProfile?.displayName}>
                  <Avatar className="h-10 w-10 border-2 border-gradient-to-r from-purple-400 to-blue-400">
                    <AvatarImage src={userProfile?.displayName || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold">
                      {userProfile?.displayName?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl" align="end">
                <DropdownMenuLabel className="font-normal p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-4 mb-3">
                    <Avatar className="w-16 h-16 border-4 border-gradient-to-r from-purple-400 to-blue-400">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-xl font-bold">
                        {userProfile?.displayName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{userProfile?.displayName}</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400 capitalize font-medium">{userProfile?.role}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Role-specific information */}
                  {userProfile?.role === "student" ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Age:</span>
                            <span className="font-semibold text-gray-800 dark:text-white ml-1">{userProfile.age} years</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Year:</span>
                            <span className="font-semibold text-gray-800 dark:text-white ml-1">{userProfile.yearOfStudy}{userProfile.yearOfStudy === 1 ? 'st' : userProfile.yearOfStudy === 2 ? 'nd' : userProfile.yearOfStudy === 3 ? 'rd' : 'th'} Year</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-500 dark:text-gray-400 text-xs">Course:</span>
                          <p className="font-semibold text-gray-800 dark:text-white text-sm">{userProfile.course}</p>
                        </div>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="text-gray-500 dark:text-gray-400 text-xs">Branch:</span>
                          <div className="flex items-center space-x-1">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              {userProfile.department === "Information Technology" ? "🖥️ IT" : 
                               userProfile.department === "Computer Science" ? "⚙️ CSE" : 
                               userProfile.department === "Electronics" ? "📡 ECE" : 
                               "🎓 " + userProfile.department}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Age:</span>
                            <span className="font-semibold text-gray-800 dark:text-white ml-1">{userProfile?.age} years</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Faculty Role:</span>
                            <span className="font-semibold text-gray-800 dark:text-white ml-1">{userProfile?.specialization}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center p-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg">
                      <div className="font-bold text-purple-700 dark:text-purple-300 text-sm">Level {userProfile?.level}</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400">Progress</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                      <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">{userProfile?.xp}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">XP Points</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg">
                      <div className="font-bold text-orange-700 dark:text-orange-300 text-sm">{userProfile?.streak}🔥</div>
                      <div className="text-xs text-orange-600 dark:text-orange-400">Day Streak</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                  onClick={() => router.push("/settings")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:bg-red-50 text-red-600 cursor-pointer transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

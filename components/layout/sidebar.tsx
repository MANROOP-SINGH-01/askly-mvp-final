"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/lib/auth-context"
import { useNotifications } from "@/lib/notifications-context"
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Zap,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Brain,
  Trophy,
  Upload,
  Calendar,
  Mail,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ask!y AI", href: "/chat", icon: MessageSquare },
  { name: "Flashcards", href: "/flashcards", icon: BookOpen },
  { name: "Quizzes", href: "/quizzes", icon: Zap },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Notes", href: "/notes", icon: BookOpen },
  { name: "Community", href: "/forum", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Inbox", href: "/inbox", icon: Mail },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { userProfile, logout } = useAuth()
  const { unreadCount } = useNotifications()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 glass backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-r border-white/20 dark:border-gray-700/20 transform transition-all duration-300 ease-out md:translate-x-0 shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 p-6 border-b border-white/20">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg animate-pulse hover:animate-none hover:scale-110 transition-transform duration-300">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Ask!y</span>
          </div>

          {/* User info */}
          {userProfile && (
            <div className="p-4 border-b border-white/20 animate-slide-in-left">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <span className="text-sm font-bold text-white">
                    {userProfile.displayName.charAt(0).toUpperCase()}
                  </span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{userProfile.displayName}</p>
                  <p className="text-xs text-purple-600 capitalize font-medium">{userProfile.role}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-2 text-center">
                  <div className="font-bold text-purple-700">Level {userProfile.level}</div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-2 text-center">
                  <div className="font-bold text-blue-700">{userProfile.xp} XP</div>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-2 text-center">
                  <div className="font-bold text-orange-700">{userProfile.streak}🔥</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <div
                    key={item.name}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden",
                          isActive 
                            ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:from-purple-600 hover:to-blue-700" 
                            : "text-gray-600 hover:text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                        )}
                        <item.icon className={cn(
                          "mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                          isActive ? "text-white" : "text-gray-500"
                        )} />
                        <span className="font-medium">{item.name}</span>
                        {item.name === "Inbox" && unreadCount > 0 && (
                          <div className="ml-auto">
                            <div className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                              {unreadCount > 9 ? "9+" : unreadCount}
                            </div>
                          </div>
                        )}
                        {isActive && item.name !== "Inbox" && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Logout */}
          <div className="p-4 border-t border-white/20">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 hover:scale-105 group"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}

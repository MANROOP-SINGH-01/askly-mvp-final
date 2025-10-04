"use client"

import React, { createContext, useContext, useState } from "react"

export interface Notification {
  id: string
  type: "announcement" | "update" | "notice" | "exam" | "achievement"
  title: string
  message: string
  date: Date
  read: boolean
  priority: "low" | "medium" | "high"
  icon?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "announcement",
    title: "🎉 New Feature: Ask!y AI Enhanced!",
    message: "Our AI chat system has been upgraded with better responses and faster processing. Try it out now!",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    priority: "high",
    icon: "🤖"
  },
  {
    id: "2",
    type: "exam",
    title: "📚 Mid-term Exam Reminder",
    message: "Your DBMS mid-term exam is scheduled for next Monday at 10:00 AM. Make sure you're prepared!",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    priority: "high",
    icon: "⚠️"
  },
  {
    id: "3",
    type: "achievement",
    title: "🏆 Streak Achievement Unlocked!",
    message: "Congratulations! You've maintained a 7-day study streak. Keep up the excellent work!",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: false,
    priority: "medium",
    icon: "🔥"
  },
  {
    id: "4",
    type: "update",
    title: "🔄 System Update",
    message: "We've improved the flashcard system with better spaced repetition algorithms for enhanced learning.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    priority: "low",
    icon: "📚"
  },
  {
    id: "5",
    type: "notice",
    title: "📢 Community Forum Guidelines",
    message: "Please review our updated community guidelines to ensure a positive learning environment for everyone.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: false,
    priority: "medium",
    icon: "👥"
  },
  {
    id: "6",
    type: "exam",
    title: "📝 Networking Final Exam",
    message: "Your Computer Networking final exam is in 3 days. Review materials available in the study section.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    priority: "high",
    icon: "🌐"
  }
]

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const addNotification = (notificationData: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

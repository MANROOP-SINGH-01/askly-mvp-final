"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  uid: string
  email: string
}

interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: "student" | "faculty" | "admin"
  age?: number
  course?: string
  department?: string
  branch?: string
  yearOfStudy?: number
  employeeId?: string
  specialization?: string
  xp: number
  level: number
  streak: number
  badges: string[]
  subjects: string[]
  createdAt: Date
  lastActive: Date
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string, role: "student" | "faculty") => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user credentials
const MOCK_USERS = [
  {
    email: "imbhogal17@gmail.com",
    password: "askly@123",
    profile: {
      uid: "user1",
      email: "imbhogal17@gmail.com",
      displayName: "MR. SINGH",
      role: "student" as const,
      age: 20,
      course: "B.Tech Information Technology",
      department: "Information Technology",
      yearOfStudy: 2,
      xp: 150,
      level: 2,
      streak: 5,
      badges: ["early-bird", "quick-learner"],
      subjects: ["DBMS", "Computer Networks", "Web Programming", "DSA"],
      createdAt: new Date(),
      lastActive: new Date(),
    }
  },
  {
    email: "john.doe@example.com",
    password: "password123",
    profile: {
      uid: "user2",
      email: "john.doe@example.com",
      displayName: "John Doe",
      role: "faculty" as const,
      age: 35,
      department: "Computer Science",
      employeeId: "FAC001",
      specialization: "Database Systems & Networks",
      xp: 500,
      level: 5,
      streak: 12,
      badges: ["mentor", "expert"],
      subjects: ["DBMS", "Computer Networks", "Systems and Signals"],
      createdAt: new Date(),
      lastActive: new Date(),
    }
  },
  {
    email: "sarah.wilson@test.com",
    password: "test123",
    profile: {
      uid: "user3",
      email: "sarah.wilson@test.com",
      displayName: "Sarah Wilson",
      role: "student" as const,
      age: 19,
      course: "Information Technology",
      department: "Information Technology",
      branch: "it",
      yearOfStudy: 2,
      xp: 75,
      level: 1,
      streak: 2,
      badges: ["newcomer"],
      subjects: ["Web Programming", "Digital Logic Design", "Technical Communication"],
      createdAt: new Date(),
      lastActive: new Date(),
    }
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('mockUser')
    const savedProfile = localStorage.getItem('mockUserProfile')
    
    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser))
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password)
    
    if (!mockUser) {
      throw new Error('Invalid credentials')
    }

    const user = { uid: mockUser.profile.uid, email: mockUser.email }
    const profile = mockUser.profile

    setUser(user)
    setUserProfile(profile)
    
    localStorage.setItem('mockUser', JSON.stringify(user))
    localStorage.setItem('mockUserProfile', JSON.stringify(profile))
  }

  const signUp = async (email: string, password: string, displayName: string, role: "student" | "faculty") => {
    const newProfile: UserProfile = {
      uid: `user${Date.now()}`,
      email,
      displayName,
      role,
      xp: 0,
      level: 1,
      streak: 0,
      badges: [],
      subjects: role === "faculty" ? [] : ["dbms", "networking"],
      createdAt: new Date(),
      lastActive: new Date(),
    }

    const user = { uid: newProfile.uid, email }

    setUser(user)
    setUserProfile(newProfile)
    
    localStorage.setItem('mockUser', JSON.stringify(user))
    localStorage.setItem('mockUserProfile', JSON.stringify(newProfile))
  }

  const logout = async () => {
    setUser(null)
    setUserProfile(null)
    localStorage.removeItem('mockUser')
    localStorage.removeItem('mockUserProfile')
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

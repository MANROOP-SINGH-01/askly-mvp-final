"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { Loader2 } from "lucide-react"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400/20 via-blue-500/20 to-pink-400/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400/10 via-purple-500/10 to-cyan-400/10 animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-2xl">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Loading Ask!y</h3>
            <p className="text-gray-600 text-sm animate-pulse">Preparing your learning experience...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 relative overflow-x-hidden transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-cyan-200/15 dark:from-blue-500/8 dark:to-cyan-500/8 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      
      {/* Fixed Top Navbar */}
      <Navbar />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="md:ml-64 min-h-screen relative z-10 flex flex-col">
        {/* Content with top padding for navbar */}
        <div className="flex-1 p-6 pt-24 md:pt-22">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}

export default ProtectedLayout

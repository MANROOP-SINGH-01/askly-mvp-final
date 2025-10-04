"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2, Sparkles, User, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formFocused, setFormFocused] = useState(false)
  const [loginType, setLoginType] = useState<"student" | "admin">("student")
  const { signIn } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to Ask!y",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Floating sparkles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-purple-400 animate-pulse">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-32 right-16 text-blue-400 animate-bounce" style={{animationDelay: '0.5s'}}>
          <Sparkles className="w-3 h-3" />
        </div>
        <div className="absolute bottom-32 left-20 text-pink-400 animate-pulse" style={{animationDelay: '1s'}}>
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-20 right-10 text-indigo-400 animate-bounce" style={{animationDelay: '1.5s'}}>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <Card className={`w-full max-w-md backdrop-blur-sm bg-white/95 border-0 shadow-2xl transition-all duration-700 hover:shadow-3xl transform hover:-translate-y-1 ${formFocused ? 'ring-2 ring-purple-500/20 shadow-purple-500/25' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-lg"></div>
        
        <CardHeader className="text-center relative z-10 pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            Welcome to Ask!y
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2 animate-slide-up">
            Sign in to continue your amazing learning journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            onFocus={() => setFormFocused(true)}
            onBlur={() => setFormFocused(false)}
          >
            {/* Login Type Selection */}
            <div className="space-y-2 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Label className="text-sm font-medium text-gray-700">Login As</Label>
              <Select value={loginType} onValueChange={(value: "student" | "admin") => setLoginType(value)}>
                <SelectTrigger className="transition-all duration-300 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 hover:border-gray-300 bg-gray-50/50 focus:bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span>Student</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span>Admin Panel</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                Email Address
              </Label>
              <div className="relative group">
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="transition-all duration-300 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 hover:border-gray-300 pl-4 pr-4 py-3 rounded-lg bg-gray-50/50 focus:bg-white"
                  placeholder="Enter your email"
                  required 
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
            
            <div className="space-y-2 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-300 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 hover:border-gray-300 pl-4 pr-12 py-3 rounded-lg bg-gray-50/50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-slide-up"
              style={{animationDelay: '0.6s'}}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing you in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </Button>

            {/* Demo credentials hint */}
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <p className="text-xs text-gray-600 text-center">
                <strong>Demo Credentials ({loginType}):</strong><br />
                📧 imbhogal17@gmail.com | 🔐 askly@123
                {loginType === "admin" && (
                  <><br />📧 john.doe@example.com | 🔐 password123</>
                )}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

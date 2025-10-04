import { LoginForm } from "@/components/auth/login-form"
import { Brain } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left side - Hero/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Welcome to <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Ask!y</span>
            </h1>
            <p className="text-lg text-purple-100 leading-relaxed">
              Your intelligent study companion for Computer Science. Master DBMS, Networking, DSA, and more with AI-powered assistance.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-purple-200">Study Topics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">AI</div>
                <div className="text-purple-200">Powered Learning</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/20 via-purple-100/20 to-cyan-100/20"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-slate-200/[0.05] bg-grid-16"></div>

        <div className="w-full max-w-md space-y-8 relative z-10 p-6">
          {/* Logo for mobile */}
          <div className="text-center lg:hidden animate-fade-in">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">Ask!y</span>
            </Link>
          </div>

          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <LoginForm />
          </div>

          <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

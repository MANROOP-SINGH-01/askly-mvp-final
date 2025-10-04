"use client"

import Link from "next/link"
import { Brain, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Ask!y
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                AI-driven chatbot for students to get reliable answers and one-stop access
                to all SCATTERED academic resources. Transform your studies with interactive quizzes, flashcards, and community discussions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-purple-300">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/dashboard" className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform">
                  📊 Dashboard
                </Link>
                <Link href="/quizzes" className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform">
                  ⚡ Quizzes
                </Link>
                <Link href="/flashcards" className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform">
                  📚 Flashcards
                </Link>
                <Link href="/forum" className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform">
                  👥 Community Forum
                </Link>
                <Link href="/leaderboard" className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform">
                  🏆 Leaderboard
                </Link>
                <Link href="/analytics" className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform">
                  📈 Analytics
                </Link>
              </div>
            </div>

            {/* Learning Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-300">Learning Resources</h3>
              <div className="space-y-3">
                <Link href="/chat" className="block text-gray-300 hover:text-blue-300 transition-colors duration-200 hover:translate-x-1 transform">
                  🗄️ DBMS Tutorials
                </Link>
                <Link href="/chat" className="block text-gray-300 hover:text-blue-300 transition-colors duration-200 hover:translate-x-1 transform">
                  🌐 Networking Guides
                </Link>
                <Link href="/notes" className="block text-gray-300 hover:text-blue-300 transition-colors duration-200 hover:translate-x-1 transform">
                  📖 Study Materials
                </Link>
                <Link href="/quizzes" className="block text-gray-300 hover:text-blue-300 transition-colors duration-200 hover:translate-x-1 transform">
                  🎯 Practice Tests
                </Link>
                <Link href="/flashcards" className="block text-gray-300 hover:text-blue-300 transition-colors duration-200 hover:translate-x-1 transform">
                  🔧 Tools & Utilities
                </Link>
                <Link href="/chat" className="block text-gray-300 hover:text-blue-300 transition-colors duration-200 hover:translate-x-1 transform">
                  💡 Tips & Tricks
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-pink-300">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:support@askly.edu" className="hover:text-pink-300 transition-colors duration-200">
                      support@askly.edu
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+1234567890" className="hover:text-pink-300 transition-colors duration-200">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="hover:text-pink-300 transition-colors duration-200">
                      Education District, Learning City
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-pink-300">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200 hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
                <p>© 2024 Ask!y. Made with</p>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <p>for students worldwide.</p>
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-purple-300 transition-colors duration-200">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-purple-300 transition-colors duration-200">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-purple-300 transition-colors duration-200">Cookie Policy</Link>
                <Link href="/help" className="hover:text-purple-300 transition-colors duration-200">Help Center</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decoration */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-xl animate-pulse"></div>
      </div>
    </footer>
  )
}

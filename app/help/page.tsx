"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  Search,
  MessageSquare,
  Book,
  Video,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  Plus,
  Minus,
  Settings
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I reset my password?",
    answer: "Go to Settings > Account > Change Password. Enter your current password and choose a new one. You'll receive a confirmation email once the change is successful.",
    category: "Account",
    helpful: 45
  },
  {
    id: "2",
    question: "How does the PYQ Analysis work?",
    answer: "Our PYQ Analysis Engine analyzes previous year questions to identify recurring topics, calculate exam probabilities, and suggest study priorities. It's currently available for DBMS and Computer Networks.",
    category: "Features",
    helpful: 38
  },
  {
    id: "3",
    question: "What's the difference between Core Notes and Extended Notes?",
    answer: "Core Notes provide answers only from university/college materials. Extended Notes include additional resources like YouTube videos, external websites, and reference books for comprehensive learning.",
    category: "AI Chat",
    helpful: 52
  },
  {
    id: "4",
    question: "How do I download notes and assignments?",
    answer: "Navigate to the Notes page, select your year and subject, then click the Download button next to any file. You can also view files online before downloading.",
    category: "Notes",
    helpful: 29
  },
  {
    id: "5",
    question: "Can I retake quizzes?",
    answer: "Yes! You can retake any quiz multiple times. Your best score will be recorded, and you'll earn XP for each attempt to encourage learning.",
    category: "Quizzes",
    helpful: 33
  },
  {
    id: "6",
    question: "How do I join the community forum?",
    answer: "The Community forum is accessible from the sidebar. You can create posts, reply to discussions, and filter by recent or trending topics. All registered users can participate.",
    category: "Community",
    helpful: 27
  }
]

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const categories = ["all", "Account", "Features", "AI Chat", "Notes", "Quizzes", "Community"]

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Contact form submitted:", contactForm)
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <ProtectedLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl mx-auto">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions and get support for Ask!y platform.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            
            {filteredFAQs.length === 0 ? (
              <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground text-center">
                    Try adjusting your search terms or browse different categories
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-0">
                      <button
                        className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{faq.question}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {faq.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {faq.helpful} people found this helpful
                              </span>
                            </div>
                          </div>
                          {expandedFAQ === faq.id ? (
                            <Minus className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Plus className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4 border-t">
                          <p className="text-muted-foreground mt-3">{faq.answer}</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="text-sm text-muted-foreground">Was this helpful?</span>
                            <Button variant="outline" size="sm">
                              👍 Yes
                            </Button>
                            <Button variant="outline" size="sm">
                              👎 No
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Contact and Quick Links */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask!y AI Chat
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/notes">
                    <Book className="h-4 w-4 mr-2" />
                    Study Materials
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/quizzes">
                    <Video className="h-4 w-4 mr-2" />
                    Practice Quizzes
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@askly.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <Input
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                  <Textarea
                    placeholder="Describe your issue..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    required
                  />
                  <Button type="submit" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
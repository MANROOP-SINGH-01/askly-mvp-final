"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import ProtectedLayout from "@/components/layout/protected-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageSquare, ThumbsUp, ThumbsDown, Plus, Search, Filter, Clock, TrendingUp, Pin, CheckCircle, Eye } from "lucide-react"

interface Reply {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: Date
  upvotes: number
  downvotes: number
  upvotedBy: string[]
  downvotedBy: string[]
  parentId?: string // For nested replies
}

interface Post {
  id: string
  title: string
  content: string
  subject: string
  tags: string[]
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: Date
  upvotes: number
  downvotes: number
  upvotedBy: string[]
  downvotedBy: string[]
  replies: Reply[]
  views: number
  isPinned: boolean
  isResolved: boolean
}

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "How to optimize SQL queries for better performance?",
    content: "I'm working on a database with millions of records and my queries are running very slowly. What are some best practices for optimizing SQL queries? I've tried indexing but still facing issues with complex joins.",
    subject: "DBMS",
    tags: ["sql", "performance", "optimization", "indexing"],
    authorId: "user1",
    authorName: "DatabaseExpert",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    upvotes: 15,
    downvotes: 2,
    upvotedBy: ["user2", "user3"],
    downvotedBy: [],
    replies: [
      {
        id: "reply1",
        content: "Use EXPLAIN to see query execution plan. Consider adding indexes on frequently queried columns. Also, avoid SELECT * and use specific column names.",
        authorId: "user2",
        authorName: "DBExpert",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        upvotes: 5,
        downvotes: 0,
        upvotedBy: ["user1", "user3"],
        downvotedBy: []
      },
      {
        id: "reply2", 
        content: "Also consider query caching and connection pooling for better performance.",
        authorId: "user3",
        authorName: "PerformanceTuner",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        upvotes: 3,
        downvotes: 0,
        upvotedBy: ["user1"],
        downvotedBy: []
      }
    ],
    views: 245,
    isPinned: true,
    isResolved: true // Has replies
  },
  {
    id: "2",
    title: "TCP vs UDP: When to use which protocol?",
    content: "I'm building a real-time chat application and confused about whether to use TCP or UDP. Can someone explain the key differences and use cases for each protocol? What would be better for a chat app that needs to handle 1000+ concurrent users?",
    subject: "Computer Networking",
    tags: ["tcp", "udp", "networking", "real-time", "chat"],
    authorId: "user2",
    authorName: "NetworkNewbie",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    upvotes: 12,
    downvotes: 1,
    upvotedBy: ["user1", "user4"],
    downvotedBy: [],
    replies: [
      {
        id: "tcp_udp_reply1",
        content: "For real-time chat with 1000+ users, I'd recommend using TCP for message delivery (reliability is crucial for chat) and UDP for presence indicators or typing notifications (where speed matters more than reliability). Many modern chat apps use this hybrid approach.",
        authorId: "expert1",
        authorName: "NetworkExpert",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        upvotes: 15,
        downvotes: 0,
        upvotedBy: ["user1", "user2", "user3"],
        downvotedBy: []
      },
      {
        id: "tcp_udp_reply2",
        content: "Also consider WebSockets over TCP for the main chat connection. It provides reliable, bidirectional communication perfect for chat applications. You can implement message acknowledgments and handle connection drops gracefully.",
        authorId: "user5",
        authorName: "WebDevPro",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        upvotes: 8,
        downvotes: 1,
        upvotedBy: ["user2", "user4"],
        downvotedBy: ["user6"]
      }
    ],
    views: 180,
    isPinned: false,
    isResolved: true
  },
  {
    id: "3",
    title: "Best practices for database normalization",
    content: "I'm designing a new database schema and want to make sure I'm following proper normalization rules. Can someone provide examples of 1NF, 2NF, and 3NF with practical scenarios? Also, when is denormalization acceptable?",
    subject: "DBMS",
    tags: ["normalization", "database-design", "schema", "1nf", "2nf", "3nf"],
    authorId: "user3",
    authorName: "SchemaDesigner",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    upvotes: 20,
    downvotes: 0,
    upvotedBy: ["user1", "user2", "user4", "user5"],
    downvotedBy: [],
    replies: [
      {
        id: "norm_reply1",
        content: "Great question! 1NF: Eliminate repeating groups (each cell contains only one value). 2NF: Remove partial dependencies (non-key columns depend on entire primary key). 3NF: Remove transitive dependencies (non-key columns shouldn't depend on other non-key columns). Example: Student table with StudentID, Name, CourseID, CourseName violates 2NF because CourseName depends only on CourseID, not the full key.",
        authorId: "expert2",
        authorName: "DBMSGuru",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        upvotes: 12,
        downvotes: 0,
        upvotedBy: ["user1", "user3", "user4"],
        downvotedBy: []
      },
      {
        id: "norm_reply2",
        content: "Denormalization is acceptable when: 1) Read performance is critical 2) Complex joins are impacting performance 3) Data warehouse scenarios 4) Caching frequently accessed data. But always document why you're denormalizing!",
        authorId: "user6",
        authorName: "PerformanceTuner",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        upvotes: 7,
        downvotes: 0,
        upvotedBy: ["user2", "user5"],
        downvotedBy: []
      }
    ],
    views: 340,
    isPinned: false,
    isResolved: false
  },
  {
    id: "4",
    title: "OSI Model layers explained with real examples",
    content: "I'm struggling to understand the OSI model. Can someone explain each layer with practical, real-world examples? How does data actually flow through these layers when I visit a website?",
    subject: "Computer Networking",
    tags: ["osi-model", "networking", "layers", "protocol-stack"],
    authorId: "user4",
    authorName: "StudentLearner",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    upvotes: 8,
    downvotes: 0,
    upvotedBy: ["user1", "user3"],
    downvotedBy: [],
    replies: [],
    views: 150,
    isPinned: false,
    isResolved: true
  },
  {
    id: "5",
    title: "ACID properties in database transactions",
    content: "Can someone explain ACID properties with simple examples? I understand the concepts theoretically but need help with practical scenarios where each property matters. Also, what happens when ACID properties are violated?",
    subject: "DBMS",
    tags: ["acid", "transactions", "database", "consistency", "atomicity"],
    authorId: "user5",
    authorName: "TransactionGuru",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    upvotes: 18,
    downvotes: 1,
    upvotedBy: ["user1", "user2", "user3", "user4"],
    downvotedBy: [],
    replies: [],
    views: 210,
    isPinned: false,
    isResolved: false
  },
  {
    id: "6",
    title: "IPv4 vs IPv6: Migration strategies and benefits",
    content: "Our organization is planning to migrate from IPv4 to IPv6. What are the key benefits of IPv6 and what challenges should we expect during migration? Any best practices or tools you'd recommend?",
    subject: "Computer Networking",
    tags: ["ipv4", "ipv6", "migration", "networking", "address-space"],
    authorId: "user6",
    authorName: "NetworkAdmin",
    authorAvatar: "",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    upvotes: 10,
    downvotes: 0,
    upvotedBy: ["user2", "user4"],
    downvotedBy: [],
    replies: [],
    views: 95,
    isPinned: false,
    isResolved: false
  }
]

export default function ForumPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(MOCK_POSTS)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showReplies, setShowReplies] = useState<{[key: string]: boolean}>({
    // Show replies by default for posts that have them
    "1": true, "2": true, "3": true
  })
  const [replyContent, setReplyContent] = useState<{[key: string]: string}>({})
  const [showReplyInput, setShowReplyInput] = useState<{[key: string]: boolean}>({})

  // Status is now automatically determined by replies
  // Posts with replies are considered solved, posts without replies are pending

  // Create post form state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    subject: "",
    tags: "",
  })

  const subjects = ["DBMS", "Computer Networking", "General"]

  useEffect(() => {
    let filtered = [...posts]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by subject
    if (selectedSubject !== "all") {
      filtered = filtered.filter((post) => post.subject === selectedSubject)
    }

    // Sort posts
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "popular":
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        break
      case "mostReplies":
        filtered.sort((a, b) => b.replies - a.replies)
        break
    }

    // Pinned posts first
    filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedSubject, sortBy])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newPost.title.trim() || !newPost.content.trim() || !newPost.subject) return

    const tags = newPost.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag)

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      subject: newPost.subject,
      tags,
      authorId: user.uid,
      authorName: user.email?.split("@")[0] || "Anonymous",
      authorAvatar: "",
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      upvotedBy: [],
      downvotedBy: [],
      replies: [],
      views: 1,
      isPinned: false,
      isResolved: false,
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "", subject: "", tags: "" })
    setShowCreatePost(false)
  }

  const handleVote = (postId: string, voteType: "up" | "down") => {
    if (!user) return

    setPosts(posts.map(post => {
      if (post.id !== postId) return post

      const hasUpvoted = post.upvotedBy.includes(user.uid)
      const hasDownvoted = post.downvotedBy.includes(user.uid)
      
      let newUpvotes = post.upvotes
      let newDownvotes = post.downvotes
      let newUpvotedBy = [...post.upvotedBy]
      let newDownvotedBy = [...post.downvotedBy]

      if (voteType === "up") {
        if (hasUpvoted) {
          // Remove upvote
          newUpvotes -= 1
          newUpvotedBy = newUpvotedBy.filter(id => id !== user.uid)
        } else {
          // Add upvote, remove downvote if exists
          newUpvotes += 1
          newUpvotedBy.push(user.uid)
          if (hasDownvoted) {
            newDownvotes -= 1
            newDownvotedBy = newDownvotedBy.filter(id => id !== user.uid)
          }
        }
      } else {
        if (hasDownvoted) {
          // Remove downvote
          newDownvotes -= 1
          newDownvotedBy = newDownvotedBy.filter(id => id !== user.uid)
        } else {
          // Add downvote, remove upvote if exists
          newDownvotes += 1
          newDownvotedBy.push(user.uid)
          if (hasUpvoted) {
            newUpvotes -= 1
            newUpvotedBy = newUpvotedBy.filter(id => id !== user.uid)
          }
        }
      }

      return {
        ...post,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        upvotedBy: newUpvotedBy,
        downvotedBy: newDownvotedBy,
      }
    }))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMillis = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const handleViewPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, views: post.views + 1 } : post
    ))
  }

  const handleAddReply = (postId: string, parentId?: string) => {
    const contentKey = parentId ? `${postId}_${parentId}` : postId
    if (!user || !replyContent[contentKey]?.trim()) return

    const newReply: Reply = {
      id: Date.now().toString(),
      content: replyContent[contentKey],
      authorId: user.uid,
      authorName: user.email?.split("@")[0] || "Anonymous",
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      upvotedBy: [],
      downvotedBy: [],
      parentId
    }

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ))

    setReplyContent(prev => ({ ...prev, [contentKey]: '' }))
    setShowReplyInput(prev => ({ ...prev, [contentKey]: false }))
  }

  const handleReplyVote = (postId: string, replyId: string, voteType: "up" | "down") => {
    if (!user) return

    setPosts(posts.map(post => {
      if (post.id !== postId) return post

      return {
        ...post,
        replies: post.replies.map(reply => {
          if (reply.id !== replyId) return reply

          const hasUpvoted = reply.upvotedBy.includes(user.uid)
          const hasDownvoted = reply.downvotedBy.includes(user.uid)

          let newUpvotes = reply.upvotes
          let newDownvotes = reply.downvotes
          let newUpvotedBy = [...reply.upvotedBy]
          let newDownvotedBy = [...reply.downvotedBy]

          if (voteType === "up") {
            if (hasUpvoted) {
              newUpvotes -= 1
              newUpvotedBy = newUpvotedBy.filter(id => id !== user.uid)
            } else {
              newUpvotes += 1
              newUpvotedBy.push(user.uid)
              if (hasDownvoted) {
                newDownvotes -= 1
                newDownvotedBy = newDownvotedBy.filter(id => id !== user.uid)
              }
            }
          } else {
            if (hasDownvoted) {
              newDownvotes -= 1
              newDownvotedBy = newDownvotedBy.filter(id => id !== user.uid)
            } else {
              newDownvotes += 1
              newDownvotedBy.push(user.uid)
              if (hasUpvoted) {
                newUpvotes -= 1
                newUpvotedBy = newUpvotedBy.filter(id => id !== user.uid)
              }
            }
          }

          return {
            ...reply,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            upvotedBy: newUpvotedBy,
            downvotedBy: newDownvotedBy,
          }
        })
      }
    }))
  }

  const handleTogglePostStatus = (postId: string) => {
    if (!user) return

    setPosts(posts.map(post => {
      if (post.id !== postId) return post
      
      // Only allow the author to toggle their own post status
      if (post.authorId !== user.uid) return post

      return {
        ...post,
        isResolved: !post.isResolved
      }
    }))
  }

  const renderReplies = (postId: string, replies: Reply[], parentId?: string, depth = 0) => {
    const filteredReplies = replies.filter(reply => reply.parentId === parentId)

    return filteredReplies.map((reply) => (
      <div key={reply.id} className={`flex space-x-3 ${depth > 0 ? 'ml-8 mt-3' : 'bg-gray-50 rounded-lg p-3'}`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {reply.authorName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">{reply.authorName}</span>
            <span className="text-xs text-gray-500">{formatTimeAgo(reply.createdAt)}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReplyVote(postId, reply.id, "up")}
              className={`p-1 h-6 w-6 ${
                reply.upvotedBy.includes(user?.uid || "")
                  ? "text-green-600 bg-green-50"
                  : "text-gray-400 hover:text-green-600"
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <span className="text-xs text-gray-600">
              {reply.upvotes - reply.downvotes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReplyVote(postId, reply.id, "down")}
              className={`p-1 h-6 w-6 ${
                reply.downvotedBy.includes(user?.uid || "")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-400 hover:text-red-600"
              }`}
            >
              <ThumbsDown className="w-3 h-3" />
            </Button>
            {depth < 2 && ( // Limit nesting depth to 2 levels
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyInput(prev => ({ ...prev, [`${postId}_${reply.id}`]: !prev[`${postId}_${reply.id}`] }))}
                className="text-xs text-gray-500 hover:text-blue-600"
              >
                Reply
              </Button>
            )}
          </div>

          {/* Nested reply input */}
          {showReplyInput[`${postId}_${reply.id}`] && (
            <div className="mt-3 border-t pt-3">
              <div className="flex space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent[`${postId}_${reply.id}`] || ''}
                    onChange={(e) => setReplyContent(prev => ({ ...prev, [`${postId}_${reply.id}`]: e.target.value }))}
                    className="min-h-[60px] mb-2 text-sm"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowReplyInput(prev => ({ ...prev, [`${postId}_${reply.id}`]: false }))}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddReply(postId, reply.id)}
                      disabled={!replyContent[`${postId}_${reply.id}`]?.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Render nested replies */}
          {renderReplies(postId, replies, reply.id, depth + 1)}
        </div>
      </div>
    ))
  }

  return (
    <ProtectedLayout>
      <div className="space-y-8 page-transition">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Community Forum 🚀
            </h1>
            <p className="text-gray-600 mt-2 text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
              Ask questions, share knowledge, and connect with peers
            </p>
          </div>

          <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 animate-slide-in-right">
                <Plus className="w-4 h-4 mr-2 animate-pulse" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="What's your question or topic?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={newPost.subject} onValueChange={(value) => setNewPost({ ...newPost, subject: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Describe your question or share your knowledge..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    placeholder="sql, database, query, etc."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                    Create Post
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-purple-500 transition-colors duration-200" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Most Recent
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Most Popular
                </div>
              </SelectItem>
              <SelectItem value="mostReplies">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Most Replies
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">Be the first to start a discussion!</p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`card-hover border-0 shadow-lg cursor-pointer transition-all duration-500 animate-slide-up ${
                  post.isPinned ? "bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-pink-50/80 backdrop-blur-md border-purple-200" : "bg-white/70 backdrop-blur-md"
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleViewPost(post.id)}
              >
                <CardContent className="p-6 relative overflow-hidden">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-600">
                        {post.authorName[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {post.isPinned && (
                          <Badge className="bg-indigo-100 text-indigo-800">
                            <Pin className="w-3 h-3 mr-1" />
                            Pinned
                          </Badge>
                        )}
                        {post.authorId === user?.uid ? (
                          // User's own post - clickable status toggle
                          <Badge 
                            className={`cursor-pointer transition-all hover:scale-105 ${
                              post.isResolved 
                                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTogglePostStatus(post.id)
                            }}
                          >
                            {post.isResolved ? (
                              <>🟢 <CheckCircle className="w-3 h-3 mx-1" /> Solved</>
                            ) : (
                              <>🟡 <Clock className="w-3 h-3 mx-1" /> Pending</>
                            )}
                          </Badge>
                        ) : (
                          // Other users' posts - display only
                          <Badge className={post.isResolved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {post.isResolved ? (
                              <>🟢 <CheckCircle className="w-3 h-3 mx-1" /> Solved</>
                            ) : (
                              <>🟡 <Clock className="w-3 h-3 mx-1" /> Pending</>
                            )}
                          </Badge>
                        )}
                        <Badge variant="outline">{post.subject}</Badge>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {post.authorName}</span>
                          <span>{formatTimeAgo(post.createdAt)}</span>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(post.id, "up")
                              }}
                              className={`p-1 h-8 w-8 ${
                                post.upvotedBy.includes(user?.uid || "")
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-400 hover:text-green-600"
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium text-gray-600 min-w-[24px] text-center">
                              {post.upvotes - post.downvotes}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(post.id, "down")
                              }}
                              className={`p-1 h-8 w-8 ${
                                post.downvotedBy.includes(user?.uid || "")
                                  ? "text-red-600 bg-red-50"
                                  : "text-gray-400 hover:text-red-600"
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowReplies(prev => ({ ...prev, [post.id]: !prev[post.id] }))
                              }}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              <span className="text-sm">{post.replies.length} replies</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowReplyInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))
                              }}
                              className="text-gray-500 hover:text-green-600"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>

                          {/* Reply Input */}
                    {showReplyInput[post.id] && (
                      <div className="mt-4 border-t pt-4">
                        <div className="flex space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                              {user?.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Write a reply..."
                              value={replyContent[post.id] || ''}
                              onChange={(e) => setReplyContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                              className="min-h-[80px] mb-2"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setShowReplyInput(prev => ({ ...prev, [post.id]: false }))}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleAddReply(post.id)}
                                disabled={!replyContent[post.id]?.trim()}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies Display */}
                    {showReplies[post.id] && post.replies.length > 0 && (
                      <div className="mt-4 border-t pt-4 space-y-3">
                        <h4 className="font-semibold text-sm text-gray-700">Replies ({post.replies.length})</h4>
                        {renderReplies(post.id, post.replies)}
                      </div>
                    )}
                  </CardContent>
                </Card>
            ))
          )}
        </div>
      </div>
    </ProtectedLayout>
  )
}

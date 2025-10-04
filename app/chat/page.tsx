"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { useAuth } from "@/lib/auth-context"
import { getAIResponse } from "@/lib/ai-adapter"
import {
    Send,
    Bot,
    User,
    Database,
    Network,
    Lightbulb,
    BookOpen,
    Brain,
    TrendingUp,
    Target,
    Youtube,
    Play,
    Sparkles,
    Calculator,
    Code,
    MessageSquare,
    Cpu,
    Globe,
    Video,
    ExternalLink,
    BookOpenCheck
} from "lucide-react"

interface Message {
    id: string
    content: string
    sender: "user" | "askly"
    timestamp: Date
    subject?: SubjectType
    confidence?: number
    sources?: string[]
    videos?: VideoReference[]
    codeSnippet?: string
    diagram?: DiagramData
    hints?: string[]
    followUpQuestions?: string[]
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    simplified?: string
}

interface DiagramData {
    type: 'erd' | 'network' | 'flowchart' | 'uml'
    title: string
    description: string
    mermaidCode: string
}

interface VideoReference {
    title: string
    url: string
    thumbnail: string
    duration: string
    relevance: string
}

interface PYQAnalysis {
    topic: string
    year: number
    semester: number
    frequency: number
    examProbability: number
    lastAppeared: string
    difficulty: "Easy" | "Medium" | "Hard"
    studyPriority: "High" | "Medium" | "Low"
    keyQuestions: string[]
    videos?: VideoReference[]
    websites?: string[]
    books?: string[]
}

type SubjectType = "dm" | "web" | "dsa" | "tc" | "dld" | "dbms" | "networking" | "signals"

const subjects = {
    dm: { name: "Discrete Mathematics", icon: Calculator, color: "text-blue-500" },
    web: { name: "Web Programming", icon: Globe, color: "text-green-500" },
    dsa: { name: "Data Structures & Algorithms", icon: Code, color: "text-purple-500" },
    tc: { name: "Technical Communication", icon: MessageSquare, color: "text-orange-500" },
    dld: { name: "Digital Logic Design", icon: Cpu, color: "text-red-500" },
    dbms: { name: "DBMS", icon: Database, color: "text-indigo-500" },
    networking: { name: "Computer Networks", icon: Network, color: "text-cyan-500" },
    signals: { name: "Systems and Signals", icon: TrendingUp, color: "text-pink-500" }
}

const suggestedQuestions = {
    dm: [
        "Explain graph theory fundamentals",
        "What are relations and functions?",
        "Define mathematical induction",
        "Explain combinatorics and permutations",
        "What is propositional logic?",
        "How do you prove by contradiction?",
        "What are equivalence relations?",
        "Explain set theory operations",
        "What is the pigeonhole principle?",
        "How do recurrence relations work?"
    ],
    web: [
        "How does HTTP protocol work?",
        "Explain JavaScript closures",
        "What is React component lifecycle?",
        "How do CSS flexbox and grid work?",
        "What are RESTful APIs?",
        "Explain asynchronous JavaScript",
        "What is DOM manipulation?",
        "How does responsive design work?",
        "What are web security best practices?",
        "Explain server-side rendering vs client-side"
    ],
    dsa: [
        "Explain binary search algorithm",
        "What are hash tables?",
        "How do sorting algorithms compare?",
        "Explain dynamic programming",
        "What are tree traversal methods?",
        "How do graph algorithms work?",
        "What is time complexity analysis?",
        "Explain divide and conquer approach",
        "What are greedy algorithms?",
        "How do priority queues work?"
    ],
    tc: [
        "How to write effective technical documentation?",
        "What are presentation best practices?",
        "How to structure a technical report?",
        "What is professional email etiquette?",
        "How to conduct effective meetings?",
        "What makes good technical writing?",
        "How to create compelling presentations?",
        "What is audience analysis?",
        "How to handle Q&A sessions?",
        "What are visual communication principles?"
    ],
    dld: [
        "Explain Boolean algebra",
        "What are logic gates?",
        "How do flip-flops work?",
        "Explain multiplexers and demultiplexers",
        "What are combinational circuits?",
        "How do sequential circuits work?",
        "What is Karnaugh map simplification?",
        "Explain counter and register design",
        "What are memory elements?",
        "How does digital system design work?"
    ],
    dbms: [
        "What is Database Normalization?",
        "Explain ACID properties.",
        "What are different types of Joins?",
        "How does Indexing improve performance?",
        "What is the difference between MySQL and NoSQL?",
        "Explain Transaction Management.",
        "What is Concurrency Control?",
        "What is a Database Trigger?",
        "How does Data Warehousing work?",
        "What is Query Optimization?"
    ],
    networking: [
        "Explain the OSI model layers",
        "What is the difference between TCP and UDP?",
        "How does DNS resolution work?",
        "What is subnetting and CIDR?",
        "Explain routing protocols like OSPF and BGP",
        "How does network security work?",
        "What are VLANs and their benefits?",
        "Explain network topologies",
        "How does load balancing work?",
        "What is network troubleshooting?"
    ],
    signals: [
        "What are Fourier transforms?",
        "Explain sampling theorem",
        "What is signal convolution?",
        "How do filters work in signal processing?",
        "What are Z-transforms?",
        "Explain digital signal processing",
        "What is frequency domain analysis?",
        "How do analog-to-digital converters work?",
        "What is signal modulation?",
        "Explain noise reduction techniques"
    ]
}

// Mock video references for extended mode
const mockVideos: VideoReference[] = [
    {
        title: "Database Normalization Explained with Examples",
        url: "https://www.youtube.com/watch?v=xoTyrdT9SZI",
        thumbnail: "https://i.ytimg.com/vi/xoTyrdT9SZI/maxresdefault.jpg",
        duration: "15:23",
        relevance: "Comprehensive normalization tutorial"
    },
    {
        title: "OSI Model Explained in Detail",
        url: "https://www.youtube.com/watch?v=vv4y_uOneC0",
        thumbnail: "https://i.ytimg.com/vi/vv4y_uOneC0/maxresdefault.jpg",
        duration: "12:45",
        relevance: "Layer-by-layer OSI model breakdown"
    }
]

// Mock PYQ Analysis Data for all subjects
const pyqAnalysis: Record<SubjectType, PYQAnalysis[]> = {
    dm: [
        {
            topic: "Graph Theory",
            year: 2,
            semester: 1,
            frequency: 82,
            examProbability: 90,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What is a graph?", "Explain graph traversal", "What are spanning trees?"],
            videos: [{
                title: "Graph Theory Complete Tutorial",
                url: "https://www.youtube.com/watch?v=09_LlHjoEiY",
                thumbnail: "https://i.ytimg.com/vi/09_LlHjoEiY/maxresdefault.jpg",
                duration: "45:30",
                relevance: "Complete graph theory concepts"
            }],
            websites: ["https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"],
            books: ["Discrete Mathematics by Kenneth Rosen"]
        },
        {
            topic: "Mathematical Induction",
            year: 1,
            semester: 1,
            frequency: 75,
            examProbability: 85,
            lastAppeared: "May 2023",
            difficulty: "Easy",
            studyPriority: "High",
            keyQuestions: ["What is mathematical induction?", "Prove by induction", "Strong vs weak induction"]
        }
    ],
    web: [
        {
            topic: "JavaScript Fundamentals",
            year: 3,
            semester: 2,
            frequency: 88,
            examProbability: 95,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What are closures?", "Explain event loop", "What is hoisting?"],
            videos: [{
                title: "JavaScript Complete Course",
                url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
                thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
                duration: "3:26:42",
                relevance: "Complete JavaScript tutorial"
            }]
        }
    ],
    dsa: [
        {
            topic: "Sorting Algorithms",
            year: 2,
            semester: 1,
            frequency: 90,
            examProbability: 95,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["Compare sorting algorithms", "Explain quicksort", "What is merge sort?"],
            videos: [{
                title: "Sorting Algorithms Explained",
                url: "https://www.youtube.com/watch?v=kPRA0W1kECg",
                thumbnail: "https://i.ytimg.com/vi/kPRA0W1kECg/maxresdefault.jpg",
                duration: "18:30",
                relevance: "Visual sorting algorithms explanation"
            }]
        }
    ],
    tc: [
        {
            topic: "Technical Writing",
            year: 1,
            semester: 2,
            frequency: 70,
            examProbability: 80,
            lastAppeared: "Dec 2023",
            difficulty: "Easy",
            studyPriority: "High",
            keyQuestions: ["What is technical writing?", "How to structure documents?", "Writing for audience"]
        }
    ],
    dld: [
        {
            topic: "Boolean Algebra",
            year: 1,
            semester: 2,
            frequency: 85,
            examProbability: 92,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What is Boolean algebra?", "Explain De Morgan's laws", "Simplify Boolean expressions"]
        }
    ],
    dbms: [
        {
            topic: "Database Normalization",
            year: 2,
            semester: 2,
            frequency: 85,
            examProbability: 92,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What is 1NF?", "Explain 2NF with example", "What is 3NF?", "Difference between BCNF and 3NF"],
            videos: [mockVideos[0]],
            websites: ["https://www.geeksforgeeks.org/database-normalization/"],
            books: ["Database System Concepts by Silberschatz"]
        },
        {
            topic: "ACID Properties",
            year: 2,
            semester: 2,
            frequency: 78,
            examProbability: 88,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What does ACID stand for?", "Explain each property", "Why are ACID properties important?"]
        },
        {
            topic: "SQL Joins",
            year: 2,
            semester: 2,
            frequency: 72,
            examProbability: 85,
            lastAppeared: "May 2023",
            difficulty: "Easy",
            studyPriority: "High",
            keyQuestions: ["What are different types of joins?", "Explain inner join", "What is left join?"]
        },
        {
            topic: "Indexing and B+ Trees",
            year: 2,
            semester: 2,
            frequency: 65,
            examProbability: 78,
            lastAppeared: "Dec 2023",
            difficulty: "Hard",
            studyPriority: "Medium",
            keyQuestions: ["What is indexing?", "Explain B+ tree structure", "Advantages of indexing"]
        },
        {
            topic: "Transaction Management",
            year: 2,
            semester: 2,
            frequency: 58,
            examProbability: 72,
            lastAppeared: "May 2023",
            difficulty: "Hard",
            studyPriority: "Medium",
            keyQuestions: ["What is a transaction?", "Explain concurrency control", "What are deadlock and how to prevent?"]
        }
    ],
    networking: [
        {
            topic: "OSI Model",
            year: 3,
            semester: 1,
            frequency: 88,
            examProbability: 95,
            lastAppeared: "Dec 2023",
            difficulty: "Easy",
            studyPriority: "High",
            keyQuestions: ["Explain OSI layers", "What is the purpose of each layer?", "Compare OSI and TCP/IP"],
            videos: [mockVideos[1]],
            websites: ["https://www.geeksforgeeks.org/osi-model/"],
            books: ["Computer Networks by Tanenbaum"]
        },
        {
            topic: "TCP vs UDP",
            year: 3,
            semester: 1,
            frequency: 82,
            examProbability: 90,
            lastAppeared: "Dec 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["Difference between TCP and UDP", "When to use TCP?", "When to use UDP?"]
        },
        {
            topic: "Subnetting and CIDR",
            year: 3,
            semester: 1,
            frequency: 75,
            examProbability: 85,
            lastAppeared: "May 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What is subnetting?", "Explain CIDR notation", "How to calculate subnets?"]
        },
        {
            topic: "Routing Algorithms",
            year: 3,
            semester: 1,
            frequency: 68,
            examProbability: 82,
            lastAppeared: "Dec 2023",
            difficulty: "Hard",
            studyPriority: "Medium",
            keyQuestions: ["Explain distance vector routing", "What is link state routing?", "Compare OSPF and BGP"]
        },
        {
            topic: "Error Detection & Correction",
            year: 3,
            semester: 1,
            frequency: 55,
            examProbability: 68,
            lastAppeared: "May 2023",
            difficulty: "Hard",
            studyPriority: "Low",
            keyQuestions: ["What is parity check?", "Explain CRC", "Difference between detection and correction"]
        }
    ],
    signals: [
        {
            topic: "Fourier Transforms",
            year: 3,
            semester: 2,
            frequency: 80,
            examProbability: 88,
            lastAppeared: "Dec 2023",
            difficulty: "Hard",
            studyPriority: "High",
            keyQuestions: ["What is Fourier transform?", "Explain DFT vs FFT", "Applications of Fourier analysis"]
        },
        {
            topic: "Sampling Theorem",
            year: 3,
            semester: 2,
            frequency: 70,
            examProbability: 82,
            lastAppeared: "May 2023",
            difficulty: "Medium",
            studyPriority: "High",
            keyQuestions: ["What is Nyquist theorem?", "Explain aliasing", "How to avoid sampling errors?"]
        }
    ]
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello! I'm Ask!y AI, your intelligent study companion. I'm here to help you with all your computer science subjects including DBMS, Computer Networks, DSA, Web Programming, and more. Switch to Extended Notes mode for additional resources and video references. What would you like to learn about today?",
            sender: "askly",
            timestamp: new Date(),
        },
    ])

    const [input, setInput] = useState("")
    const [subject, setSubject] = useState<SubjectType>("dbms")
    const [loading, setLoading] = useState(false)
    const [extendedMode, setExtendedMode] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<PYQAnalysis | null>(null)
    const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const { userProfile } = useAuth()

    // Scroll functions removed since auto-scroll is disabled

    // Removed auto-scroll behavior

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
            timestamp: new Date(),
            subject,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            // Enhanced AI response with difficulty options
            const response = await getAIResponse(input, subject as "dbms" | "networking", extendedMode, difficulty, false)

            let enhancedContent = response.message
            let videos: VideoReference[] = []

            if (extendedMode) {
                enhancedContent += "\n\n📚 **Extended Knowledge**: This topic connects to broader computer science concepts and industry applications."

                // Add relevant videos for extended mode - always include for the subject
                if (subject === "dbms") {
                    videos.push(mockVideos[0])
                    enhancedContent += "\n\n📖 **Supplementary Notes**: Database normalization is crucial for eliminating data redundancy and ensuring data integrity. Key normal forms: 1NF (eliminate repeating groups), 2NF (remove partial dependencies), 3NF (remove transitive dependencies), BCNF (Boyce-Codd normal form for complex dependencies)."
                } else if (subject === "networking") {
                    videos.push(mockVideos[1])
                    enhancedContent += "\n\n📖 **Supplementary Notes**: The OSI model provides a framework for understanding network communications. Each layer has specific functions: Physical (bits), Data Link (frames), Network (packets), Transport (segments), Session (dialog control), Presentation (data translation), Application (user interface)."
                } else {
                    // For other subjects, add relevant videos from PYQ data
                    const subjectPYQs = pyqAnalysis[subject]
                    if (subjectPYQs && subjectPYQs.length > 0) {
                        const relevantPYQ = subjectPYQs.find(pyq =>
                            input.toLowerCase().includes(pyq.topic.toLowerCase()) ||
                            pyq.keyQuestions.some(q => input.toLowerCase().includes(q.toLowerCase().split(' ')[0]))
                        )
                        if (relevantPYQ && relevantPYQ.videos && relevantPYQ.videos.length > 0) {
                            videos.push(...relevantPYQ.videos)
                        }
                    }
                }
            }

            const asklyMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: enhancedContent,
                sender: "askly",
                timestamp: new Date(),
                subject,
                confidence: response.confidence,
                sources: response.sources,
                videos: videos.length > 0 ? videos : undefined,
                codeSnippet: response.codeSnippet,
                diagram: response.diagram,
                hints: response.hints,
                followUpQuestions: response.followUpQuestions,
                difficulty: response.difficulty,
                simplified: response.simplified,
            }

            setMessages((prev) => [...prev, asklyMessage])
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "I'm sorry, I encountered an error while processing your question. Please try again.",
                sender: "askly",
                timestamp: new Date(),
                subject,
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    const handleSuggestedQuestion = (question: string) => {
        setInput(question)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const openVideo = (url: string) => {
        window.open(url, '_blank')
    }

    const SubjectIcon = subjects[subject].icon

    return (
        <ProtectedLayout>
            <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Ask!y AI
                            </span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Your intelligent study companion for all CS subjects</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Notes Mode Tabs */}
                        <Tabs value={extendedMode ? "extended" : "core"} onValueChange={(value) => setExtendedMode(value === "extended")} className="w-auto">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="core" className="text-sm">Core Notes</TabsTrigger>
                                <TabsTrigger value="extended" className="text-sm">Extended Notes</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {/* Subject Selector and Difficulty */}
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center space-x-4">
                                {/* Subject Selector */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">Subject:</span>
                                    <Select value={subject} onValueChange={(value: SubjectType) => setSubject(value)}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(subjects).map(([key, { name, icon: Icon, color }]) => (
                                                <SelectItem key={key} value={key}>
                                                    <div className="flex items-center space-x-2">
                                                        <Icon className={`h-4 w-4 ${color}`} />
                                                        <span>{name}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Difficulty Selector */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">Level:</span>
                                    <Select value={difficulty} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setDifficulty(value)}>
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">👶 Beginner</SelectItem>
                                            <SelectItem value="intermediate">🎯 Intermediate</SelectItem>
                                            <SelectItem value="advanced">🔬 Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <ResizablePanelGroup direction="horizontal" className="flex-1">
                    {/* Chat Area */}
                    <ResizablePanel defaultSize={75} minSize={50}>
                        <div className="space-y-4 pr-4">
                            {/* Chat Messages */}
                            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                        <Bot className="h-5 w-5 text-primary" />
                                        <span>Chat with Ask!y AI</span>
                                        <Badge variant={extendedMode ? "default" : "secondary"} className="ml-auto flex items-center">
                                            {extendedMode ? (
                                                <>
                                                    <BookOpenCheck className="h-3 w-3 mr-1" />
                                                    📘 Extended Mode
                                                </>
                                            ) : (
                                                <>
                                                    <BookOpen className="h-3 w-3 mr-1" />
                                                    Core Mode
                                                </>
                                            )}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Messages Area */}
                                    <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
                                        <div className="space-y-4 pb-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] rounded-2xl p-4 ${message.sender === "user"
                                                            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                                                            : "bg-gradient-to-br from-muted/80 to-muted/50 backdrop-blur-sm border"
                                                        } transition-all duration-300 hover:shadow-md`}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        {message.sender === "askly" && (
                                                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mt-1">
                                                                <Bot className="h-4 w-4 text-primary" />
                                                            </div>
                                                        )}
                                                        {message.sender === "user" && (
                                                            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full mt-1">
                                                                <User className="h-4 w-4 text-primary-foreground" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1 space-y-2">
                                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words max-w-full overflow-wrap-anywhere">{message.content}</p>

                                                            {/* Confidence and Subject Badges */}
                                                            {message.confidence && (
                                                                <div className="flex items-center space-x-2">
                                                                    <Badge variant="outline" className="text-xs">
                                                                        <Brain className="h-3 w-3 mr-1" />
                                                                        {Math.round(message.confidence * 100)}% confident
                                                                    </Badge>
                                                                    {message.subject && (
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            <SubjectIcon className="h-3 w-3 mr-1" />
                                                                            {subjects[message.subject].name}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Sources */}
                                                            {message.sources && message.sources.length > 0 && (
                                                                <div className="space-y-2">
                                                                    <p className="text-xs text-muted-foreground font-medium">📚 Sources:</p>
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {message.sources.map((source, index) => (
                                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                                <BookOpen className="h-3 w-3 mr-1" />
                                                                                {source}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Code Snippet */}
                                                            {message.codeSnippet && (
                                                                <div className="space-y-2">
                                                                    <p className="text-xs text-muted-foreground font-medium flex items-center">
                                                                        <Code className="h-3 w-3 mr-1" />
                                                                        Code Example:
                                                                    </p>
                                                                    <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                                                                        <pre>{message.codeSnippet}</pre>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Diagram */}
                                                            {message.diagram && (
                                                                <div className="space-y-2">
                                                                    <p className="text-xs text-muted-foreground font-medium flex items-center">
                                                                        <Calculator className="h-3 w-3 mr-1" />
                                                                        {message.diagram.title}
                                                                    </p>
                                                                    <div className="bg-muted/30 rounded-lg p-3 border">
                                                                        <p className="text-xs text-muted-foreground mb-2">{message.diagram.description}</p>
                                                                        <div className="bg-background rounded p-2 text-xs font-mono overflow-x-auto">
                                                                            <pre>{message.diagram.mermaidCode}</pre>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Practice Hints */}
                                                            {message.hints && message.hints.length > 0 && (
                                                                <div className="space-y-2">
                                                                    <p className="text-xs text-muted-foreground font-medium flex items-center">
                                                                        <Lightbulb className="h-3 w-3 mr-1" />
                                                                        Practice Hints:
                                                                    </p>
                                                                    <div className="space-y-1">
                                                                        {message.hints.map((hint, index) => (
                                                                            <div key={index} className="flex items-start space-x-2 text-xs">
                                                                                <span className="text-primary mt-1">💡</span>
                                                                                <span>{hint}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Follow-up Questions */}
                                                            {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                                                                <div className="space-y-2">
                                                                    <p className="text-xs text-muted-foreground font-medium flex items-center">
                                                                        <MessageSquare className="h-3 w-3 mr-1" />
                                                                        Follow-up Questions:
                                                                    </p>
                                                                    <div className="space-y-1">
                                                                        {message.followUpQuestions.map((question, index) => (
                                                                            <Button
                                                                                key={index}
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="w-full text-left justify-start h-auto p-2 text-xs bg-background/30 hover:bg-background/60"
                                                                                onClick={() => setInput(question)}
                                                                            >
                                                                                <span className="text-primary mr-2">🤔</span>
                                                                                {question}
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Video References (Extended Mode) */}
                                                            {message.videos && message.videos.length > 0 && (
                                                            <div className="space-y-2">
                                                            <p className="text-xs text-muted-foreground font-medium flex items-center">
                                                            <Video className="h-3 w-3 mr-1 text-red-500" />
                                                            🎥 Video Resources:
                                                            </p>
                                                                    <div className="space-y-2">
                                                                        {message.videos.map((video, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className="group cursor-pointer bg-background/50 rounded-lg p-3 hover:bg-background/80 transition-all duration-200"
                                                                                onClick={() => openVideo(video.url)}
                                                                            >
                                                                                <div className="flex items-center space-x-3">
                                                                                    <div className="relative">
                                                                                        <div className="w-16 h-12 bg-red-500/10 rounded flex items-center justify-center">
                                                                                            <Play className="h-4 w-4 text-red-500" />
                                                                                        </div>
                                                                                        <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0">
                                                                                            {video.duration}
                                                                                        </Badge>
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                                                                            {video.title}
                                                                                        </p>
                                                                                        <p className="text-xs text-muted-foreground">{video.relevance}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <p className="text-xs text-muted-foreground">
                                                                {message.timestamp.toLocaleTimeString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {loading && (
                                            <div className="flex justify-start">
                                                <div className="bg-gradient-to-br from-muted/80 to-muted/50 backdrop-blur-sm border rounded-2xl p-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                                                            <Bot className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <div className="flex space-x-1">
                                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                                            <div
                                                                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                                                style={{ animationDelay: "0.1s" }}
                                                            ></div>
                                                            <div
                                                                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                                                style={{ animationDelay: "0.2s" }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                    </ScrollArea>

                                    {/* Input Area */}
                                    <div className="flex space-x-2 pt-4 border-t">
                                        <Input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={`Ask Ask!y AI about ${subjects[subject].name}...`}
                                            disabled={loading}
                                            className="flex-1 bg-background/50 backdrop-blur-sm border-muted-foreground/20"
                                        />
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={loading || !input.trim()}
                                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    {/* Sidebar */}
                    <ResizablePanel defaultSize={25} minSize={20}>
                        <div className="space-y-4">
                        <Tabs defaultValue="suggestions" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="suggestions">
                                    <Lightbulb className="h-4 w-4 mr-1" />
                                    Suggestions
                                </TabsTrigger>
                                <TabsTrigger value="pyq">
                                    <Target className="h-4 w-4 mr-1" />
                                    PYQ
                                </TabsTrigger>
                            </TabsList>

                            {/* Suggestions Tab */}
                            <TabsContent value="suggestions">
                                <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            <Lightbulb className="h-5 w-5 text-primary" />
                                            <span>Quick Questions</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="max-h-[500px] overflow-y-auto">
                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="font-medium text-sm mb-3 flex items-center space-x-1">
                                                    <SubjectIcon className={`h-4 w-4 ${subjects[subject].color}`} />
                                                    <span>{subjects[subject].name}</span>
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {suggestedQuestions[subject].map((question, index) => (
                                                        <Button
                                                            key={index}
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-xs bg-background/30 hover:bg-background/60 border-primary/20 hover:border-primary/40 transition-all duration-200 rounded-full px-3 py-1 h-auto"
                                                            onClick={() => handleSuggestedQuestion(question)}
                                                        >
                                                            <span className="mr-1">{extendedMode ? "🎥" : "📘"}</span>
                                                            {question}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* PYQ Analysis Tab */}
                            <TabsContent value="pyq">
                                <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            <Target className="h-5 w-5 text-primary" />
                                            <span>PYQ Analysis</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="max-h-[500px] overflow-y-auto">
                                        {pyqAnalysis[subject] && pyqAnalysis[subject].length > 0 ? (
                                            <div className="space-y-4">
                                                <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                                                    <h4 className="font-semibold text-sm text-primary mb-1">
                                                        {subjects[subject].name}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        Last 5 years analysis
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    {/* Group by year/semester */}
                                                    {(() => {
                                                        const groupedByYear = pyqAnalysis[subject].reduce((acc, item) => {
                                                            const key = `Year ${item.year} - Semester ${item.semester}`;
                                                            if (!acc[key]) acc[key] = [];
                                                            acc[key].push(item);
                                                            return acc;
                                                        }, {} as Record<string, PYQAnalysis[]>);

                                                        return Object.entries(groupedByYear).map(([yearSem, items]) => (
                                                            <div key={yearSem} className="space-y-2">
                                                                <h4 className="text-sm font-semibold text-primary flex items-center">
                                                                    📚 {yearSem}
                                                                </h4>
                                                                <div className="space-y-2">
                                                                    {items.map((item, index) => (
                                                                        <div key={index} className="p-3 bg-background/30 rounded-lg border border-muted/50 space-y-2 cursor-pointer hover:bg-background/50 transition-colors" onClick={() => {
                                                                            setSelectedTopic(item)
                                                                            setInput(item.topic)
                                                                            handleSendMessage()
                                                                        }}>
                                                                            <div className="flex items-center justify-between">
                                                                                <h5 className="font-medium text-sm">{item.topic}</h5>
                                                                                <Badge
                                                                                    variant={item.studyPriority === "High" ? "default" :
                                                                                        item.studyPriority === "Medium" ? "secondary" : "outline"}
                                                                                    className="text-xs"
                                                                                >
                                                                                    {item.studyPriority}
                                                                                </Badge>
                                                                            </div>

                                                                            <div className="space-y-2">
                                                                                <div className="flex items-center justify-between text-xs">
                                                                                    <span>Exam Probability</span>
                                                                                    <span className="font-medium">{item.examProbability}%</span>
                                                                                </div>
                                                                                <Progress value={item.examProbability} className="h-1" />

                                                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                                                    <span>Frequency: {item.frequency}%</span>
                                                                                    <span>{item.lastAppeared}</span>
                                                                                </div>

                                                                                <Badge
                                                                                    variant="outline"
                                                                                    className={`text-xs ${item.difficulty === "Easy" ? "border-green-500 text-green-700 dark:text-green-400" :
                                                                                            item.difficulty === "Medium" ? "border-yellow-500 text-yellow-700 dark:text-yellow-400" :
                                                                                                "border-red-500 text-red-700 dark:text-red-400"
                                                                                        }`}
                                                                                >
                                                                                    {item.difficulty}
                                                                                </Badge>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ));
                                                    })()}
                                                </div>

                                                <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                                                    <h4 className="font-semibold text-sm text-primary mb-2">📈 Exam Strategy</h4>
                                                    <ul className="text-xs space-y-1 text-muted-foreground">
                                                        <li>• Focus on high-priority topics first</li>
                                                        <li>• Practice last 3 years questions</li>
                                                        <li>• Review medium difficulty topics</li>
                                                    </ul>
                                                </div>

                                                {selectedTopic && (
                                                    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h4 className="font-semibold text-sm">{selectedTopic.topic} Details</h4>
                                                            <Button variant="ghost" size="sm" onClick={() => setSelectedTopic(null)} className="h-6 w-6 p-0">×</Button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div>
                                                                <p className="text-xs text-muted-foreground font-medium mb-2">Key Questions:</p>
                                                                <ul className="text-xs space-y-1">
                                                                    {selectedTopic.keyQuestions.map((q, i) => <li key={i} className="flex items-start"><span className="mr-2 text-primary">•</span>{q}</li>)}
                                                                </ul>
                                                            </div>
                                                            {extendedMode && selectedTopic.videos && selectedTopic.videos.length > 0 && (
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium mb-2">Recommended Videos:</p>
                                                                    <div className="space-y-2">
                                                                        {selectedTopic.videos.map((video, i) => (
                                                                            <div key={i} className="flex items-center space-x-2 p-2 bg-background/50 rounded cursor-pointer hover:bg-background/80 transition-colors" onClick={() => openVideo(video.url)}>
                                                                                <Play className="h-4 w-4 text-red-500" />
                                                                                <div>
                                                                                    <p className="text-xs font-medium">{video.title}</p>
                                                                                    <p className="text-xs text-muted-foreground">{video.relevance}</p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {extendedMode && selectedTopic.websites && selectedTopic.websites.length > 0 && (
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium mb-2">Reference Websites:</p>
                                                                    <div className="space-y-1">
                                                                        {selectedTopic.websites.map((site, i) => (
                                                                            <a key={i} href={site} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline block">
                                                                                {site}
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {extendedMode && selectedTopic.books && selectedTopic.books.length > 0 && (
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium mb-2">Suggested Books:</p>
                                                                    <ul className="text-xs space-y-1">
                                                                        {selectedTopic.books.map((book, i) => <li key={i} className="flex items-start"><span className="mr-2">📖</span>{book}</li>)}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                <p className="text-sm text-muted-foreground">
                                                    PYQ analysis available for all subjects
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Click on any topic to get detailed analysis
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </ProtectedLayout>
    )
}

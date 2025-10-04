"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Folder,
  FileText,
  Download,
  Search,
  BookOpen,
  GraduationCap,
  Calendar,
  Eye,
  Filter,
  GraduationCap as AcademicCap
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Note {
  id: string
  title: string
  type: "note" | "assignment"
  subject: string
  year: number
  semester: number
  uploadDate: string
  size: string
  downloads: number
}

interface Subject {
  id: string
  name: string
  code: string
  notes: Note[]
}

interface YearData {
  year: number
  subjects: Subject[]
}

const mockNotesData: YearData[] = [
  {
    year: 1,
    subjects: [
      {
        id: "math1",
        name: "Engineering Mathematics I",
        code: "MATH101",
        notes: [
          {
            id: "1",
            title: "Calculus Fundamentals",
            type: "note",
            subject: "Engineering Mathematics I",
            year: 1,
            semester: 1,
            uploadDate: "2024-09-15",
            size: "2.5 MB",
            downloads: 245
          },
          {
            id: "2",
            title: "Assignment 1 - Derivatives",
            type: "assignment",
            subject: "Engineering Mathematics I",
            year: 1,
            semester: 1,
            uploadDate: "2024-09-20",
            size: "1.2 MB",
            downloads: 189
          },
          {
            id: "1a",
            title: "Linear Algebra Basics",
            type: "note",
            subject: "Engineering Mathematics I",
            year: 1,
            semester: 2,
            uploadDate: "2024-02-10",
            size: "3.2 MB",
            downloads: 267
          },
          {
            id: "1b",
            title: "Assignment 2 - Matrix Operations",
            type: "assignment",
            subject: "Engineering Mathematics I",
            year: 1,
            semester: 2,
            uploadDate: "2024-02-25",
            size: "1.8 MB",
            downloads: 198
          }
        ]
      },
      {
        id: "physics1",
        name: "Engineering Physics",
        code: "PHY101",
        notes: [
          {
            id: "3",
            title: "Mechanics and Waves",
            type: "note",
            subject: "Engineering Physics",
            year: 1,
            semester: 1,
            uploadDate: "2024-09-18",
            size: "3.1 MB",
            downloads: 198
          },
          {
            id: "3a",
            title: "Thermodynamics Principles",
            type: "note",
            subject: "Engineering Physics",
            year: 1,
            semester: 2,
            uploadDate: "2024-02-12",
            size: "2.8 MB",
            downloads: 234
          },
          {
            id: "3b",
            title: "Lab Assignment - Heat Transfer",
            type: "assignment",
            subject: "Engineering Physics",
            year: 1,
            semester: 2,
            uploadDate: "2024-03-05",
            size: "1.5 MB",
            downloads: 156
          }
        ]
      },
      {
        id: "tc1",
        name: "Technical Communication",
        code: "TC101",
        notes: [
          {
            id: "tc1a",
            title: "Professional Writing Skills",
            type: "note",
            subject: "Technical Communication",
            year: 1,
            semester: 2,
            uploadDate: "2024-02-08",
            size: "1.9 MB",
            downloads: 178
          },
          {
            id: "tc1b",
            title: "Presentation Assignment",
            type: "assignment",
            subject: "Technical Communication",
            year: 1,
            semester: 2,
            uploadDate: "2024-03-15",
            size: "2.1 MB",
            downloads: 145
          }
        ]
      }
    ]
  },
  {
    year: 2,
    subjects: [
      {
        id: "dsa2",
        name: "Data Structures & Algorithms",
        code: "CSE201",
        notes: [
          {
            id: "4",
            title: "Arrays and Linked Lists",
            type: "note",
            subject: "Data Structures & Algorithms",
            year: 2,
            semester: 1,
            uploadDate: "2024-09-10",
            size: "4.2 MB",
            downloads: 312
          },
          {
            id: "5",
            title: "Assignment 2 - Binary Trees",
            type: "assignment",
            subject: "Data Structures & Algorithms",
            year: 2,
            semester: 1,
            uploadDate: "2024-09-25",
            size: "2.8 MB",
            downloads: 267
          }
        ]
      },
      {
        id: "dbms2",
        name: "Database Management Systems",
        code: "CSE202",
        notes: [
          {
            id: "6",
            title: "Database Normalization",
            type: "note",
            subject: "Database Management Systems",
            year: 2,
            semester: 2,
            uploadDate: "2024-09-12",
            size: "3.5 MB",
            downloads: 289
          }
        ]
      }
    ]
  },
  {
    year: 3,
    subjects: [
      {
        id: "cn3",
        name: "Computer Networks",
        code: "CSE301",
        notes: [
          {
            id: "7",
            title: "OSI Model and TCP/IP",
            type: "note",
            subject: "Computer Networks",
            year: 3,
            semester: 1,
            uploadDate: "2024-09-08",
            size: "5.1 MB",
            downloads: 356
          },
          {
            id: "8",
            title: "Network Security Assignment",
            type: "assignment",
            subject: "Computer Networks",
            year: 3,
            semester: 1,
            uploadDate: "2024-09-22",
            size: "2.3 MB",
            downloads: 234
          }
        ]
      },
      {
        id: "web3",
        name: "Web Programming",
        code: "CSE302",
        notes: [
          {
            id: "9",
            title: "React.js Fundamentals",
            type: "note",
            subject: "Web Programming",
            year: 3,
            semester: 2,
            uploadDate: "2024-09-14",
            size: "4.7 MB",
            downloads: 298
          }
        ]
      }
    ]
  },
  {
    year: 4,
    subjects: [
      {
        id: "ml4",
        name: "Machine Learning",
        code: "CSE401",
        notes: [
          {
            id: "10",
            title: "Introduction to Neural Networks",
            type: "note",
            subject: "Machine Learning",
            year: 4,
            semester: 1,
            uploadDate: "2024-09-05",
            size: "6.2 MB",
            downloads: 412
          },
          {
            id: "10a",
            title: "Deep Learning Architectures",
            type: "note",
            subject: "Machine Learning",
            year: 4,
            semester: 1,
            uploadDate: "2024-09-12",
            size: "7.8 MB",
            downloads: 389
          },
          {
            id: "10b",
            title: "ML Project - Image Classification",
            type: "assignment",
            subject: "Machine Learning",
            year: 4,
            semester: 1,
            uploadDate: "2024-10-15",
            size: "5.4 MB",
            downloads: 298
          }
        ]
      },
      {
        id: "project4",
        name: "Final Year Project",
        code: "CSE499",
        notes: [
          {
            id: "11",
            title: "Project Guidelines",
            type: "assignment",
            subject: "Final Year Project",
            year: 4,
            semester: 1,
            uploadDate: "2024-09-01",
            size: "1.8 MB",
            downloads: 156
          },
          {
            id: "11a",
            title: "Literature Review Template",
            type: "note",
            subject: "Final Year Project",
            year: 4,
            semester: 1,
            uploadDate: "2024-09-08",
            size: "2.3 MB",
            downloads: 234
          },
          {
            id: "11b",
            title: "Project Proposal Submission",
            type: "assignment",
            subject: "Final Year Project",
            year: 4,
            semester: 1,
            uploadDate: "2024-10-01",
            size: "3.1 MB",
            downloads: 187
          },
          {
            id: "11c",
            title: "Implementation Phase Guidelines",
            type: "note",
            subject: "Final Year Project",
            year: 4,
            semester: 2,
            uploadDate: "2024-01-15",
            size: "4.2 MB",
            downloads: 298
          },
          {
            id: "11d",
            title: "Final Project Report",
            type: "assignment",
            subject: "Final Year Project",
            year: 4,
            semester: 2,
            uploadDate: "2024-04-30",
            size: "8.7 MB",
            downloads: 456
          }
        ]
      },
      {
        id: "internship4",
        name: "Industrial Training",
        code: "CSE498",
        notes: [
          {
            id: "12a",
            title: "Internship Guidelines",
            type: "note",
            subject: "Industrial Training",
            year: 4,
            semester: 2,
            uploadDate: "2024-01-10",
            size: "2.1 MB",
            downloads: 345
          },
          {
            id: "12b",
            title: "Internship Report Template",
            type: "assignment",
            subject: "Industrial Training",
            year: 4,
            semester: 2,
            uploadDate: "2024-05-15",
            size: "1.9 MB",
            downloads: 267
          }
        ]
      }
    ]
  }
]

export default function NotesPage() {
  const { userProfile } = useAuth()
  const [selectedYear, setSelectedYear] = useState<number>(1)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "note" | "assignment">("all")

  // Get relevant subjects based on user's branch
  const getRelevantSubjects = (branch?: string) => {
    switch (branch) {
      case "cse":
        return ["Engineering Mathematics I", "Engineering Physics", "Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Web Programming", "Machine Learning", "Final Year Project"]
      case "it":
        return ["Engineering Mathematics I", "Engineering Physics", "Database Management Systems", "Computer Networks", "Web Programming", "Technical Communication", "Final Year Project"]
      case "ece":
        return ["Engineering Mathematics I", "Engineering Physics", "Computer Networks", "Systems and Signals", "Digital Logic Design", "Technical Communication"]
      case "ee":
        return ["Engineering Mathematics I", "Engineering Physics", "Systems and Signals", "Digital Logic Design"]
      case "me":
        return ["Engineering Mathematics I", "Engineering Physics", "Technical Communication"]
      case "ce":
        return ["Engineering Mathematics I", "Engineering Physics", "Technical Communication"]
      default:
        return ["Engineering Mathematics I", "Engineering Physics", "Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Web Programming", "Machine Learning", "Final Year Project"]
    }
  }

  const relevantSubjects = getRelevantSubjects(userProfile?.branch)

  // Show all years but filter subjects based on branch
  const filteredNotesData = mockNotesData.map(yearData => ({
    ...yearData,
    subjects: yearData.subjects.filter(subject =>
      relevantSubjects.includes(subject.name)
    )
  }))

  const handleYearClick = (year: number) => {
    setSelectedYear(year)
    setSelectedSubject(null)
  }

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(selectedSubject?.id === subject.id ? null : subject)
  }

  const handleDownload = (note: Note) => {
    // Simulate download
    console.log(`Downloading: ${note.title}`)
  }

  const handleView = (note: Note) => {
    // Simulate view
    console.log(`Viewing: ${note.title}`)
  }

  const filteredNotes = selectedSubject?.notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || note.type === filterType
    return matchesSearch && matchesType
  }) || []

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notes & Assignments
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Access all your academic materials organized by year and subject</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "note" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("note")}
              >
                Notes
              </Button>
              <Button
                variant={filterType === "assignment" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("assignment")}
              >
                Assignments
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={selectedYear.toString()} onValueChange={(value) => handleYearClick(parseInt(value))} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {mockNotesData.map((yearData) => (
              <TabsTrigger key={yearData.year} value={yearData.year.toString()} className="flex items-center space-x-2">
                <AcademicCap className="h-4 w-4" />
                <span>Year {yearData.year}</span>
                <Badge variant="secondary" className="ml-1">
                  {yearData.subjects.filter(subject => relevantSubjects.includes(subject.name)).length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {mockNotesData.map((yearData) => (
            <TabsContent key={yearData.year} value={yearData.year.toString()}>
              {!selectedSubject ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎓</span>
                    <h2 className="text-2xl font-bold">Year {yearData.year} Subjects</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {yearData.subjects.filter(subject => relevantSubjects.includes(subject.name)).map((subject) => (
                      <Card
                        key={subject.id}
                        className="bg-background/50 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105"
                        onClick={() => handleSubjectClick(subject)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Folder className="h-5 w-5 text-primary" />
                            <div>
                              <div>{subject.name}</div>
                              <div className="text-sm text-muted-foreground font-normal">{subject.code}</div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">
                              {subject.notes.length} files
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {subject.notes.filter(n => n.type === "note").length} notes, {" "}
                              {subject.notes.filter(n => n.type === "assignment").length} assignments
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Folder className="h-6 w-6 text-primary" />
                      <div>
                        <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
                        <p className="text-muted-foreground">{selectedSubject.code}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedSubject(null)}
                    >
                      Back to Subjects
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {filteredNotes.length === 0 ? (
                      <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No files found</h3>
                          <p className="text-muted-foreground text-center">
                            {searchTerm ? "Try adjusting your search terms" : "No notes or assignments available for this subject"}
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      filteredNotes.map((note) => (
                        <Card key={note.id} className="bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{note.title}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span>📅 {new Date(note.uploadDate).toLocaleDateString()}</span>
                                    <span>📁 {note.size}</span>
                                    <span>⬇️ {note.downloads} downloads</span>
                                    {note.type === "assignment" && (
                                      <span className="text-orange-600 font-medium flex items-center">
                                        <span className="mr-1">📅</span>
                                        Due: {new Date(note.uploadDate).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={note.type === "note" ? "default" : "secondary"}>
                                  {note.type === "note" ? "📘 Note" : "📝 Assignment"}
                                </Badge>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleView(note)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleDownload(note)}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ProtectedLayout>
  )
}
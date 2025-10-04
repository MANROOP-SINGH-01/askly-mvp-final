"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { generateFlashcards } from "@/lib/ai-adapter"
import { Upload, FileText, Zap, BookOpen, Loader2 } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [subject, setSubject] = useState<"dbms" | "networking">("dbms")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatedCards, setGeneratedCards] = useState<Array<{ question: string; answer: string }>>([])
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // In a real app, you'd read the file content here
      setContent(`Sample content from ${selectedFile.name}`)
    }
  }

  const handleGenerateFlashcards = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please provide content or upload a file first.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const cards = await generateFlashcards(content, subject)
      setGeneratedCards(cards)
      toast({
        title: "Success!",
        description: `Generated ${cards.length} flashcards from your content.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveFlashcards = () => {
    // In a real app, you'd save to Firebase here
    toast({
      title: "Flashcards saved!",
      description: `${generatedCards.length} flashcards have been added to your collection.`,
    })
    setGeneratedCards([])
    setContent("")
    setFile(null)
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Upload & Generate</h1>
          <p className="text-muted-foreground">Upload documents to automatically generate flashcards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Document</span>
              </CardTitle>
              <CardDescription>Upload PDF, DOC, or TXT files to generate flashcards automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={(value: "dbms" | "networking") => setSubject(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dbms">Database Management Systems</SelectItem>
                    <SelectItem value="networking">Computer Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Document File</Label>
                <Input id="file" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
                {file && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{file.name}</span>
                  </div>
                )}
              </div>

              <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Drag and drop your files here, or click to browse</p>
              </div>
            </CardContent>
          </Card>

          {/* Manual Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Manual Input</span>
              </CardTitle>
              <CardDescription>Paste or type content directly to generate flashcards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your study material here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                />
              </div>

              <Button onClick={handleGenerateFlashcards} disabled={loading || !content.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Flashcards
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Flashcards */}
        {generatedCards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Generated Flashcards ({generatedCards.length})</span>
              </CardTitle>
              <CardDescription>Review and save your automatically generated flashcards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedCards.map((card, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Card {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">QUESTION</Label>
                        <p className="text-sm mt-1">{card.question}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">ANSWER</Label>
                        <p className="text-sm mt-1">{card.answer}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setGeneratedCards([])}>
                  Discard
                </Button>
                <Button onClick={handleSaveFlashcards}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Save All Flashcards
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload clear, well-structured documents for better results</li>
              <li>• Include definitions, concepts, and key points in your content</li>
              <li>• Choose the correct subject to get more relevant flashcards</li>
              <li>• Review generated cards before saving to ensure accuracy</li>
              <li>• Supported formats: PDF, DOC, DOCX, TXT</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}

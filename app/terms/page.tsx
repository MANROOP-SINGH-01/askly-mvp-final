"use client"

import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Shield, AlertTriangle, Scale, Gavel } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl mx-auto">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            Please read these terms carefully before using Ask!y platform.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: September 28, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-green-500" />
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using Ask!y ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") govern your use of our educational platform, including all content, services, and products available at or through the website.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>User Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Creation</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One person may not maintain more than one account</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Account Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Keep your contact information up to date</li>
                  <li>Use the platform only for lawful educational purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span>Acceptable Use Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Permitted Uses</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Access educational content and learning materials</li>
                  <li>Participate in quizzes, flashcards, and interactive learning</li>
                  <li>Engage in community discussions and forums</li>
                  <li>Use AI chatbot for academic assistance</li>
                  <li>Track your learning progress and analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Prohibited Activities</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Sharing account credentials with others</li>
                  <li>Attempting to gain unauthorized access to the platform</li>
                  <li>Uploading malicious content or viruses</li>
                  <li>Harassing, bullying, or threatening other users</li>
                  <li>Posting inappropriate, offensive, or illegal content</li>
                  <li>Using the platform for commercial purposes without permission</li>
                  <li>Attempting to reverse engineer or copy our technology</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <span>Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Content</h3>
                <p className="text-muted-foreground">
                  All content on Ask!y, including but not limited to text, graphics, logos, images, audio clips, digital downloads, 
                  data compilations, and software, is the property of Ask!y or its content suppliers and is protected by copyright laws.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User Content</h3>
                <p className="text-muted-foreground">
                  By posting content on our platform, you grant Ask!y a non-exclusive, royalty-free, perpetual, and worldwide license 
                  to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Disclaimers and Limitations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-muted-foreground">
                  We strive to provide continuous service but cannot guarantee 100% uptime. The platform may be temporarily unavailable 
                  due to maintenance, updates, or technical issues.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Educational Content</h3>
                <p className="text-muted-foreground">
                  While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of educational content. 
                  Users should verify information from multiple sources for academic purposes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI Chatbot</h3>
                <p className="text-muted-foreground">
                  Our AI chatbot provides educational assistance but may not always be accurate. Users should not rely solely on AI responses 
                  for critical academic decisions or assessments.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5 text-indigo-500" />
                <span>Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your account and access to the platform at our sole discretion, 
                without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <div>
                <h3 className="font-semibold mb-2">Reasons for Termination</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Violation of these Terms of Service</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Harassment or abuse of other users</li>
                  <li>Prolonged inactivity (after 2 years)</li>
                  <li>Technical or security concerns</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or 
                platform notifications. Continued use of the platform after changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> <a href="mailto:legal@askly.edu" className="text-blue-500 hover:underline">legal@askly.edu</a></p>
                <p><strong>Address:</strong> Ask!y Legal Team, Education District, Learning City</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  )
}
"use client"

import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Settings, Eye, Shield, BarChart3, Users } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mx-auto">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn about how we use cookies and similar technologies on Ask!y.
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
                <Cookie className="h-5 w-5 text-orange-500" />
                <span>What Are Cookies?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>
              <p className="text-muted-foreground">
                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <span>Types of Cookies We Use</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Essential Cookies</span>
                </h3>
                <p className="text-muted-foreground mb-2">These cookies are necessary for the website to function properly.</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Authentication and login status</li>
                  <li>Security and fraud prevention</li>
                  <li>Basic website functionality</li>
                  <li>Session management</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span>Functional Cookies</span>
                </h3>
                <p className="text-muted-foreground mb-2">These cookies enhance your experience by remembering your preferences.</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Language settings</li>
                  <li>Notification preferences</li>
                  <li>Layout and display settings</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  <span>Analytics Cookies</span>
                </h3>
                <p className="text-muted-foreground mb-2">These cookies help us understand how you use our platform.</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Page views and user interactions</li>
                  <li>Learning progress and quiz performance</li>
                  <li>Feature usage statistics</li>
                  <li>Error tracking and debugging</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-pink-500" />
                  <span>Social Media Cookies</span>
                </h3>
                <p className="text-muted-foreground mb-2">These cookies enable social media features and content sharing.</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Social media login integration</li>
                  <li>Content sharing buttons</li>
                  <li>Social media widgets</li>
                  <li>Community features</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-500" />
                <span>Managing Your Cookie Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Browser Settings</h3>
                <p className="text-muted-foreground">
                  You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                  <li>View and delete cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block third-party cookies</li>
                  <li>Clear all cookies when you close your browser</li>
                  <li>Set up notifications when cookies are being sent</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Platform Settings</h3>
                <p className="text-muted-foreground">
                  You can also manage some cookie preferences through your Ask!y account settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                  <li>Analytics and tracking preferences</li>
                  <li>Personalization settings</li>
                  <li>Marketing communication preferences</li>
                  <li>Social media integration settings</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may use third-party services that set their own cookies. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>YouTube:</strong> For embedded educational videos</li>
                <li><strong>Social Media Platforms:</strong> For login integration and content sharing</li>
                <li><strong>CDN Services:</strong> For faster content delivery</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These third parties have their own privacy policies and cookie policies, which we encourage you to review.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> <a href="mailto:privacy@askly.edu" className="text-blue-500 hover:underline">privacy@askly.edu</a></p>
                <p><strong>Address:</strong> Ask!y Privacy Team, Education District, Learning City</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  )
}
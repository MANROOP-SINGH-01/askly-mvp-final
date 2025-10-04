"use client"

import { useState, useRef } from "react"
import ProtectedLayout from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { 
  Settings, User, Moon, Sun, Bell, Shield, Palette, Volume2, Monitor, Eye, Lock, Mail, 
  Upload, Check, X, AlertCircle, Download, Trash2, Camera, Edit
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type CategoryType = "profile" | "appearance" | "notifications" | "privacy" | "accessibility" | "account"

export default function SettingsPage() {
  const { userProfile } = useAuth()
  const { theme, toggleTheme } = useTheme()
  
  // Active category state
  const [activeCategory, setActiveCategory] = useState<CategoryType>("profile")
  
  // Form states
  const [profileData, setProfileData] = useState({
    displayName: userProfile?.displayName || "",
    bio: "",
    age: "",
    course: "",
    branch: userProfile?.branch || "",
    avatar: ""
  })

  const [themePreference, setThemePreference] = useState<"system" | "light" | "dark">(theme === "dark" ? "dark" : "light")
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    achievements: true,
    examReminders: true,
    forumReplies: false,
    studyReminders: true,
    weeklyReports: true,
    communityUpdates: false,
    newCourses: true,
    systemUpdates: false
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showProgress: true,
    allowMessages: false,
    showEmail: false,
    showActivity: true,
    searchable: true
  })

  const [accessibility, setAccessibility] = useState({
    fontSize: "medium",
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNav: false
  })

  const [account, setAccount] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Loading states
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    { id: "profile" as CategoryType, label: "Profile", icon: User, color: "bg-blue-500" },
    { id: "appearance" as CategoryType, label: "Appearance", icon: Palette, color: "bg-purple-500" },
    { id: "notifications" as CategoryType, label: "Notifications", icon: Bell, color: "bg-green-500" },
    { id: "privacy" as CategoryType, label: "Privacy", icon: Shield, color: "bg-red-500" },
    { id: "accessibility" as CategoryType, label: "Accessibility", icon: Eye, color: "bg-orange-500" },
    { id: "account" as CategoryType, label: "Account", icon: Lock, color: "bg-gray-500" },
  ]

  // Handle form submissions
  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleThemeChange = (newTheme: "system" | "light" | "dark") => {
    setThemePreference(newTheme)
    if (newTheme !== "system") {
      toggleTheme()
    }
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme} theme.`,
    })
  }

  const handleAvatarUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target?.result as string }))
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = async () => {
    if (account.newPassword !== account.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive"
      })
      return
    }

    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAccount({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Account Deletion Initiated",
        description: "Your account deletion request has been submitted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive"
      })
    } finally {
      setDeleting(false)
    }
  }

  const handleExportData = async () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready for download shortly.",
    })
  }

  // Render category content
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "profile":
        return (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-purple-400 to-blue-400">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-2xl font-bold">
                        {profileData.displayName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                      onClick={handleAvatarUpload}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{profileData.displayName}</h3>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">{userProfile?.role}</p>
                    {profileData.branch && (
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-700 dark:text-purple-300 font-medium">
                          {profileData.branch === "cse" && "💻 CSE"}
                          {profileData.branch === "it" && "🖥️ IT"}
                          {profileData.branch === "ece" && "📡 ECE"}
                          {profileData.branch === "ee" && "⚡ EE"}
                          {profileData.branch === "me" && "🔧 ME"}
                          {profileData.branch === "ce" && "🏗️ CE"}
                          {profileData.branch === "other" && "🎓 Other"}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Level {userProfile?.level}</span>
                      <span>{userProfile?.xp} XP</span>
                      <span>{userProfile?.streak} day streak 🔥</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="displayName" className="text-gray-700 dark:text-gray-300">Display Name</Label>
                    <Input 
                      id="displayName" 
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                      className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userProfile?.email || ""}
                      disabled
                      className="mt-1 bg-gray-100 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">Age</Label>
                    <Input 
                      id="age" 
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                      className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="course" className="text-gray-700 dark:text-gray-300">Course/Program</Label>
                    <Input
                      id="course"
                      value={profileData.course}
                      onChange={(e) => setProfileData(prev => ({ ...prev, course: e.target.value }))}
                      placeholder="e.g., Computer Science"
                      className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch" className="text-gray-700 dark:text-gray-300">Branch/Department</Label>
                    <Select value={profileData.branch} onValueChange={(value) => setProfileData(prev => ({ ...prev, branch: value }))}>
                      <SelectTrigger className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science Engineering (CSE) 💻</SelectItem>
                        <SelectItem value="it">Information Technology (IT) 🖥️</SelectItem>
                        <SelectItem value="ece">Electronics & Communication (ECE) 📡</SelectItem>
                        <SelectItem value="ee">Electrical Engineering (EE) ⚡</SelectItem>
                        <SelectItem value="me">Mechanical Engineering (ME) 🔧</SelectItem>
                        <SelectItem value="ce">Civil Engineering (CE) 🏗️</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..." 
                    className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform transition-all duration-200 hover:scale-105"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <Palette className="w-5 h-5 mr-2" />
                  Theme & Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
                      {theme === "light" ? (
                        <Sun className="w-5 h-5 text-white" />
                      ) : (
                        <Moon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Dark Mode</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {theme === "light" ? "Switch to dark theme for better night viewing" : "Currently using dark theme"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-purple-600 transition-all duration-300"
                  />
                </div>

                {/* Theme Preview Cards */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 text-base font-medium">Theme Preference</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    {[
                      { id: "system", label: "System", icon: Monitor, description: "Follow system preference", preview: "Auto" },
                      { id: "light", label: "Light", icon: Sun, description: "Bright and clean", preview: "☀️" },
                      { id: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes", preview: "🌙" }
                    ].map((themeOption) => (
                      <div
                        key={themeOption.id}
                        onClick={() => handleThemeChange(themeOption.id as "system" | "light" | "dark")}
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                          themePreference === themeOption.id 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <themeOption.icon className={`w-8 h-8 ${
                            themeOption.id === 'light' ? 'text-yellow-500' : 
                            themeOption.id === 'dark' ? 'text-blue-400' : 'text-purple-600'
                          }`} />
                          <span className="text-2xl">{themeOption.preview}</span>
                        </div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{themeOption.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{themeOption.description}</p>
                        {themePreference === themeOption.id && (
                          <div className="mt-2">
                            <Check className="w-4 h-4 text-purple-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "email", label: "Email Notifications", description: "Receive notifications via email", icon: Mail },
                  { key: "push", label: "Push Notifications", description: "Browser push notifications", icon: Bell },
                  { key: "achievements", label: "Achievement Alerts", description: "Get notified about your achievements", icon: "🏆" },
                  { key: "examReminders", label: "Exam Reminders", description: "Reminders for upcoming exams", icon: "📚" },
                  { key: "forumReplies", label: "Forum Replies", description: "Notifications for forum activity", icon: "💬" },
                  { key: "studyReminders", label: "Study Reminders", description: "Daily study session reminders", icon: "📖" },
                  { key: "weeklyReports", label: "Weekly Reports", description: "Weekly progress summaries", icon: "📊" },
                  { key: "communityUpdates", label: "Community Updates", description: "Updates from the Ask!y community", icon: "👥" },
                  { key: "newCourses", label: "New Courses", description: "Notifications about new course releases", icon: "🎓" },
                  { key: "systemUpdates", label: "System Updates", description: "Important system and feature updates", icon: "⚙️" },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group">
                    <div className="flex items-center space-x-3">
                      {typeof setting.icon === "string" ? (
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">{setting.icon}</span>
                      ) : (
                        <setting.icon className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{setting.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[setting.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => {
                        setNotifications(prev => ({ ...prev, [setting.key]: checked }))
                        toast({
                          title: `${setting.label} ${checked ? "Enabled" : "Disabled"}`,
                          description: `${setting.label} notifications have been ${checked ? "turned on" : "turned off"}.`,
                        })
                      }}
                      className="data-[state=checked]:bg-purple-600 transition-all duration-300"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )

      case "privacy":
        return (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "profilePublic", label: "Public Profile", description: "Allow others to see your profile information", icon: "👤" },
                  { key: "showProgress", label: "Show Learning Progress", description: "Display your learning progress publicly", icon: "📈" },
                  { key: "allowMessages", label: "Allow Direct Messages", description: "Let other users send you private messages", icon: "✉️" },
                  { key: "showEmail", label: "Show Email", description: "Display your email address on your profile", icon: "📧" },
                  { key: "showActivity", label: "Show Activity Status", description: "Let others see when you're online", icon: "🟢" },
                  { key: "searchable", label: "Searchable Profile", description: "Allow your profile to appear in search results", icon: "🔍" },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-200">{setting.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{setting.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacy[setting.key as keyof typeof privacy]}
                      onCheckedChange={(checked) => {
                        setPrivacy(prev => ({ ...prev, [setting.key]: checked }))
                        toast({
                          title: `${setting.label} ${checked ? "Enabled" : "Disabled"}`,
                          description: `Your ${setting.label.toLowerCase()} setting has been updated.`,
                        })
                      }}
                      className="data-[state=checked]:bg-purple-600 transition-all duration-300"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )

      case "accessibility":
        return (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <Eye className="w-5 h-5 mr-2" />
                  Accessibility Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Font Size */}
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 text-base font-medium">Font Size</Label>
                  <Select value={accessibility.fontSize} onValueChange={(value) => setAccessibility(prev => ({ ...prev, fontSize: value }))}>
                    <SelectTrigger className="bg-white/50 dark:bg-gray-700/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Accessibility Toggles */}
                {[
                  { key: "highContrast", label: "High Contrast Mode", description: "Increase contrast for better visibility", icon: "🌓" },
                  { key: "reducedMotion", label: "Reduced Motion", description: "Minimize animations and transitions", icon: "🚫" },
                  { key: "screenReader", label: "Screen Reader Support", description: "Enhanced compatibility with screen readers", icon: "🔊" },
                  { key: "keyboardNav", label: "Keyboard Navigation", description: "Enhanced keyboard navigation support", icon: "⌨️" },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-200">{setting.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{setting.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={accessibility[setting.key as keyof typeof accessibility]}
                      onCheckedChange={(checked) => {
                        setAccessibility(prev => ({ ...prev, [setting.key]: checked }))
                        toast({
                          title: `${setting.label} ${checked ? "Enabled" : "Disabled"}`,
                          description: `${setting.label} has been ${checked ? "turned on" : "turned off"}.`,
                        })
                      }}
                      className="data-[state=checked]:bg-purple-600 transition-all duration-300"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )

      case "account":
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Password Change */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password"
                    value={account.currentPassword}
                    onChange={(e) => setAccount(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={account.newPassword}
                    onChange={(e) => setAccount(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={account.confirmPassword}
                    onChange={(e) => setAccount(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="mt-1 bg-white/50 dark:bg-gray-700/50 transition-all duration-200 focus:bg-white dark:focus:bg-gray-700"
                  />
                </div>
                <Button 
                  onClick={handlePasswordChange}
                  disabled={saving || !account.currentPassword || !account.newPassword || !account.confirmPassword}
                  className="bg-blue-600 hover:bg-blue-700 transform transition-all duration-200 hover:scale-105"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Change Password
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Data Export */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-white">
                  <Download className="w-5 h-5 mr-2" />
                  Export Your Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Download a copy of all your data including profile information, learning progress, and activity history.
                </p>
                <Button 
                  onClick={handleExportData}
                  variant="outline" 
                  className="transform transition-all duration-200 hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>

            {/* Delete Account */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Delete Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button 
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  variant="destructive" 
                  className="transform transition-all duration-200 hover:scale-105"
                >
                  {deleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProtectedLayout>
      <div className="space-y-8 page-transition">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Settings ⚙️
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            Customize your Ask!y experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-lg animate-slide-in-left sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                        : 'hover:bg-purple-50 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-300 hover:transform hover:scale-102'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${activeCategory === category.id ? 'bg-white/20' : category.color}`}>
                      <category.icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-white' : 'text-white'}`} />
                    </div>
                    <span className="font-medium">{category.label}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {renderCategoryContent()}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}

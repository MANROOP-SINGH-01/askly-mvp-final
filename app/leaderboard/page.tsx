import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users, Zap, Crown, Flame } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "Dharmpal Singh", xp: 2847, level: 8, streak: 15, badges: 12 },
  { rank: 2, name: "Master Bhogal", xp: 2634, level: 7, streak: 12, badges: 10 },
  { rank: 3, name: "Arjun Sharma", xp: 2456, level: 7, streak: 8, badges: 9 },
  { rank: 4, name: "Priya Patel", xp: 2234, level: 6, streak: 6, badges: 8 },
  { rank: 5, name: "Vikram Gupta", xp: 2156, level: 6, streak: 11, badges: 7 },
  { rank: 6, name: "Ananya Reddy", xp: 1987, level: 6, streak: 4, badges: 6 },
  { rank: 7, name: "Rohit Kumar", xp: 1876, level: 5, streak: 9, badges: 5 },
  { rank: 8, name: "Kavya Joshi", xp: 1654, level: 5, streak: 3, badges: 4 },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }
}

export default function LeaderboardPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other learners</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#12</div>
              <p className="text-xs text-muted-foreground">Out of 1,247 students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">Active learners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week's Leader</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dharmpal Singh</div>
              <p className="text-xs text-muted-foreground">+347 XP this week ⚡</p>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Podium */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>This month's highest achievers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-end space-x-8 py-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">MB</span>
                </div>
                <div className="bg-gray-200 h-20 w-24 flex items-center justify-center rounded-t-lg">
                  <Medal className="h-8 w-8 text-gray-400" />
                </div>
                <p className="font-semibold mt-2">Master Bhogal</p>
                <p className="text-sm text-muted-foreground">2,634 XP</p>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">DS</span>
                </div>
                <div className="bg-yellow-200 h-28 w-28 flex items-center justify-center rounded-t-lg">
                  <Trophy className="h-10 w-10 text-yellow-600" />
                </div>
                <p className="font-semibold mt-2">👑 Dharmpal Singh</p>
                <p className="text-sm text-muted-foreground">2,847 XP 🔥</p>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">AS</span>
                </div>
                <div className="bg-amber-200 h-16 w-24 flex items-center justify-center rounded-t-lg">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <p className="font-semibold mt-2">Arjun Sharma</p>
                <p className="text-sm text-muted-foreground">2,456 XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Full Leaderboard</CardTitle>
            <CardDescription>All-time rankings based on total XP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                    <Avatar>
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Level {user.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold flex items-center justify-center">
                        {user.xp.toLocaleString()}
                        <Flame className="w-3 h-3 ml-1 text-orange-500" />
                      </p>
                      <p className="text-muted-foreground">XP</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{user.streak}</p>
                      <p className="text-muted-foreground">Streak</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary">{user.badges} badges</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}

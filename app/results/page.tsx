"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowLeft, TrendingUp, DollarSign, Target, Zap } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

// Mock data - in a real app this would come from the form submission
const mockBudgetData = {
  totalBudget: 50000,
  productType: "SaaS/Software",
  targetDemographic: {
    ageRange: "25-34",
    location: "United States",
    gender: "All",
    interests: "Technology, productivity tools, business software",
  },
  preferredChannels: ["Facebook", "Instagram", "LinkedIn", "YouTube"],
}

const originalAllocation = [
  { name: "Facebook", value: 15000, percentage: 30, color: "#1877F2" },
  { name: "Instagram", value: 12500, percentage: 25, color: "#E4405F" },
  { name: "LinkedIn", value: 12500, percentage: 25, color: "#0A66C2" },
  { name: "YouTube", value: 10000, percentage: 20, color: "#FF0000" },
]

const optimizedAllocation = [
  { name: "LinkedIn", value: 17500, percentage: 35, color: "#0A66C2" },
  { name: "Facebook", value: 12500, percentage: 25, color: "#1877F2" },
  { name: "YouTube", value: 12500, percentage: 25, color: "#FF0000" },
  { name: "Instagram", value: 7500, percentage: 15, color: "#E4405F" },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function ResultsPage() {
  const [showOptimized, setShowOptimized] = useState(false)
  const currentData = showOptimized ? optimizedAllocation : originalAllocation

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Form
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Budget Allocation</h1>
              <p className="text-muted-foreground mt-2">
                Recommended spend distribution for {mockBudgetData.productType}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Toggle Switch */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">View Mode</h3>
                <p className="text-sm text-muted-foreground">Toggle between original and AI-optimized allocation</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="optimization-toggle" className="text-sm">
                  Original
                </Label>
                <Switch id="optimization-toggle" checked={showOptimized} onCheckedChange={setShowOptimized} />
                <Label htmlFor="optimization-toggle" className="text-sm">
                  Optimized
                </Label>
                {showOptimized && (
                  <Badge variant="secondary" className="ml-2">
                    <Zap className="w-3 h-3 mr-1" />
                    AI Optimized
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Charts */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Budget Distribution
                </CardTitle>
                <CardDescription>
                  {showOptimized ? "AI-optimized" : "Original"} allocation across channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {currentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Comparison</CardTitle>
                <CardDescription>Budget allocation by marketing channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Summary */}
          <div className="space-y-6">
            {/* Budget Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Budget Summary
                </CardTitle>
                <CardDescription>Total budget: {formatCurrency(mockBudgetData.totalBudget)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.map((channel, index) => (
                    <div key={channel.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: channel.color }} />
                        <span className="font-medium">{channel.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(channel.value)}</div>
                        <div className="text-sm text-muted-foreground">{channel.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Audience Info */}
            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
                <CardDescription>Based on your input preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age Range:</span>
                  <span className="font-medium">{mockBudgetData.targetDemographic.ageRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{mockBudgetData.targetDemographic.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium">{mockBudgetData.targetDemographic.gender}</span>
                </div>
                <div className="pt-2">
                  <span className="text-muted-foreground">Interests:</span>
                  <p className="text-sm mt-1">{mockBudgetData.targetDemographic.interests}</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            {showOptimized && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <TrendingUp className="w-5 h-5" />
                    Optimization Insights
                  </CardTitle>
                  <CardDescription>AI-powered recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-sm">
                      <strong>LinkedIn Focus:</strong> Increased allocation by 10% for better B2B SaaS targeting
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-sm">
                      <strong>Instagram Reduction:</strong> Decreased spend by 10% due to lower conversion rates for
                      your demographic
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-sm">
                      <strong>Expected Improvement:</strong> 23% increase in qualified leads with optimized allocation
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Button */}
            <Card>
              <CardContent className="pt-6">
                <Link href="/optimizer">
                  <Button className="w-full" size="lg">
                    <Zap className="w-4 h-4 mr-2" />
                    Run Advanced Optimizer
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Get detailed optimization analysis and recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

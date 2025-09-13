"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const originalData = [
  { name: "Facebook", value: 15000, percentage: 30, reach: 45000, ctr: 2.1, cpc: 0.33 },
  { name: "Instagram", value: 12500, percentage: 25, reach: 38000, ctr: 1.8, cpc: 0.33 },
  { name: "LinkedIn", value: 12500, percentage: 25, reach: 15000, ctr: 3.2, cpc: 0.83 },
  { name: "YouTube", value: 10000, percentage: 20, reach: 25000, ctr: 2.5, cpc: 0.4 },
]

const optimizedData = [
  { name: "LinkedIn", value: 17500, percentage: 35, reach: 21000, ctr: 3.2, cpc: 0.83 },
  { name: "Facebook", value: 12500, percentage: 25, reach: 37500, ctr: 2.1, cpc: 0.33 },
  { name: "YouTube", value: 12500, percentage: 25, reach: 31250, ctr: 2.5, cpc: 0.4 },
  { name: "Instagram", value: 7500, percentage: 15, reach: 22800, ctr: 1.8, cpc: 0.33 },
]

const performanceComparison = [
  { metric: "Total Reach", original: 123000, optimized: 112550, change: -8.5 },
  { metric: "Qualified Leads", original: 2850, optimized: 3505, change: 23.0 },
  { metric: "Cost per Lead", original: 17.54, optimized: 14.27, change: -18.6 },
  { metric: "Conversion Rate", original: 2.32, optimized: 3.11, change: 34.1 },
]

const monthlyProjection = [
  { month: "Jan", original: 2850, optimized: 3505 },
  { month: "Feb", original: 2920, optimized: 3590 },
  { month: "Mar", original: 2780, optimized: 3420 },
  { month: "Apr", original: 3100, optimized: 3815 },
  { month: "May", original: 3050, optimized: 3750 },
  { month: "Jun", original: 3200, optimized: 3940 },
]

export default function OptimizerPage() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
      setShowResults(true)
    }, 3000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  if (isOptimizing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 64px)" }}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <CardTitle>Optimizing Your Budget</CardTitle>
              <CardDescription>AI is analyzing your marketing channels and target audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing audience data...</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Calculating channel performance...</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Generating recommendations...</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/results">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Optimized Results</h1>
              <p className="text-muted-foreground mt-2">AI-powered budget optimization analysis</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!showResults ? (
          /* Initial State */
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <Card>
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-10 h-10 mx-auto mb-2 text-primary" />
                </div>
                <CardTitle className="text-2xl">Advanced Budget Optimization</CardTitle>
                <CardDescription className="text-base">
                  Our AI will analyze your budget allocation and provide detailed recommendations to maximize your
                  marketing ROI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Channel Analysis</h3>
                    <p className="text-sm text-muted-foreground">Performance evaluation</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Audience Matching</h3>
                    <p className="text-sm text-muted-foreground">Demographic optimization</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">ROI Prediction</h3>
                    <p className="text-sm text-muted-foreground">Performance forecasting</p>
                  </div>
                </div>
                <Button onClick={handleOptimize} size="lg" className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Run Optimization Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results State */
          <div className="space-y-8">
            {/* Success Banner */}
            <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">Optimization Complete!</h3>
                    <p className="text-sm text-green-700 dark:text-green-200">
                      We found opportunities to improve your marketing performance by 23%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="comparison" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comparison">Side-by-Side Comparison</TabsTrigger>
                <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
                <TabsTrigger value="projections">Future Projections</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Original Allocation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Original Allocation
                      </CardTitle>
                      <CardDescription>Your current budget distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={originalData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Bar dataKey="value" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        {originalData.map((channel) => (
                          <div key={channel.name} className="flex justify-between text-sm">
                            <span>{channel.name}</span>
                            <span className="font-medium">{formatCurrency(channel.value)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Optimized Allocation */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Zap className="w-5 h-5" />
                        Optimized Allocation
                      </CardTitle>
                      <CardDescription>AI-recommended budget distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={optimizedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2">
                        {optimizedData.map((channel) => {
                          const original = originalData.find((o) => o.name === channel.name)
                          const change = original ? channel.value - original.value : 0
                          return (
                            <div key={channel.name} className="flex justify-between text-sm">
                              <span>{channel.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{formatCurrency(channel.value)}</span>
                                {change !== 0 && (
                                  <Badge variant={change > 0 ? "default" : "secondary"} className="text-xs">
                                    {change > 0 ? (
                                      <ArrowUpRight className="w-3 h-3 mr-1" />
                                    ) : (
                                      <ArrowDownRight className="w-3 h-3 mr-1" />
                                    )}
                                    {formatCurrency(Math.abs(change))}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Changes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Optimization Changes</CardTitle>
                    <CardDescription>Summary of recommended adjustments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-900 dark:text-green-100">Increased</span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          <strong>LinkedIn:</strong> +$5,000 (40% increase) - Better B2B targeting for SaaS products
                          with higher conversion rates
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-red-900 dark:text-red-100">Decreased</span>
                        </div>
                        <p className="text-sm text-red-700 dark:text-red-200">
                          <strong>Instagram:</strong> -$5,000 (40% decrease) - Lower engagement rates for your target
                          demographic and product type
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {performanceComparison.map((metric) => (
                    <Card key={metric.metric}>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="font-semibold text-sm text-muted-foreground mb-2">{metric.metric}</h3>
                          <div className="space-y-1">
                            <div className="text-lg font-bold">
                              {metric.metric.includes("Cost") || metric.metric.includes("Rate")
                                ? metric.metric.includes("Cost")
                                  ? formatCurrency(metric.optimized)
                                  : `${metric.optimized}%`
                                : formatNumber(metric.optimized)}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              {metric.change > 0 ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  metric.change > 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {Math.abs(metric.change)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Expected improvements with optimized allocation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Key Improvement: Qualified Leads</h4>
                      <p className="text-sm">
                        By reallocating 20% from Instagram to LinkedIn, we expect a 23% increase in qualified leads
                        (from 2,850 to 3,505 per month). This is due to LinkedIn's superior performance for B2B SaaS
                        targeting in the 25-34 age demographic.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Cost Efficiency</h4>
                      <p className="text-sm">
                        The optimized allocation reduces cost per lead by 18.6%, from $17.54 to $14.27, while
                        maintaining overall reach within acceptable limits.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projections" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>6-Month Lead Generation Projection</CardTitle>
                    <CardDescription>Comparing original vs optimized performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyProjection}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="original"
                            stroke="hsl(var(--muted-foreground))"
                            strokeWidth={2}
                            name="Original"
                          />
                          <Line
                            type="monotone"
                            dataKey="optimized"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            name="Optimized"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cumulative Impact</CardTitle>
                      <CardDescription>6-month totals</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Original Strategy:</span>
                        <span className="font-semibold">17,900 leads</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimized Strategy:</span>
                        <span className="font-semibold text-primary">22,020 leads</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Additional Leads:</span>
                        <span className="font-semibold text-green-600">+4,120 leads</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Impact</CardTitle>
                      <CardDescription>Estimated revenue increase</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">+$206,000</div>
                        <p className="text-sm text-muted-foreground">Additional revenue potential</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        *Based on average conversion rate of 5% and $1,000 average customer value
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

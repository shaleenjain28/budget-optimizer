"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Target, Users, Megaphone } from "lucide-react"
import { Navigation } from "@/components/navigation"

interface BudgetData {
  totalBudget: string
  productType: string
  targetDemographic: {
    ageRange: string
    location: string
    gender: string
    interests: string
  }
  preferredChannels: string[]
}

const marketingChannels = [
  "Facebook",
  "Instagram",
  "YouTube",
  "TikTok",
  "LinkedIn",
  "Offline Billboards",
  "Print",
  "Radio",
]

export default function BudgetPlannerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalBudget: "",
    productType: "",
    targetDemographic: {
      ageRange: "",
      location: "",
      gender: "",
      interests: "",
    },
    preferredChannels: [],
  })

  const handleChannelToggle = (channel: string) => {
    setBudgetData((prev) => ({
      ...prev,
      preferredChannels: prev.preferredChannels.includes(channel)
        ? prev.preferredChannels.filter((c) => c !== channel)
        : [...prev.preferredChannels, channel],
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Navigate to results page (will be implemented in next task)
    console.log("Budget data:", budgetData)
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return budgetData.totalBudget !== ""
      case 2:
        return budgetData.productType !== ""
      case 3:
        return budgetData.targetDemographic.ageRange !== "" && budgetData.targetDemographic.location !== ""
      case 4:
        return budgetData.preferredChannels.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Marketing Budget Planner</h1>
          <p className="text-muted-foreground mt-2">Optimize your marketing spend across channels</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <DollarSign className="w-5 h-5" />}
              {currentStep === 2 && <Target className="w-5 h-5" />}
              {currentStep === 3 && <Users className="w-5 h-5" />}
              {currentStep === 4 && <Megaphone className="w-5 h-5" />}
              {currentStep === 1 && "Budget Information"}
              {currentStep === 2 && "Product Details"}
              {currentStep === 3 && "Target Audience"}
              {currentStep === 4 && "Marketing Channels"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Enter your total marketing budget"}
              {currentStep === 2 && "Tell us about your product or service"}
              {currentStep === 3 && "Define your target demographic"}
              {currentStep === 4 && "Select your preferred marketing channels"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Budget */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget">Total Marketing Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget amount"
                    value={budgetData.totalBudget}
                    onChange={(e) => setBudgetData((prev) => ({ ...prev, totalBudget: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Product Type */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-type">Product/Service Type</Label>
                  <Select
                    value={budgetData.productType}
                    onValueChange={(value) => setBudgetData((prev) => ({ ...prev, productType: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS/Software</SelectItem>
                      <SelectItem value="service">Professional Service</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Target Demographic */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age-range">Age Range</Label>
                    <Select
                      value={budgetData.targetDemographic.ageRange}
                      onValueChange={(value) =>
                        setBudgetData((prev) => ({
                          ...prev,
                          targetDemographic: { ...prev.targetDemographic, ageRange: value },
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55+">55+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={budgetData.targetDemographic.gender}
                      onValueChange={(value) =>
                        setBudgetData((prev) => ({
                          ...prev,
                          targetDemographic: { ...prev.targetDemographic, gender: value },
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., United States, California, Global"
                    value={budgetData.targetDemographic.location}
                    onChange={(e) =>
                      setBudgetData((prev) => ({
                        ...prev,
                        targetDemographic: { ...prev.targetDemographic, location: e.target.value },
                      }))
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="interests">Interests & Behaviors</Label>
                  <Textarea
                    id="interests"
                    placeholder="Describe your target audience's interests, behaviors, and preferences"
                    value={budgetData.targetDemographic.interests}
                    onChange={(e) =>
                      setBudgetData((prev) => ({
                        ...prev,
                        targetDemographic: { ...prev.targetDemographic, interests: e.target.value },
                      }))
                    }
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Marketing Channels */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label>Select Preferred Marketing Channels</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {marketingChannels.map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <Checkbox
                          id={channel}
                          checked={budgetData.preferredChannels.includes(channel)}
                          onCheckedChange={() => handleChannelToggle(channel)}
                        />
                        <Label htmlFor={channel} className="text-sm font-normal">
                          {channel}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {budgetData.preferredChannels.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Selected channels:</p>
                      <div className="flex flex-wrap gap-2">
                        {budgetData.preferredChannels.map((channel) => (
                          <Badge key={channel} variant="secondary">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepComplete(currentStep)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepComplete(currentStep)}
                  className="flex items-center gap-2"
                >
                  Submit & Simulate
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

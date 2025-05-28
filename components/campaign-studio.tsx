"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Phone,
  TrendingUp,
  Users,
  Clock,
  Target,
  BarChart3,
  Activity,
  PhoneCall,
  CheckCircle,
  XCircle,
  AlertCircle,
  Volume2,
  Download,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCampaignStore } from "@/store";

interface CampaignStudioProps {
  campaignId: string;
}

// Mock data - in real app this would come from API
const campaignData = {
  id: "1",
  name: "Q1 Product Launch A/B Test",
  status: "Active",
  startedAt: "2024-01-15T09:00:00Z",
  totalCalls: 1247,
  totalContacts: 2500,
  variants: {
    A: {
      name: "Professional Approach",
      calls: 623,
      conversions: 138,
      conversionRate: 22.1,
      avgCallDuration: "4:32",
      successRate: 68.5,
      color: "orange",
    },
    B: {
      name: "Casual Approach",
      calls: 624,
      conversions: 99,
      conversionRate: 15.9,
      avgCallDuration: "3:47",
      successRate: 61.2,
      color: "blue",
    },
  },
};

const recentCalls = [
  {
    id: 1,
    contactName: "Sarah Johnson",
    company: "TechCorp Inc.",
    variant: "A",
    status: "Converted",
    duration: "5:23",
    timestamp: "2 minutes ago",
    outcome: "Scheduled demo for next week",
    sentiment: "Positive",
    keyPoints: [
      "Interested in enterprise features",
      "Budget approved",
      "Decision maker",
    ],
  },
  {
    id: 2,
    contactName: "Michael Chen",
    company: "Innovate Solutions",
    variant: "B",
    status: "Follow-up",
    duration: "3:45",
    timestamp: "8 minutes ago",
    outcome: "Requested more information",
    sentiment: "Neutral",
    keyPoints: [
      "Needs to discuss with team",
      "Price sensitive",
      "Interested in ROI data",
    ],
  },
  {
    id: 3,
    contactName: "Emily Rodriguez",
    company: "StartupCo",
    variant: "A",
    status: "Not Interested",
    duration: "1:12",
    timestamp: "15 minutes ago",
    outcome: "Not a good fit currently",
    sentiment: "Negative",
    keyPoints: ["Too early stage", "Limited budget", "Different priorities"],
  },
  {
    id: 4,
    contactName: "David Kim",
    company: "Enterprise Networks",
    variant: "B",
    status: "Converted",
    duration: "6:18",
    timestamp: "23 minutes ago",
    outcome: "Signed annual contract",
    sentiment: "Very Positive",
    keyPoints: [
      "Immediate need",
      "Impressed with features",
      "Quick decision maker",
    ],
  },
  {
    id: 5,
    contactName: "Lisa Thompson",
    company: "Thompson Consulting",
    variant: "A",
    status: "Callback Scheduled",
    duration: "2:56",
    timestamp: "31 minutes ago",
    outcome: "Will call back tomorrow",
    sentiment: "Positive",
    keyPoints: ["Busy schedule", "Showed interest", "Prefers email follow-up"],
  },
];

const liveMetrics = {
  callsPerHour: 45,
  avgResponseTime: "2.3s",
  currentlyActive: 8,
  queuedCalls: 156,
  successTrend: "+12%",
  conversionTrend: "+8%",
};

export function CampaignStudio({ campaignId }: CampaignStudioProps) {
  const [isLive, setIsLive] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  console.log(campaignId, "ID");
  const [seconds, setSeconds] = useState(45345);
  const campaignsData = useCampaignStore((state) => state.campaigns);
  const data = campaignsData.filter((campaign) => campaign.id === campaignId);
  const filteredData = data[0];
  const [isRunning, setIsRunning] = useState<boolean>(true); // Timer running by default

  console.log(data, "CAMPAIGN");
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);
  const formatTime = (totalSeconds: number): string => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "converted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "follow-up":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "callback scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "not interested":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "very positive":
      case "positive":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "neutral":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case "negative":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">
                {filteredData.name}
              </h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {campaignData.status}
              </Badge>
            </div>
            <p className="text-gray-400">
              Campaign Studio - Live Monitoring & Analytics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            onClick={() => {
              setIsRunning((prev) => !prev);
              setIsLive(!isLive);
            }}
            className={
              isLive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }
          >
            {isLive ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isLive ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>

      {/* Live Status Bar */}
      <Card className="bg-gradient-to-r from-green-500/10 to-green-600/5 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">
                  Live Campaign
                </span>
              </div>
              <div className="text-white">
                <span className="text-2xl font-bold">
                  {liveMetrics.currentlyActive}
                </span>
                <span className="text-gray-400 ml-1">agents active</span>
              </div>
              <div className="text-white">
                <span className="text-2xl font-bold">
                  {liveMetrics.callsPerHour}
                </span>
                <span className="text-gray-400 ml-1">calls/hour</span>
              </div>
              <div className="text-white">
                <span className="text-2xl font-bold">
                  {liveMetrics.queuedCalls}
                </span>
                <span className="text-gray-400 ml-1">in queue</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Campaign Runtime</p>
              <p className="text-white font-mono text-lg">
                {formatTime(seconds)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="variants"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            <Target className="h-4 w-4 mr-2" />
            A/B Comparison
          </TabsTrigger>
          <TabsTrigger
            value="calls"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Recent Calls
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Calls
                </CardTitle>
                <Phone className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {campaignData.totalCalls.toLocaleString()}
                </div>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {liveMetrics.successTrend} from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Overall Conversion
                </CardTitle>
                <Target className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">19.0%</div>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {liveMetrics.conversionTrend} from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Avg Call Duration
                </CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">4:09</div>
                <p className="text-xs text-gray-400">Optimal range: 3-6 min</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Contacts Remaining
                </CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    campaignData.totalContacts - campaignData.totalCalls
                  ).toLocaleString()}
                </div>
                <Progress
                  value={
                    (campaignData.totalCalls / campaignData.totalContacts) * 100
                  }
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                Performance Over Time
              </CardTitle>
              <CardDescription className="text-gray-400">
                Conversion rates and call volume trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">
                  📊 Live performance chart would be rendered here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* A/B Comparison Tab */}
        <TabsContent value="variants" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Variant A */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  {campaignData.variants.A.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Professional approach variant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Calls Made</p>
                    <p className="text-2xl font-bold text-white">
                      {campaignData.variants.A.calls}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conversions</p>
                    <p className="text-2xl font-bold text-orange-400">
                      {campaignData.variants.A.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conversion Rate</p>
                    <p className="text-2xl font-bold text-green-400">
                      {campaignData.variants.A.conversionRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {campaignData.variants.A.successRate}%
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400">Avg Call Duration</p>
                  <p className="text-lg font-semibold text-white">
                    {campaignData.variants.A.avgCallDuration}
                  </p>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  🏆 Leading Variant
                </Badge>
              </CardContent>
            </Card>

            {/* Variant B */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    B
                  </div>
                  {campaignData.variants.B.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Casual approach variant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Calls Made</p>
                    <p className="text-2xl font-bold text-white">
                      {campaignData.variants.B.calls}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conversions</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {campaignData.variants.B.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conversion Rate</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {campaignData.variants.B.conversionRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {campaignData.variants.B.successRate}%
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400">Avg Call Duration</p>
                  <p className="text-lg font-semibold text-white">
                    {campaignData.variants.B.avgCallDuration}
                  </p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  📈 Improving
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Insights */}
          <Card className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">A/B Test Insights</CardTitle>
              <CardDescription className="text-gray-400">
                Key findings from variant comparison
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-green-300">
                  Variant A shows 39% higher conversion rate (+6.2 percentage
                  points)
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <p className="text-blue-300">
                  Variant A has longer call duration, indicating better
                  engagement
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <p className="text-yellow-300">
                  Statistical significance reached - consider scaling Variant A
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Calls Tab */}
        <TabsContent value="calls" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Recent Call Activity
            </h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Live Feed
            </Badge>
          </div>

          <div className="space-y-4">
            {recentCalls.map((call) => (
              <Card
                key={call.id}
                className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 hover:border-orange-500/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 bg-orange-500">
                        <AvatarFallback className="text-white font-medium">
                          {call.contactName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {call.contactName}
                          </h4>
                          <p className="text-gray-400">{call.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            className={
                              call.variant === "A"
                                ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }
                          >
                            Variant {call.variant}
                          </Badge>
                          <Badge className={getStatusColor(call.status)}>
                            {call.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-400">
                            {getSentimentIcon(call.sentiment)}
                            <span className="text-sm">{call.sentiment}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{call.duration}</span>
                      </div>
                      <p className="text-sm text-gray-500">{call.timestamp}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-orange-400 hover:text-orange-300"
                      >
                        <Volume2 className="h-4 w-4 mr-1" />
                        Listen
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Outcome</p>
                      <p className="text-white">{call.outcome}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Key Points</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {call.keyPoints.map((point, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-gray-600 text-gray-300 text-xs"
                          >
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Load More Calls
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

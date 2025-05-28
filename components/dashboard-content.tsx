"use client";

import { useState } from "react";
import {
  BarChart3,
  Bot,
  Phone,
  Plus,
  Target,
  TrendingUp,
  Users,
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
import { useRouter } from "next/navigation";
const statsData = [
  {
    title: "Active Campaigns",
    value: "12",
    change: "+2 from last week",
    icon: Target,
    color: "text-orange-500",
  },
  {
    title: "Total Calls",
    value: "2,847",
    change: "+12% from last month",
    icon: Phone,
    color: "text-blue-500",
  },
  {
    title: "Conversion Rate",
    value: "18.2%",
    change: "+3.1% from last month",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Active Agents",
    value: "8",
    change: "2 agents optimizing",
    icon: Bot,
    color: "text-purple-500",
  },
];

const campaignData = [
  {
    id: 1,
    name: "Q1 Product Launch",
    status: "Active",
    calls: 1247,
    conversion: "22.1%",
    agent: "Agent Alpha",
    lastRun: "2 hours ago",
    variant: "A/B Testing",
  },
  {
    id: 2,
    name: "Holiday Promotion",
    status: "Paused",
    calls: 856,
    conversion: "15.8%",
    agent: "Agent Beta",
    lastRun: "1 day ago",
    variant: "Single Flow",
  },
  {
    id: 3,
    name: "Customer Retention",
    status: "Active",
    calls: 432,
    conversion: "31.2%",
    agent: "Agent Gamma",
    lastRun: "30 minutes ago",
    variant: "Multi-variant",
  },
  {
    id: 4,
    name: "Lead Qualification",
    status: "Draft",
    calls: 0,
    conversion: "0%",
    agent: "Agent Delta",
    lastRun: "Never",
    variant: "A/B Testing",
  },
];

export function DashboardContent() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const router = useRouter();
  const handleNewCampaign = async () => {
    router.push("/dashboard/campaigns/new");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back! Here's what's happening with your voice campaigns.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {["24h", "7d", "30d", "90d"].map((timeframe) => (
              <Button
                key={timeframe}
                variant={
                  selectedTimeframe === timeframe ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className={
                  selectedTimeframe === timeframe
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-gray-700 text-gray-300 hover:bg-gray-800"
                }
              >
                {timeframe}
              </Button>
            ))}
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Campaigns</h2>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaignData.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 hover:border-orange-500/30 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{campaign.name}</CardTitle>
                  <Badge
                    variant={
                      campaign.status === "Active"
                        ? "default"
                        : campaign.status === "Paused"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      campaign.status === "Active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : campaign.status === "Paused"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  {campaign.agent} • {campaign.variant}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Calls</p>
                    <p className="text-lg font-semibold text-white">
                      {campaign.calls.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conversion Rate</p>
                    <p className="text-lg font-semibold text-orange-400">
                      {campaign.conversion}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <span className="text-sm text-gray-400">
                    Last run: {campaign.lastRun}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      View
                    </Button>
                    {campaign.status === "Active" && (
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Optimize
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-500/40 transition-colors cursor-pointer">
          <CardHeader onClick={handleNewCampaign}>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-400" />
              Create Campaign
            </CardTitle>
            <CardDescription className="text-gray-300">
              Launch a new voice agent campaign with A/B testing
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              View Analytics
            </CardTitle>
            <CardDescription className="text-gray-300">
              Deep dive into performance metrics and insights
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Manage Contacts
            </CardTitle>
            <CardDescription className="text-gray-300">
              Upload and organize your contact lists
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

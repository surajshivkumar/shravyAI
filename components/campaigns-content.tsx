"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Eye,
  Edit,
  Copy,
  Trash2,
  Target,
  Bot,
  TrendingUp,
  TrendingDown,
  Activity,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const campaignsData = [
  {
    id: "1",
    name: "Q1 Product Launch A/B Test",
    type: "experiment",
    status: "Active",
    createdAt: "2024-01-15",
    lastActivity: "2 minutes ago",
    totalCalls: 1247,
    totalContacts: 2500,
    conversions: 237,
    conversionRate: 19.0,
    variants: ["Professional Approach", "Casual Approach"],
    agent: "Agent Alpha",
    budget: 5000,
    spent: 2340,
    performance: "up",
    tags: ["High Priority", "Product Launch"],
  },
  {
    id: "2",
    name: "Holiday Promotion Campaign",
    type: "adaptive",
    status: "Completed",
    createdAt: "2023-12-01",
    lastActivity: "3 days ago",
    totalCalls: 2156,
    totalContacts: 2156,
    conversions: 341,
    conversionRate: 15.8,
    variants: ["Adaptive AI"],
    agent: "Agent Beta",
    budget: 8000,
    spent: 7850,
    performance: "up",
    tags: ["Seasonal", "Promotion"],
  },
  {
    id: "3",
    name: "Customer Retention Outreach",
    type: "experiment",
    status: "Active",
    createdAt: "2024-01-10",
    lastActivity: "15 minutes ago",
    totalCalls: 432,
    totalContacts: 800,
    conversions: 135,
    conversionRate: 31.2,
    variants: ["Empathy Focus", "Value Proposition"],
    agent: "Agent Gamma",
    budget: 3000,
    spent: 1620,
    performance: "up",
    tags: ["Retention", "High Value"],
  },
  {
    id: "4",
    name: "Lead Qualification Test",
    type: "experiment",
    status: "Draft",
    createdAt: "2024-01-20",
    lastActivity: "Never",
    totalCalls: 0,
    totalContacts: 1500,
    conversions: 0,
    conversionRate: 0,
    variants: ["Discovery Questions", "Pain Point Focus"],
    agent: "Agent Delta",
    budget: 4500,
    spent: 0,
    performance: "neutral",
    tags: ["Lead Gen", "B2B"],
  },
  {
    id: "5",
    name: "Upsell Existing Customers",
    type: "adaptive",
    status: "Paused",
    createdAt: "2024-01-05",
    lastActivity: "2 days ago",
    totalCalls: 189,
    totalContacts: 350,
    conversions: 23,
    conversionRate: 12.2,
    variants: ["Adaptive AI"],
    agent: "Agent Epsilon",
    budget: 2500,
    spent: 1350,
    performance: "down",
    tags: ["Upsell", "Existing Customers"],
  },
  {
    id: "6",
    name: "New Market Expansion",
    type: "experiment",
    status: "Active",
    createdAt: "2024-01-18",
    lastActivity: "1 hour ago",
    totalCalls: 78,
    totalContacts: 1200,
    conversions: 12,
    conversionRate: 15.4,
    variants: ["Market Education", "Direct Pitch"],
    agent: "Agent Zeta",
    budget: 6000,
    spent: 390,
    performance: "up",
    tags: ["Expansion", "New Market"],
  },
];

const campaignStats = {
  total: campaignsData.length,
  active: campaignsData.filter((c) => c.status === "Active").length,
  completed: campaignsData.filter((c) => c.status === "Completed").length,
  draft: campaignsData.filter((c) => c.status === "Draft").length,
  paused: campaignsData.filter((c) => c.status === "Paused").length,
  totalCalls: campaignsData.reduce((sum, c) => sum + c.totalCalls, 0),
  totalConversions: campaignsData.reduce((sum, c) => sum + c.conversions, 0),
  avgConversionRate:
    campaignsData.reduce((sum, c) => sum + c.conversionRate, 0) /
    campaignsData.length,
};

export function CampaignsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("all");

  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      selectedStatus === "all" ||
      campaign.status.toLowerCase() === selectedStatus;
    const matchesType =
      selectedType === "all" || campaign.type === selectedType;
    const matchesView =
      viewMode === "all" ||
      (viewMode === "active" &&
        ["Active", "Paused"].includes(campaign.status)) ||
      (viewMode === "inactive" &&
        ["Completed", "Draft"].includes(campaign.status));

    return matchesSearch && matchesStatus && matchesType && matchesView;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "experiment" ? (
      <Target className="h-4 w-4 text-orange-400" />
    ) : (
      <Bot className="h-4 w-4 text-blue-400" />
    );
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">Campaigns</h1>
            <p className="text-gray-400">
              Manage and monitor your voice agent campaigns
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            asChild
          >
            <a href="/dashboard/campaigns/new">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Campaigns
            </CardTitle>
            <Target className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {campaignStats.total}
            </div>
            <p className="text-xs text-gray-400">
              {campaignStats.active} active • {campaignStats.paused} paused
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Calls
            </CardTitle>
            <Phone className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {campaignStats.totalCalls.toLocaleString()}
            </div>
            <p className="text-xs text-green-400">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Conversions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {campaignStats.totalConversions.toLocaleString()}
            </div>
            <p className="text-xs text-green-400">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Avg Conversion Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {campaignStats.avgConversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-400">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns, agents, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="experiment">A/B Experiment</SelectItem>
            <SelectItem value="adaptive">Adaptive Agent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="calls">Total Calls</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            All Campaigns ({campaignsData.length})
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Active ({campaignStats.active + campaignStats.paused})
          </TabsTrigger>
          <TabsTrigger
            value="inactive"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Inactive ({campaignStats.completed + campaignStats.draft})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={viewMode} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 hover:border-orange-500/30 transition-colors group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(campaign.type)}
                        <CardTitle className="text-white text-lg">
                          {campaign.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-300 text-xs"
                        >
                          {campaign.type === "experiment"
                            ? "A/B Test"
                            : "Adaptive AI"}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem
                          className="text-gray-300 hover:bg-gray-700"
                          asChild
                        >
                          <a href={`/dashboard/campaigns/${campaign.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Studio
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        {campaign.status === "Active" ? (
                          <DropdownMenuItem className="text-yellow-400 hover:bg-gray-700">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause Campaign
                          </DropdownMenuItem>
                        ) : campaign.status === "Paused" ? (
                          <DropdownMenuItem className="text-green-400 hover:bg-gray-700">
                            <Play className="h-4 w-4 mr-2" />
                            Resume Campaign
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Calls Made</p>
                      <p className="text-lg font-semibold text-white">
                        {campaign.totalCalls.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Conversions</p>
                      <div className="flex items-center gap-1">
                        <p className="text-lg font-semibold text-orange-400">
                          {campaign.conversions}
                        </p>
                        {getPerformanceIcon(campaign.performance)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Conversion Rate</p>
                      <p className="text-lg font-semibold text-green-400">
                        {campaign.conversionRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Progress</p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-white">
                          {Math.round(
                            (campaign.totalCalls / campaign.totalContacts) * 100
                          )}
                          %
                        </p>
                        <Progress
                          value={
                            (campaign.totalCalls / campaign.totalContacts) * 100
                          }
                          className="h-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="space-y-2 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Agent:</span>
                      <span className="text-white">{campaign.agent}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white">
                        ${campaign.spent.toLocaleString()} / $
                        {campaign.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Last Activity:</span>
                      <span className="text-white">
                        {campaign.lastActivity}
                      </span>
                    </div>
                  </div>

                  {/* Variants */}
                  {campaign.type === "experiment" && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Variants</p>
                      <div className="flex flex-wrap gap-1">
                        {campaign.variants.map((variant, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={
                              index === 0
                                ? "border-orange-500/30 text-orange-400"
                                : "border-blue-500/30 text-blue-400"
                            }
                          >
                            {String.fromCharCode(65 + index)}: {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {campaign.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-gray-600 text-gray-300 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                      asChild
                    >
                      <a href={`/dashboard/campaigns/${campaign.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Studio
                      </a>
                    </Button>
                    {campaign.status === "Active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {campaign.status === "Paused" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                asChild
              >
                <a href="/dashboard/campaigns/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Campaign
                </a>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

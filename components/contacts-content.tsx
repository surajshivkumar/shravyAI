"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Phone,
  Mail,
  Plus,
  Upload,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const contactGroups = [
  {
    id: 1,
    name: "Q1 Product Launch - Segment A",
    campaign: "Q1 Product Launch",
    totalContacts: 1247,
    called: 856,
    converted: 189,
    status: "Active",
    lastUpdated: "2 hours ago",
    conversionRate: "22.1%",
    tags: ["High Value", "Tech Industry"],
  },
  {
    id: 2,
    name: "Holiday Promotion - VIP Customers",
    campaign: "Holiday Promotion",
    totalContacts: 432,
    called: 432,
    converted: 68,
    status: "Completed",
    lastUpdated: "1 day ago",
    conversionRate: "15.7%",
    tags: ["VIP", "Repeat Customers"],
  },
  {
    id: 3,
    name: "Customer Retention - At Risk",
    campaign: "Customer Retention",
    totalContacts: 289,
    called: 156,
    converted: 49,
    status: "Active",
    lastUpdated: "30 minutes ago",
    conversionRate: "31.4%",
    tags: ["At Risk", "High Priority"],
  },
  {
    id: 4,
    name: "Lead Qualification - New Prospects",
    campaign: "Lead Qualification",
    totalContacts: 1856,
    called: 0,
    converted: 0,
    status: "Pending",
    lastUpdated: "3 days ago",
    conversionRate: "0%",
    tags: ["New Leads", "Unqualified"],
  },
];

const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    status: "Converted",
    lastCalled: "2024-01-15",
    campaign: "Q1 Product Launch",
    group: "Segment A",
    notes: "Interested in enterprise package",
    tags: ["Decision Maker", "High Value"],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@innovate.io",
    phone: "+1 (555) 234-5678",
    company: "Innovate Solutions",
    status: "Called",
    lastCalled: "2024-01-14",
    campaign: "Q1 Product Launch",
    group: "Segment A",
    notes: "Requested demo for next week",
    tags: ["Warm Lead", "Demo Scheduled"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@startup.com",
    phone: "+1 (555) 345-6789",
    company: "StartupCo",
    status: "Not Reached",
    lastCalled: "2024-01-13",
    campaign: "Holiday Promotion",
    group: "VIP Customers",
    notes: "Voicemail left, follow up needed",
    tags: ["VIP", "Follow Up"],
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@enterprise.net",
    phone: "+1 (555) 456-7890",
    company: "Enterprise Networks",
    status: "Converted",
    lastCalled: "2024-01-12",
    campaign: "Customer Retention",
    group: "At Risk",
    notes: "Renewed annual subscription",
    tags: ["Retained", "Annual Plan"],
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.t@consulting.biz",
    phone: "+1 (555) 567-8901",
    company: "Thompson Consulting",
    status: "Declined",
    lastCalled: "2024-01-11",
    campaign: "Q1 Product Launch",
    group: "Segment A",
    notes: "Not interested at this time",
    tags: ["Declined", "Future Opportunity"],
  },
];

export function ContactsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("groups");

  const filteredGroups = contactGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign =
      selectedCampaign === "all" || group.campaign === selectedCampaign;
    const matchesStatus =
      selectedStatus === "all" || group.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesCampaign && matchesStatus;
  });

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign =
      selectedCampaign === "all" || contact.campaign === selectedCampaign;
    const matchesStatus =
      selectedStatus === "all" ||
      contact.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesCampaign && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "converted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "called":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "not reached":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "declined":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">Contacts</h1>
            <p className="text-gray-400">
              Manage your contact groups and individual contacts across
              campaigns.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-orange-500 border-gray-700 text-white hover:bg-orange-600"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button
            variant="outline"
            className="bg-orange-500 border-gray-700 text-white hover:bg-orange-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search contacts, groups, or campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="All Campaigns" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="Q1 Product Launch">Q1 Product Launch</SelectItem>
            <SelectItem value="Holiday Promotion">Holiday Promotion</SelectItem>
            <SelectItem value="Customer Retention">
              Customer Retention
            </SelectItem>
            <SelectItem value="Lead Qualification">
              Lead Qualification
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="called">Called</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger
            value="groups"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            <Users className="h-4 w-4 mr-2" />
            Contact Groups ({filteredGroups.length})
          </TabsTrigger>
          <TabsTrigger
            value="contacts"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            <Phone className="h-4 w-4 mr-2" />
            Individual Contacts ({filteredContacts.length})
          </TabsTrigger>
        </TabsList>

        {/* Contact Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 hover:border-orange-500/30 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-white">{group.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Campaign: {group.campaign}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(group.status)}>
                        {group.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Group
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Group
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Total Contacts</p>
                      <p className="text-lg font-semibold text-white">
                        {group.totalContacts.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Called</p>
                      <p className="text-lg font-semibold text-blue-400">
                        {group.called.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Converted</p>
                      <p className="text-lg font-semibold text-green-400">
                        {group.converted.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Conversion Rate</p>
                      <p className="text-lg font-semibold text-orange-400">
                        {group.conversionRate}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag, index) => (
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

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                    <span className="text-sm text-gray-400">
                      Updated: {group.lastUpdated}
                    </span>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      View Contacts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Individual Contacts Tab */}
        <TabsContent value="contacts" className="space-y-4">
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 hover:border-orange-500/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 bg-orange-500">
                        <AvatarFallback className="text-white font-medium">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white">
                          {contact.name}
                        </h3>
                        <p className="text-gray-400">{contact.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-1">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                        <p className="text-xs text-gray-400">
                          Last called: {contact.lastCalled}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                    <div>
                      <p className="text-sm text-gray-400">Campaign</p>
                      <p className="text-sm font-medium text-white">
                        {contact.campaign}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Group</p>
                      <p className="text-sm font-medium text-white">
                        {contact.group}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contact.tags.map((tag, index) => (
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
                  </div>

                  {contact.notes && (
                    <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400">Notes</p>
                      <p className="text-sm text-gray-300 mt-1">
                        {contact.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

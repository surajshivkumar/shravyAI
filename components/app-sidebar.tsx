"use client";

import {
  BarChart3,
  Bot,
  Home,
  Phone,
  Plus,
  Settings,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Campaigns",
    url: "/dashboard/campaigns",
    icon: Target,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Voice Agents",
    url: "/dashboard/agents",
    icon: Bot,
  },
  {
    title: "Contacts",
    url: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: Wallet,
  },
];

const quickActions = [
  {
    title: "New Campaign",
    url: "/dashboard/campaigns/new",
    icon: Plus,
  },
  {
    title: "Performance",
    url: "/dashboard/performance",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-800 border-r border-gray-800/50">
      <SidebarHeader className="bg-gray-800 border-b border-gray-800/50 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Sauti
            </h1>
            <p className="text-xs text-gray-400">Voice Intelligence</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2 bg-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-orange-500/10"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-orange-500/10"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gray-800 border-t border-gray-800/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-gray-300 hover:text-white hover:bg-orange-500/10"
            >
              <a href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-400 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

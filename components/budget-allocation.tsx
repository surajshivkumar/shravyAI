"use client";

import { useState } from "react";
import {
  Target,
  Play,
  Pause,
  Settings,
  TrendingUp,
  TrendingDown,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Ad {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  dailyBudget: number;
  totalBudget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  platform: string;
}

const sampleAds: Ad[] = [
  {
    id: "1",
    name: "Summer Sale Campaign",
    status: "active",
    dailyBudget: 50,
    totalBudget: 1500,
    spent: 847.3,
    impressions: 45230,
    clicks: 1205,
    ctr: 2.67,
    cpc: 0.7,
    platform: "Google Ads",
  },
  {
    id: "2",
    name: "Brand Awareness - Q4",
    status: "active",
    dailyBudget: 75,
    totalBudget: 2250,
    spent: 1234.5,
    impressions: 67890,
    clicks: 890,
    ctr: 1.31,
    cpc: 1.39,
    platform: "Facebook Ads",
  },
  {
    id: "3",
    name: "Product Launch Promo",
    status: "paused",
    dailyBudget: 100,
    totalBudget: 3000,
    spent: 2156.8,
    impressions: 89450,
    clicks: 2340,
    ctr: 2.62,
    cpc: 0.92,
    platform: "LinkedIn Ads",
  },
  {
    id: "4",
    name: "Retargeting Campaign",
    status: "active",
    dailyBudget: 30,
    totalBudget: 900,
    spent: 456.2,
    impressions: 23450,
    clicks: 567,
    ctr: 2.42,
    cpc: 0.8,
    platform: "Google Ads",
  },
];

export function BudgetAllocation() {
  const [ads, setAds] = useState<Ad[]>(sampleAds);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [editBudget, setEditBudget] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: Ad["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusVariant = (status: Ad["status"]) => {
    switch (status) {
      case "active":
        return "default" as const;
      case "paused":
        return "secondary" as const;
      case "completed":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  const toggleAdStatus = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? { ...ad, status: ad.status === "active" ? "paused" : "active" }
          : ad
      )
    );
  };

  const handleEditBudget = (ad: Ad) => {
    setEditingAd(ad);
    setEditBudget(ad.dailyBudget.toString());
  };

  const saveBudgetEdit = () => {
    if (editingAd && editBudget) {
      setAds((prev) =>
        prev.map((ad) =>
          ad.id === editingAd.id
            ? { ...ad, dailyBudget: Number.parseFloat(editBudget) }
            : ad
        )
      );
      setEditingAd(null);
      setEditBudget("");
    }
  };

  const totalDailyBudget = ads.reduce((sum, ad) => sum + ad.dailyBudget, 0);
  const totalSpent = ads.reduce((sum, ad) => sum + ad.spent, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Allocation Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatCurrency(totalDailyBudget)}
              </div>
              <div className="text-sm text-muted-foreground">Daily Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatCurrency(totalSpent)}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {ads.filter((ad) => ad.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Campaigns
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{ads.length}</div>
              <div className="text-sm text-muted-foreground">
                Total Campaigns
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        ad.status
                      )}`}
                    />
                    <div>
                      <h3 className="font-medium">{ad.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ad.platform}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(ad.status)}>
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditBudget(ad)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Budget
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleAdStatus(ad.id)}>
                          {ad.status === "active" ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause Campaign
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Resume Campaign
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Daily Budget</div>
                    <div className="font-medium">
                      {formatCurrency(ad.dailyBudget)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Budget</div>
                    <div className="font-medium">
                      {formatCurrency(ad.totalBudget)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Spent</div>
                    <div className="font-medium">
                      {formatCurrency(ad.spent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Remaining</div>
                    <div className="font-medium">
                      {formatCurrency(ad.totalBudget - ad.spent)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Budget Used</span>
                    <span>
                      {((ad.spent / ad.totalBudget) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={(ad.spent / ad.totalBudget) * 100}
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t pt-4">
                  <div>
                    <div className="text-muted-foreground">Impressions</div>
                    <div className="font-medium">
                      {ad.impressions.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Clicks</div>
                    <div className="font-medium">
                      {ad.clicks.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">CTR</div>
                    <div className="font-medium flex items-center gap-1">
                      {ad.ctr}%
                      {ad.ctr > 2 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">CPC</div>
                    <div className="font-medium">{formatCurrency(ad.cpc)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Budget Modal */}
      <Dialog open={!!editingAd} onOpenChange={() => setEditingAd(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Daily Budget</DialogTitle>
            <DialogDescription>
              Update the daily budget for "{editingAd?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Daily Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                value={editBudget}
                onChange={(e) => setEditBudget(e.target.value)}
                placeholder="Enter daily budget"
                min="1"
                step="0.01"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAd(null)}>
              Cancel
            </Button>
            <Button onClick={saveBudgetEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

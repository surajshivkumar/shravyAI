"use client";

import { Wallet, TrendingUp, DollarSign, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WalletOverviewProps {
  onRecharge: () => void;
}

export function WalletOverview({ onRecharge }: WalletOverviewProps) {
  const walletData = {
    currentBalance: 2847.5,
    totalSpent: 15420.3,
    monthlySpend: 3240.8,
    availableCredit: 5000.0,
    currency: "USD",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: walletData.currency,
    }).format(amount);
  };

  return (
    <div className=" bg-gray-900 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white text-sm font-medium">
            Current Balance
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(walletData.currentBalance)}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">Available to spend</p>
            <Button className="bg-orange-500" size="sm" onClick={onRecharge}>
              Recharge
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white text-sm font-medium">
            Monthly Spend
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-white text-2xl font-bold">
            {formatCurrency(walletData.monthlySpend)}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600">+12%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900">
        <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white text-sm font-medium">
            Total Spent
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-white text-2xl font-bold">
            {formatCurrency(walletData.totalSpent)}
          </div>
          <p className="text-xs text-muted-foreground">
            Lifetime advertising spend
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white text-sm font-medium">
            Credit Limit
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-white">
          <div className="text-2xl font-bold">
            {formatCurrency(walletData.availableCredit)}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              Available
            </Badge>
            <p className="text-xs text-muted-foreground">Emergency credit</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

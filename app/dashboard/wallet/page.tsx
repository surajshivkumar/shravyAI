"use client";
import React from "react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RechargeModal } from "@/components/recharge-modal";
import { WalletOverview } from "@/components/wallet-overview";
import { BudgetAllocation } from "@/components/budget-allocation";
function page() {
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);

  return (
    <div className="flex-1 space-y-6 p-6">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 pr-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-300">
                  Wallet
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-300">
          Wallet
        </h1>
        <p className="text-muted-foreground">
          Manage your account balance and advertising budgets
        </p>
      </div>
      <WalletOverview onRecharge={() => setRechargeModalOpen(true)} />
      <RechargeModal
        open={rechargeModalOpen}
        onOpenChange={setRechargeModalOpen}
      />
      <BudgetAllocation />
    </div>
  );
}

export default page;

"use client";

import { useState } from "react";
import { CreditCard, DollarSign, Smartphone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

interface RechargeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickAmounts = [50, 100, 250, 500, 1000, 2500];

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: DollarSign,
    description: "Pay with your PayPal account",
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Quick payment with Touch ID",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building,
    description: "Direct bank account transfer",
  },
];

export function RechargeModal({ open, onOpenChange }: RechargeModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleRecharge = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Here you would integrate with your payment processor
    console.log("Recharging:", {
      amount: Number.parseFloat(amount),
      paymentMethod,
    });
    alert(`Recharge of $${amount} initiated successfully!`);

    // Reset form and close modal
    setAmount("");
    setPaymentMethod("card");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Recharge Account
          </DialogTitle>
          <DialogDescription>
            Add funds to your advertising account to continue running campaigns.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-4">
            <Label htmlFor="amount">Recharge Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
            />

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(value)}
                  className={
                    amount === value.toString() ? "border-primary" : ""
                  }
                >
                  ${value}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <Card className="p-3 hover:bg-muted/50 transition-colors">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3">
                          <method.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {method.description}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Summary */}
          {amount && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-lg font-bold">${amount}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                  <span>Processing Fee:</span>
                  <span>$0.00</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRecharge}
            disabled={!amount || Number.parseFloat(amount) <= 0}
          >
            Recharge ${amount || "0"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

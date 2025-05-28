"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  FlaskConical,
  Upload,
  FileText,
  ImageIcon,
  Video,
  Music,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { useCampaignStore } from "../store";
import { v4 as uuidv4 } from "uuid"; // for generating unique IDs
import { useRouter } from "next/navigation";
interface CampaignData {
  type: "experiment" | "adaptive" | null;
  name: string;
  variantA: {
    name: string;
    description: string;
    tone: string;
    approach: string;
  };
  variantB: {
    name: string;
    description: string;
    tone: string;
    approach: string;
  };
  productInfo: {
    name: string;
    description: string;
    keyFeatures: string;
    targetAudience: string;
    pricing: string;
  };
  supportingFiles: File[];
}

const initialData: CampaignData = {
  type: null,
  name: "",
  variantA: { name: "", description: "", tone: "", approach: "" },
  variantB: { name: "", description: "", tone: "", approach: "" },
  productInfo: {
    name: "",
    description: "",
    keyFeatures: "",
    targetAudience: "",
    pricing: "",
  },
  supportingFiles: [],
};

export function CreateCampaignFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>(initialData);

  const addCampaign = useCampaignStore((state) => state.addCampaign);

  const updateCampaignData = (updates: Partial<CampaignData>) => {
    setCampaignData((prev) => ({ ...prev, ...updates }));
  };
  const onLaunchCampaign = () => {
    const newCampaign = { id: uuidv4(), ...campaignData };
    console.log(newCampaign);

    addCampaign(newCampaign);
    router.push("/dashboard/campaigns");
  };
  const updateVariant = (
    variant: "variantA" | "variantB",
    updates: Partial<CampaignData["variantA"]>
  ) => {
    setCampaignData((prev) => ({
      ...prev,
      [variant]: { ...prev[variant], ...updates },
    }));
  };

  const updateProductInfo = (updates: Partial<CampaignData["productInfo"]>) => {
    setCampaignData((prev) => ({
      ...prev,
      productInfo: { ...prev.productInfo, ...updates },
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setCampaignData((prev) => ({
        ...prev,
        supportingFiles: [...prev.supportingFiles, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setCampaignData((prev) => ({
      ...prev,
      supportingFiles: prev.supportingFiles.filter((_, i) => i !== index),
    }));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/"))
      return <ImageIcon className="h-4 w-4" />;
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />;
    if (file.type.startsWith("audio/")) return <Music className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return campaignData.type !== null;
      case 2:
        return (
          campaignData.name &&
          campaignData.variantA.name &&
          campaignData.variantB.name &&
          campaignData.productInfo.name &&
          campaignData.productInfo.description
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const generatePrompt = (variant: CampaignData["variantA"]) => {
    return `You are a professional telemarketing agent for ${campaignData.productInfo.name}. 

Product Information:
- Product: ${campaignData.productInfo.name}
- Description: ${campaignData.productInfo.description}
- Key Features: ${campaignData.productInfo.keyFeatures}
- Target Audience: ${campaignData.productInfo.targetAudience}
- Pricing: ${campaignData.productInfo.pricing}

Conversation Style:
- Tone: ${variant.tone}
- Approach: ${variant.approach}
- Variant Focus: ${variant.description}

Your goal is to engage the prospect, understand their needs, and present the product in a way that resonates with them. Be natural, helpful, and focus on building rapport while highlighting the value proposition.

Remember to:
1. Start with a friendly greeting and introduction
2. Ask qualifying questions to understand their needs
3. Present relevant features and benefits
4. Handle objections professionally
5. Guide towards a clear next step or close

Keep the conversation conversational and avoid sounding scripted.`;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">
              Create New Campaign
            </h1>
            <p className="text-gray-400">
              Set up your voice agent experiment or adaptive campaign
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={() => {
            router.push("/dashboard/campaigns");
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Step {currentStep} of 3</span>
          <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
        </div>
        <Progress value={(currentStep / 3) * 100} className="h-2" />
      </div>

      {/* Step 1: Choose Campaign Type */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Choose Campaign Type
            </h2>
            <p className="text-gray-400">
              Select how you want to run your voice agent campaign
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card
              className={`cursor-pointer transition-all ${
                campaignData.type === "experiment"
                  ? "bg-orange-500/10 border-orange-500/50 ring-2 ring-orange-500/30"
                  : "bg-gray-900/80 border-gray-800/50 hover:border-orange-500/30"
              }`}
              onClick={() => updateCampaignData({ type: "experiment" })}
            >
              <CardHeader className="text-center">
                <div className="mx-auto p-4 bg-orange-500/20 rounded-full w-fit">
                  <FlaskConical className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-white">A/B Experiment</CardTitle>
                <CardDescription className="text-gray-300">
                  Test multiple conversation approaches to find the most
                  effective strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Perfect for:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Testing different conversation styles</li>
                    <li>• Comparing product positioning approaches</li>
                    <li>• Optimizing conversion rates</li>
                    <li>• Data-driven decision making</li>
                  </ul>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  Recommended for new campaigns
                </Badge>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all ${
                campaignData.type === "adaptive"
                  ? "bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/30"
                  : "bg-gray-900/80 border-gray-800/50 hover:border-blue-500/30"
              }`}
              onClick={() => updateCampaignData({ type: "adaptive" })}
            >
              <CardHeader className="text-center">
                <div className="mx-auto p-4 bg-blue-500/20 rounded-full w-fit">
                  <Bot className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white">Adaptive Agent</CardTitle>
                <CardDescription className="text-gray-300">
                  AI automatically adapts conversation style based on prospect
                  responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Perfect for:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Personalized conversations</li>
                    <li>• Dynamic response handling</li>
                    <li>• Established successful patterns</li>
                    <li>• Maximum conversion focus</li>
                  </ul>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Advanced AI optimization
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Step 2: Campaign Details */}
      {currentStep === 2 && campaignData.type === "experiment" && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Experiment Configuration
            </h2>
            <p className="text-gray-400">
              Set up your A/B test variants and product information
            </p>
          </div>

          {/* Campaign Name */}
          <Card className="bg-gray-900/80 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name" className="text-gray-200">
                  Campaign Name
                </Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Q2 Product Launch A/B Test"
                  value={campaignData.name}
                  onChange={(e) => updateCampaignData({ name: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Variant A */}
            <Card className="bg-gray-900/80 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  Variant A
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Variant Name</Label>
                  <Input
                    placeholder="e.g., Professional Approach"
                    value={campaignData.variantA.name}
                    onChange={(e) =>
                      updateVariant("variantA", { name: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-200">Description</Label>
                  <Textarea
                    placeholder="Describe the approach for this variant..."
                    value={campaignData.variantA.description}
                    onChange={(e) =>
                      updateVariant("variantA", { description: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Tone</Label>
                    <Input
                      placeholder="e.g., Professional"
                      value={campaignData.variantA.tone}
                      onChange={(e) =>
                        updateVariant("variantA", { tone: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Approach</Label>
                    <Input
                      placeholder="e.g., Feature-focused"
                      value={campaignData.variantA.approach}
                      onChange={(e) =>
                        updateVariant("variantA", { approach: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Variant B */}
            <Card className="bg-gray-900/80 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    B
                  </div>
                  Variant B
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Variant Name</Label>
                  <Input
                    placeholder="e.g., Casual Approach"
                    value={campaignData.variantB.name}
                    onChange={(e) =>
                      updateVariant("variantB", { name: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-200">Description</Label>
                  <Textarea
                    placeholder="Describe the approach for this variant..."
                    value={campaignData.variantB.description}
                    onChange={(e) =>
                      updateVariant("variantB", { description: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Tone</Label>
                    <Input
                      placeholder="e.g., Friendly"
                      value={campaignData.variantB.tone}
                      onChange={(e) =>
                        updateVariant("variantB", { tone: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Approach</Label>
                    <Input
                      placeholder="e.g., Benefit-focused"
                      value={campaignData.variantB.approach}
                      onChange={(e) =>
                        updateVariant("variantB", { approach: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Information */}
          <Card className="bg-gray-900/80 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Product Information</CardTitle>
              <CardDescription className="text-gray-400">
                Provide details about the product or service being promoted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Product Name</Label>
                  <Input
                    placeholder="e.g., SaaS Platform Pro"
                    value={campaignData.productInfo.name}
                    onChange={(e) =>
                      updateProductInfo({ name: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-200">Target Audience</Label>
                  <Input
                    placeholder="e.g., Small business owners"
                    value={campaignData.productInfo.targetAudience}
                    onChange={(e) =>
                      updateProductInfo({ targetAudience: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">Product Description</Label>
                <Textarea
                  placeholder="Describe what your product does and its main value proposition..."
                  value={campaignData.productInfo.description}
                  onChange={(e) =>
                    updateProductInfo({ description: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">Key Features</Label>
                <Textarea
                  placeholder="List the main features and benefits..."
                  value={campaignData.productInfo.keyFeatures}
                  onChange={(e) =>
                    updateProductInfo({ keyFeatures: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">Pricing Information</Label>
                <Input
                  placeholder="e.g., Starting at $99/month"
                  value={campaignData.productInfo.pricing}
                  onChange={(e) =>
                    updateProductInfo({ pricing: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Supporting Files */}
          <Card className="bg-gray-900/80 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Supporting Files</CardTitle>
              <CardDescription className="text-gray-400">
                Upload documents, images, or audio files to help train your
                voice agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Choose Files
                </Button>
              </div>

              {campaignData.supportingFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-200">Uploaded Files</Label>
                  <div className="space-y-2">
                    {campaignData.supportingFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="text-white text-sm">{file.name}</p>
                            <p className="text-gray-400 text-xs">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Review and Launch */}
      {currentStep === 3 && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Review & Launch</h2>
            <p className="text-gray-400">
              Review your campaign configuration and generated prompts
            </p>
          </div>

          {/* Campaign Summary */}
          <Card className="bg-gray-900/80 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Campaign Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Campaign Name</Label>
                  <p className="text-white font-medium">{campaignData.name}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Campaign Type</Label>
                  <p className="text-white font-medium capitalize">
                    {campaignData.type} Campaign
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400">Product</Label>
                  <p className="text-white font-medium">
                    {campaignData.productInfo.name}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400">Supporting Files</Label>
                  <p className="text-white font-medium">
                    {campaignData.supportingFiles.length} files uploaded
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Prompts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Variant A Prompt */}
            <Card className="bg-gray-900/80 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  {campaignData.variantA.name} - Generated Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                    {generatePrompt(campaignData.variantA)}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Variant B Prompt */}
            <Card className="bg-gray-900/80 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    B
                  </div>
                  {campaignData.variantB.name} - Generated Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                    {generatePrompt(campaignData.variantB)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Launch Settings */}
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white">Ready to Launch</CardTitle>
              <CardDescription className="text-gray-300">
                Your campaign is configured and ready to start. You can launch
                it now or save as draft.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  onClick={onLaunchCampaign}
                  className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                >
                  🚀 Launch Campaign
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-800/50">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          disabled={!canProceed() || currentStep === 3}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

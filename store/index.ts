interface Variant {
  name: string;
  description: string;
  tone: string;
  approach: string;
}

interface ProductInfo {
  name: string;
  description: string;
  keyFeatures: string;
  targetAudience: string;
  pricing: string;
}

export interface Campaign {
  id: string; // Unique ID for each campaign
  type: "experiment" | "adaptive" | null;
  name: string;
  variantA: Variant;
  variantB: Variant;
  productInfo: ProductInfo;
  supportingFiles: File[];
}
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { Campaign } from "./types"; // import the interface above or place in same file

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  clearCampaigns: () => void;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set) => ({
      campaigns: [],
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [...state.campaigns, campaign],
        })),
      clearCampaigns: () => set({ campaigns: [] }),
    }),
    {
      name: "campaign-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
      // Optional: you can partialize to persist only part of the state
      // partialize: (state) => ({ campaigns: state.campaigns }),
    }
  )
);

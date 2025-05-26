import { CampaignStudio } from "@/components/campaign-studio";

export default function CampaignStudioPage({
  params,
}: {
  params: { id: string };
}) {
  return <CampaignStudio campaignId={params.id} />;
}

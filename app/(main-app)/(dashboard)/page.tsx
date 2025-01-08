import { fetchDashboardBossesInfo } from "@/app/lib/fetches/dashboard-fetches";
import Dashboard from "@/app/ui/dashboard/Dashboard";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  const bossesInfo = await fetchDashboardBossesInfo();

  return <MainAppWrapper page={<Dashboard bossesInfo={bossesInfo} />} />;
}

import { fetchBossesInfo } from "@/app/lib/fetches/bosses-fetches";
import Bosses from "@/app/ui/bosses/Bosses";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  const bossesInfo = await fetchBossesInfo();

  return <MainAppWrapper page={<Bosses bossesInfo={bossesInfo} />} />;
}

import DailiesWeeklies from "@/app/ui/dailies-weeklies/DailiesWeeklies";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  return <MainAppWrapper page={<DailiesWeeklies />} />;
}

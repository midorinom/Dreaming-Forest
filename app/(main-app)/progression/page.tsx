import Progression from "@/app/ui/progression/Progression";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  return <MainAppWrapper page={<Progression />} />;
}

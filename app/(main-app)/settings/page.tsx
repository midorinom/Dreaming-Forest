import Settings from "@/app/ui/settings/Settings";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  return <MainAppWrapper page={<Settings />} />;
}

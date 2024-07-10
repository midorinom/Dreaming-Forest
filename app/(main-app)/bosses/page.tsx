import Bosses from "@/app/ui/bosses/Bosses";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  return <MainAppWrapper page={<Bosses />} />;
}

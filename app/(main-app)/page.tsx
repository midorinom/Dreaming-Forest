import Dashboard from "@/app/ui/dashboard/Dashboard";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  return <MainAppWrapper page={<Dashboard />} />;
}

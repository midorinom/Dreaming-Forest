import MainApp from "@/app/ui/home/MainApp";
import DailiesWeeklies from "@/app/ui/dailies-weeklies/DailiesWeeklies";

export default async function Page() {
  return <MainApp pageComponent={<DailiesWeeklies />} />;
}

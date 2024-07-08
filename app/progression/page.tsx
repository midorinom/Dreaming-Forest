import MainApp from "@/app/ui/home/MainApp";
import Progression from "@/app/ui/progression/Progression";

export default async function Page() {
  return <MainApp pageComponent={<Progression />} />;
}

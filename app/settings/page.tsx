import MainApp from "@/app/ui/home/MainApp";
import Settings from "@/app/ui/settings/Settings";

export default async function Page() {
  return <MainApp pageComponent={<Settings />} />;
}

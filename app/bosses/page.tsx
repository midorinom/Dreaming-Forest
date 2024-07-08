import MainApp from "@/app/ui/home/MainApp";
import Bosses from "@/app/ui/bosses/Bosses";

export default async function Page() {
  return <MainApp pageComponent={<Bosses />} />;
}

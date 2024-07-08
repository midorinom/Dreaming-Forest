import MainApp from "@/app/ui/home/MainApp";
import Profile from "@/app/ui/profile/Profile";

export default async function Page() {
  return <MainApp pageComponent={<Profile />} />;
}

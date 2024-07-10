import Profile from "@/app/ui/profile/Profile";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  return <MainAppWrapper page={<Profile />} />;
}

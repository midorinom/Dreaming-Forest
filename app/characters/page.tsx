import MainApp from "@/app/ui/home/MainApp";
import Characters from "@/app/ui/characters/Characters";

export default async function Page() {
  return <MainApp pageComponent={<Characters />} />;
}

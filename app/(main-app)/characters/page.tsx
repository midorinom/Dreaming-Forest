import { fetchClasses } from "@/app/lib/fetches/general-fetches";
import Characters from "@/app/ui/characters/Characters";
import MainAppWrapper from "@/app/ui/general/MainAppWrapper";

export default async function Page() {
  const response = await Promise.all([
    fetchClasses("GMS"),
    fetchClasses("MSEA"),
  ]);

  const classes = {
    gms: response[0].map((p) => p.class_name),
    msea: response[1].map((p) => p.class_name),
  };

  return <MainAppWrapper page={<Characters classes={classes} />} />;
}

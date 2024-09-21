import { fetchClasses } from "@/app/lib/fetches/general-fetches";
import Welcome from "@/app/ui/welcome/Welcome";

export default async function Page() {
  const response = await Promise.all([
    fetchClasses("GMS"),
    fetchClasses("MSEA"),
  ]);

  const classes = {
    gms: response[0].map((p) => p.class_name),
    msea: response[1].map((p) => p.class_name),
  };

  return <Welcome classes={classes} />;
}

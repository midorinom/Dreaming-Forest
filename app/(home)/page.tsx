import Home from "@/app/ui/home/Home";
import { fetchClasses } from "@/app/lib/fetches/first-timer-fetches";

export default async function Page() {
  const response = await Promise.all([
    fetchClasses("GMS"),
    fetchClasses("MSEA"),
  ]);

  const classes = {
    gms: response[0].map((p) => p.class_name),
    msea: response[1].map((p) => p.class_name),
  };

  return <Home classes={classes} />;
}

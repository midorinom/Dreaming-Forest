import { Suspense } from "react";
import { fetchClasses } from "@/app/lib/fetches/first-timer-fetches";
import FirstTimer from "@/app/ui/home/first-timer/FirstTimer";
import Dashboard from "@/app/ui/home/dashboard/Dashboard";

export default async function Page() {
  let isLoggedIn = false;
  let localStorage = null;
  let firstTimer = false;

  if (!isLoggedIn && !localStorage) {
    firstTimer = true;
  }

  const response = await Promise.all([
    fetchClasses("GMS"),
    fetchClasses("MSEA"),
    console.log("fetched"),
  ]);

  const classes = {
    gms: response[0].map((p) => p.class_name),
    msea: response[1].map((p) => p.class_name),
  };

  return (
    <main className="bg-elodin_background bg-cover bg-center h-screen">
      <div className="flex flex-col items-center p-24">
        {firstTimer ? (
          <Suspense fallback={<div className="skeleton w-4/5"></div>}>
            <FirstTimer classes={classes} />
          </Suspense>
        ) : (
          <Dashboard />
        )}
      </div>
    </main>
  );
}

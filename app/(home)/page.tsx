import Dashboard from "@/app/ui/home/dashboard/Dashboard";
import FirstTimer from "@/app/ui/home/first-timer/FirstTimer";

export default function Page() {
  let isLoggedIn = false;
  let localStorage = null;
  let firstTimer = false;

  if (!isLoggedIn && !localStorage) {
    firstTimer = true;
    console.log("test");
  }

  return (
    <main className="bg-elodin_background bg-cover bg-center h-screen">
      <div className="flex flex-col items-center p-24">
        {firstTimer ? <FirstTimer /> : <Dashboard />}
      </div>
    </main>
  );
}

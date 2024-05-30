import Dashboard from "../ui/home/Dashboard/Dashboard";
import FirstTimer from "../ui/home/FirstTimer/FirstTimer";

export default function Page() {
  let isLoggedIn = false;
  let localStorage = null;
  let firstTimer = false;

  if (!isLoggedIn && !localStorage) {
    firstTimer = true;
  }

  return (
    <main className="bg-elodin_background bg-cover bg-center h-screen">
      <div className="flex flex-col items-center p-24">
        {firstTimer ? <FirstTimer /> : <Dashboard />}
      </div>
    </main>
  );
}

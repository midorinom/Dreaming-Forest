import "@/app/ui/globals.css";
import TopNav from "@/app/ui/general/TopNav";
import SideNav from "@/app/ui/general/SideNav";

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="grid grid-rows-[6vh_94vh] grid-cols-[4vw_1fr] bg-lucid_background bg-cover bg-center w-screen h-screen"
      data-theme="dreamy"
    >
      <TopNav />
      <SideNav />
      {children}
    </div>
  );
}

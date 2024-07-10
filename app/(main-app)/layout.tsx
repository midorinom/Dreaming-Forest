import "@/app/ui/globals.css";
import TopNav from "@/app/ui/general/TopNav";
import SideNav from "@/app/ui/general/SideNav";

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      <SideNav />
      {children}
    </>
  );
}

import FooterMenu from "@/_components/footer";
import Header from "@/_components/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto pt-18 pb-16">{children}</main>
      <FooterMenu />
    </div>
  );
}

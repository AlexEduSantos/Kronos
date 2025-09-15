import FooterMenu from "@/_components/menu";
import Header from "./_components/header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <FooterMenu />
    </>
  );
}

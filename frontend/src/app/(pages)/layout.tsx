import Header from "@/_components/header";
import FooterMenu from "@/_components/menu";

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

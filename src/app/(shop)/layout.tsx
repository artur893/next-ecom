import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen px-10 py-8">
      <Header />
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>
  );
}

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Notification from "../components/ui/Notification";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen px-10 py-8">
      <Header />
      <div className="mt-4"></div>
      <Navigation />
      <Notification />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import { Notification } from "@/components/ui";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen px-4 py-6 md:px-10 md:py-8">
      <Header />
      <div className="mt-4"></div>
      <Navigation />
      <Notification />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

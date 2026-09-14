import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen px-10 py-8">
      <Header />
      <div className="h-px w-full bg-neutral-700 my-10"></div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

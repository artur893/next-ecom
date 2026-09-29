import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Breadcrumb, ProfileCard, TransactionList } from "@/components/ui";
import { getOrders } from "@/data/getOrders";

export default async function Profile() {
  const [session, orders] = await Promise.all([
    getServerSession(authOptions),
    getOrders(),
  ]);

  const email = session?.user?.email ?? "";
  const name = session?.user?.name ?? email.split("@")[0];

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/home" }, { label: "Profile" }]}
      />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <ProfileCard name={name} email={email} />
        <TransactionList orders={orders} />
      </div>
    </div>
  );
}

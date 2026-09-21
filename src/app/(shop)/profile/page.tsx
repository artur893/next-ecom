import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  Breadcrumb,
  ProfileCard,
  TransactionList,
  TransactionEntry,
} from "@/app/components/ui";

const MOCK_TRANSACTIONS: TransactionEntry[] = [
  {
    id: 1,
    createdAt: "2022-09-24T18:31:00",
    invoiceNumber: "INV/208421205/TSR/3385-B54",
    productNames: ["Rexus Xierra X16"],
  },
  {
    id: 2,
    createdAt: "2022-09-24T18:31:00",
    invoiceNumber: "INV/208421205/TSR/3385-B54",
    productNames: ["Rexus Xierra X16"],
  },
];

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const name = session?.user?.name ?? email.split("@")[0];

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/home" }, { label: "Profile" }]}
      />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <ProfileCard name={name} email={email} />
        <TransactionList transactions={MOCK_TRANSACTIONS} />
      </div>
    </div>
  );
}

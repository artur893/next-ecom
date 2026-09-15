import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CartIcon from "../icons/CartIcon";
import Button from "../ui/Button";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const initial = session?.user?.email?.[0]?.toUpperCase();

  return (
    <header className="w-full flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-primary-500 text-heading-4 font-semibold">
          Devstock<span className="text-neutral-100">Hub</span>
        </h1>
      </Link>

      <div className="flex items-center">
        <CartIcon className="text-neutral-100 flex items-center justify-center mr-7" />
        {initial ? (
          <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-neutral-900 text-xs font-semibold">
            {initial}
          </div>
        ) : (
          <Link href="/login">
            <Button size="s">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

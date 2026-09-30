import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { countCartItems } from "@/lib/cart";
import { getCart } from "@/data/getCart";
import { Button, Logo } from "../ui";
import CartLink from "./CartLink";
import UserAvatarButton from "./UserAvatarButton";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const initial = session?.user?.email?.[0]?.toUpperCase();
  const cartCount = initial ? countCartItems(await getCart()) : 0;

  return (
    <header className="w-full flex justify-between items-center">
      <Link href="/home">
        <h1 className="text-heading-4 font-semibold">
          <Logo />
        </h1>
      </Link>

      <div className="flex items-center">
        {initial ? (
          <>
            <CartLink initialCount={cartCount} />
            <UserAvatarButton initial={initial} />
          </>
        ) : (
          <Link href="/login">
            <Button size="s" className="font-medium">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

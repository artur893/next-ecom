import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CartIcon } from "@/app/components/icons";
import { Button, Logo } from "../ui";
import UserAvatarButton from "./UserAvatarButton";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const initial = session?.user?.email?.[0]?.toUpperCase();

  return (
    <header className="w-full flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-heading-4 font-semibold">
          <Logo />
        </h1>
      </Link>

      <div className="flex items-center">
        {initial ? (
          <>
            <Link href="/cart" className="mr-7 flex items-center justify-center">
              <CartIcon className="text-neutral-100" />
            </Link>
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

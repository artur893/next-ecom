import Link from "next/link";
import CartIcon from "../icons/CartIcon";

export default function Header() {
  return (
    <header className="w-full flex justify-between">
      <Link href={"/"}>
        <h1 className="text-primary-500 text-3xl font-semibold">
          Devstock<span className="text-neutral-100">Hub</span>
        </h1>
      </Link>

      <div className="flex">
        <CartIcon className="text-neutral-100 flex items-center justify-center mr-7" />
        {/* placeholder poniżej! */}
        <div className="w-6 h-6 rounded-3xl bg-amber-400 flex items-center justify-center">
          U
        </div>
      </div>
    </header>
  );
}

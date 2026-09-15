import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import RegisterForm from "./RegisterForm";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h1 className="text-primary-500 text-heading-2 font-semibold mb-10">
        Devstock<span className="text-neutral-100">Hub</span>
      </h1>
      <RegisterForm />
    </div>
  );
}

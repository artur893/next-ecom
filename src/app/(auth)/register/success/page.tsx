"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SuccessCheck from "@/app/components/ui/SuccessCheck";

const REDIRECT_DELAY_MS = 5000;

export default function RegisterSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center text-center py-20">
      <SuccessCheck />
      <h1 className="text-heading-3 font-bold mt-6 mb-2">Thank you!</h1>
      <p className="text-heading-6 mb-6">You have succesfully register</p>
      <p className="text-paragraph-m text-neutral-300 max-w-md mb-4">
        Please check your e-mail for further information. Let&apos;s exploring
        our products and enjoy many gifts.
      </p>
      <p className="text-paragraph-m">
        Having problem? <span className="text-primary-500">Contact us</span>
      </p>
    </div>
  );
}

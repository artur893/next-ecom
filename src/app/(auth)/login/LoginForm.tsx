"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Checkbox from "@/app/components/ui/Checkbox";
import { OpenEyeIcon, ClosedEyeIcon } from "@/app/components/icons";
import { useNotification } from "@/app/components/providers/NotificationProvider";

type LoginFormValues = {
  identifier: string;
  password: string;
  savePassword: boolean;
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") === "password" ? "password" : "identifier";
  const [showPassword, setShowPassword] = useState(false);

  const [isSigningIn, setIsSigningIn] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "",
      password: "",
      savePassword: false,
    },
  });

  async function handleContinue() {
    const valid = await trigger("identifier");
    if (valid) router.push("/login?step=password");
  }

  async function onSubmit(data: LoginFormValues) {
    setIsSigningIn(true);
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });
    setIsSigningIn(false);

    if (!result || result.error) {
      showNotification("Incorrect email/phone or password.", "error");
      router.push("/login");
      return;
    }

    showNotification("Signed in successfully!");
    router.push("/home");
  }

  return (
    <section className="max-w-md w-full mx-auto bg-base-shark p-8 rounded-xl border border-gray-700">
      <h2 className="text-2xl mb-5">Sign in</h2>
      <div className="h-px w-full bg-neutral-700 mb-8"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && step === "identifier") {
            e.preventDefault();
            handleContinue();
          }
        }}
        noValidate
        className="space-y-6"
      >
        {step === "identifier" && (
          <>
            <Input
              label="Email or mobile phone number"
              placeholder="Email or Mobile phone Number"
              error={errors.identifier?.message}
              {...register("identifier", {
                required: "Please enter your email or phone number.",
              })}
            />

            <Button
              type="button"
              onClick={handleContinue}
              className="w-full text-base font-medium"
            >
              Continue
            </Button>

            <p className="text-paragraph-s text-neutral-300">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary-500">
                Register
              </Link>
            </p>
          </>
        )}

        {step === "password" && (
          <>
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Password"
              error={errors.password?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
                </button>
              }
              {...register("password", {
                required: "Please enter your password.",
              })}
            />

            <div className="flex items-center justify-between">
              <Checkbox label="Save password" {...register("savePassword")} />
              <span className="text-paragraph-s text-primary-500">
                Forgot your password?
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSigningIn}
              className="w-full text-base font-medium"
            >
              {isSigningIn ? "Signing in..." : "Sign In"}
            </Button>
          </>
        )}
      </form>
    </section>
  );
}

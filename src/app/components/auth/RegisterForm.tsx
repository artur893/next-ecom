"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, Checkbox } from "@/app/components/ui";
import { OpenEyeIcon, ClosedEyeIcon } from "@/app/components/icons";
import { useRouter } from "next/navigation";
import { useNotification } from "@/hooks/useNotification";
import { COUNTRIES } from "@/lib/countries";

type RegisterFormValues = {
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  country: string;
  accepted: boolean;
};

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      country: "Poland",
      accepted: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      showNotification(result.error ?? "Something went wrong", "error");
      return;
    }
    router.push("/register/success");
  }

  return (
    <section className="max-w-md mx-auto bg-base-shark p-8 rounded-xl border border-gray-700">
      <h2 className="text-2xl mb-5">Create Account</h2>
      <div className="h-px w-full bg-neutral-700 mb-8"></div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <Input
          type="email"
          label="Email"
          placeholder="Your Email"
          error={errors.email?.message}
          {...register("email", {
            required: "Please enter a valid email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
        />

        <Input
          type="tel"
          label="Mobile Number"
          placeholder="Mobile Number"
          error={errors.mobile?.message}
          {...register("mobile", {
            required: "Please enter your phone number.",
          })}
        />

        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          error={errors.password?.message}
          helperText="Password at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number."
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </button>
          }
          {...register("password", {
            required:
              "Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number.",
            pattern: {
              value: PASSWORD_RULE,
              message:
                "Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number.",
            },
          })}
        />

        <Input
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </button>
          }
          {...register("confirmPassword", {
            required: "Please enter confirm password.",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match.",
          })}
        />

        <Select label="Country or region" {...register("country")}>
          {COUNTRIES.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </Select>

        <Checkbox
          label={
            <>
              By creating an account and checking, you agree to the{" "}
              <span className="text-primary-500">Conditions of Use</span> and{" "}
              <span className="text-primary-500">Privacy Notice</span>.
            </>
          }
          error={errors.accepted?.message}
          {...register("accepted", {
            required: "You must accept the terms to continue.",
          })}
        />

        <Button type="submit" className="w-full text-base font-medium">
          Create Account
        </Button>
      </form>
    </section>
  );
}

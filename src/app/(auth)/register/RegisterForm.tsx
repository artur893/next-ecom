"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/app/components/ui/Button";
import { OpenEyeIcon, ClosedEyeIcon, CheckIcon } from "@/app/components/icons";

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
      country: "Indonesia",
      accepted: false,
    },
  });

  function onSubmit(data: RegisterFormValues) {
    console.log(data);
  }

  const inputClass = (hasError: boolean, withMargin = true) =>
    `w-full ${withMargin ? "mt-4" : ""} p-3 rounded-md bg-base-shark text-white border ${
      hasError ? "border-danger-500" : "border-gray-700"
    }`;

  return (
    <section className="max-w-md mx-auto bg-base-shark p-8 rounded-xl border border-gray-700">
      <h2 className="text-2xl mb-5">Create Account</h2>
      <div className="h-px w-full bg-neutral-700 mb-8"></div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <label className="text-lg">Email</label>
        <input
          type="email"
          placeholder="Your Email"
          className={`${inputClass(!!errors.email)} mb-1`}
          {...register("email", {
            required: "Please enter a valid email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
        />
        <p className="text-danger-500 text-xs mt-1 mb-6 min-h-4">
          {errors.email?.message}
        </p>

        {/* Mobile Number */}
        <label className="text-lg">Mobile Number</label>
        <input
          type="tel"
          placeholder="Mobile Number"
          className={`${inputClass(!!errors.mobile)} mb-1`}
          {...register("mobile", {
            required: "Please enter your phone number.",
          })}
        />
        <p className="text-danger-500 text-xs mt-1 mb-6 min-h-4">
          {errors.mobile?.message}
        </p>

        {/* Password */}
        <label className="text-lg">Password</label>
        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${inputClass(!!errors.password, false)} pr-12`}
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
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-neutral-300"
          >
            {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          </button>
        </div>
        <p className="text-danger-500 text-xs mt-1 mb-6">
          {errors.password?.message ?? (
            <span className="text-neutral-100">
              Password at least 8 characters and includes at least 1 upper case
              letter, 1 lower case letter and 1 number.
            </span>
          )}
        </p>

        {/* Confirm Password */}
        <label className="text-lg">Confirm Password</label>
        <div className="relative mt-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className={`${inputClass(!!errors.confirmPassword, false)} pr-12`}
            {...register("confirmPassword", {
              required: "Please enter confirm password.",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match.",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-neutral-300"
          >
            {showConfirmPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          </button>
        </div>
        <p className="text-danger-500 text-xs mt-1 mb-6 min-h-4">
          {errors.confirmPassword?.message}
        </p>

        {/* Country */}
        <label className="text-lg">Country or region</label>
        <select
          className={`${inputClass(false)} mb-6`}
          {...register("country")}
        >
          <option>Indonesia</option>
          <option>Poland</option>
          <option>Germany</option>
          <option>United Kingdom</option>
          <option>United States</option>
        </select>

        {/* Checkbox */}
        <label className="flex items-start gap-2 text-gray-300 text-sm mb-1">
          <div className="relative mt-1 h-5 w-5 shrink-0">
            <input
              type="checkbox"
              className="peer h-5 w-5 appearance-none rounded-md border border-gray-700 bg-base-shark checked:border-primary-500 checked:bg-primary-500"
              {...register("accepted", {
                required: "You must accept the terms to continue.",
              })}
            />
            <CheckIcon
              width={14}
              height={14}
              className="pointer-events-none absolute inset-0 m-auto hidden text-base-white peer-checked:block"
            />
          </div>
          <span className="text-neutral-100">
            By creating an account and checking, you agree to the{" "}
            <span className="text-primary-500">Conditions of Use</span> and{" "}
            <span className="text-primary-500">Privacy Notice</span>.
          </span>
        </label>
        <p className="text-danger-500 text-xs mt-1 mb-6 min-h-4">
          {errors.accepted?.message}
        </p>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full text-base-white text-base font-medium"
        >
          Create Account
        </Button>
      </form>
    </section>
  );
}

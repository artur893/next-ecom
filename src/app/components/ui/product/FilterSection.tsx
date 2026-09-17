"use client";
import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "@/app/components/icons";

export default function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between mb-4"
      >
        <h2 className="text-paragraph-l font-semibold">{title}</h2>
        <ChevronDownIcon
          width={18}
          height={18}
          className={`transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`}
        />
      </button>
      {isOpen && children}
    </div>
  );
}

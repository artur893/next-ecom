"use client";
import { useState } from "react";
import Select from "../basics/Select";
import Checkbox from "../basics/Checkbox";

type Tab = "existing" | "new";

const EXISTING_ADDRESS = {
  label: "Main Address",
  line: "Bangalau Road No 23, RT 4/RW 6, Kinajaya",
  country: "Indonesia",
  province: "Jakarta",
  city: "Jakarta",
  postalCode: "12819",
};

export default function AddressSection() {
  const [tab, setTab] = useState<Tab>("existing");

  return (
    <div>
      <h2 className="text-heading-6 font-medium text-[#FCFCFC]">Address</h2>

      <div className="mt-4 rounded-md border border-gray-800 bg-neutral-900 p-6">
        <div className="flex gap-8 border-b border-gray-800">
          <button
            type="button"
            onClick={() => setTab("existing")}
            className={`-mb-px border-b-2 pb-4 text-paragraph-l font-medium ${
              tab === "existing"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-neutral-400"
            }`}
          >
            Existing Address
          </button>
          <button
            type="button"
            onClick={() => setTab("new")}
            className={`-mb-px border-b-2 pb-4 text-paragraph-l font-medium ${
              tab === "new"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-neutral-400"
            }`}
          >
            New Address
          </button>
        </div>

        {tab === "existing" ? (
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <span className="text-paragraph-m text-neutral-300">
                Address
              </span>
              <span className="rounded bg-primary-500 px-2 py-1 text-paragraph-xs font-medium text-primary-100">
                {EXISTING_ADDRESS.label}
              </span>
            </div>
            <p className="mt-3 text-paragraph-l font-medium text-[#FCFCFC]">
              {EXISTING_ADDRESS.line}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <AddressField label="Country" value={EXISTING_ADDRESS.country} />
              <AddressField
                label="Province"
                value={EXISTING_ADDRESS.province}
              />
              <AddressField label="City" value={EXISTING_ADDRESS.city} />
              <AddressField
                label="Postal Code"
                value={EXISTING_ADDRESS.postalCode}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select defaultValue="Indonesia">
                <option value="Indonesia">Indonesia</option>
              </Select>
              <Select defaultValue="">
                <option value="" disabled>
                  Province
                </option>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select defaultValue="">
                <option value="" disabled>
                  City
                </option>
              </Select>
              <Select defaultValue="">
                <option value="" disabled>
                  Postal Code
                </option>
              </Select>
            </div>
            <textarea
              placeholder="Input Complete Address"
              rows={4}
              className="w-full resize-none rounded-md border border-gray-700 bg-base-shark p-3 text-white placeholder:text-neutral-400"
            />
            <Checkbox label="Make it the main address" defaultChecked />
          </div>
        )}
      </div>
    </div>
  );
}

function AddressField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-paragraph-s text-neutral-400">{label}</span>
      <p className="mt-1 text-paragraph-m font-medium text-[#FCFCFC]">
        {value}
      </p>
    </div>
  );
}

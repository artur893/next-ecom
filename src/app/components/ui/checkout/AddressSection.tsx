"use client";
import { FormEvent, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { Address } from "@/lib/types/address";
import { useSaveAddress } from "@/hooks/useSaveAddress";
import { useSetMainAddress } from "@/hooks/useSetMainAddress";
import { useRemoveAddress } from "@/hooks/useRemoveAddress";
import { CloseIcon } from "@/app/components/icons";
import Select from "../basics/Select";
import Input from "../basics/Input";
import Checkbox from "../basics/Checkbox";
import Button from "../basics/Button";

type Tab = "existing" | "new";

const EMPTY_FORM = {
  country: COUNTRIES[0],
  province: "",
  city: "",
  postalCode: "",
  line: "",
};

export default function AddressSection({
  addresses: initialAddresses,
}: {
  addresses: Address[];
}) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [tab, setTab] = useState<Tab>(
    initialAddresses.length > 0 ? "existing" : "new",
  );
  const [form, setForm] = useState(EMPTY_FORM);
  const [isMain, setIsMain] = useState(addresses.length === 0);
  const [saving, setSaving] = useState(false);
  const saveAddress = useSaveAddress();
  const setMainAddress = useSetMainAddress();
  const removeAddress = useRemoveAddress();

  async function handleSetMain(addressId: number) {
    const ok = await setMainAddress(addressId);
    if (!ok) return;

    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isMain: a.id === addressId })),
    );
  }

  async function handleRemove(addressId: number) {
    const ok = await removeAddress(addressId);
    if (!ok) return;

    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);

    const created = await saveAddress({ ...form, isMain });

    setSaving(false);
    if (!created) return;

    setAddresses((prev) =>
      isMain
        ? [...prev.map((a) => ({ ...a, isMain: false })), created]
        : [...prev, created],
    );
    setForm(EMPTY_FORM);
    setTab("existing");
  }

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
          addresses.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {addresses.map((address, index) => (
                <div key={address.id}>
                  {index > 0 && <div className="mb-6 border-t border-gray-800" />}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-paragraph-m text-neutral-300">
                        Address
                      </span>
                      {address.isMain && (
                        <span className="rounded bg-primary-500 px-2 py-1 text-paragraph-xs font-medium text-primary-100">
                          Main Address
                        </span>
                      )}
                    </div>
                    {!address.isMain && (
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleSetMain(address.id)}
                          className="text-paragraph-s font-medium text-primary-500"
                        >
                          Set as main
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(address.id)}
                          aria-label="Remove address"
                          className="text-danger-500"
                        >
                          <CloseIcon width={18} height={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-paragraph-l font-medium text-[#FCFCFC]">
                    {address.line}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    <AddressField label="Country" value={address.country} />
                    <AddressField label="Province" value={address.province} />
                    <AddressField label="City" value={address.city} />
                    <AddressField
                      label="Postal Code"
                      value={address.postalCode}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-paragraph-m text-neutral-400">
              You don&apos;t have any saved addresses yet.
            </p>
          )
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                value={form.country}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, country: e.target.value }))
                }
              >
                {COUNTRIES.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </Select>
              <Input
                placeholder="Province"
                required
                value={form.province}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, province: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                placeholder="City"
                required
                value={form.city}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, city: e.target.value }))
                }
              />
              <Input
                placeholder="Postal Code"
                required
                value={form.postalCode}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, postalCode: e.target.value }))
                }
              />
            </div>
            <Input
              placeholder="Street"
              required
              value={form.line}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, line: e.target.value }))
              }
            />
            <Checkbox
              label="Make it the main address"
              checked={isMain}
              onChange={(e) => setIsMain(e.target.checked)}
            />
            <Button type="submit" disabled={saving} className="w-fit">
              {saving ? "Saving..." : "Save Address"}
            </Button>
          </form>
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

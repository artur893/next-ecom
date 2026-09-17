"use client";
import Select from "../basics/Select";
import { SORT_LABELS } from "@/lib/productSort";
import { useProductFilters } from "@/hooks/useProductFilters";

const SHOW_OPTIONS = [6, 9, 12, 24];

export default function SortAndShowControls() {
  const { searchParams, updateParams } = useProductFilters();
  const sort = searchParams.get("sort") ?? "recent";
  const limit = searchParams.get("limit") ?? "9";

  return (
    <div className="flex flex-col items-center gap-6 mb-8 sm:flex-row sm:justify-center lg:justify-start">
      <div className="flex items-center gap-3">
        <span className="text-paragraph-m font-semibold">Sort by</span>
        <Select
          className="w-44"
          value={sort}
          onChange={(event) =>
            updateParams({ sort: event.target.value, page: null })
          }
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-paragraph-m font-semibold">Show</span>
        <Select
          className="w-20"
          value={limit}
          onChange={(event) =>
            updateParams({ limit: event.target.value, page: null })
          }
        >
          {SHOW_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

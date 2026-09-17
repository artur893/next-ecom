"use client";
import { FocusEvent } from "react";
import Checkbox from "../basics/Checkbox";
import Input from "../basics/Input";
import FilterSection from "./FilterSection";
import { useProductFilters } from "@/hooks/useProductFilters";

interface CategoryPriceFiltersProps {
  categories: { id: number; name: string }[];
}

export default function CategoryPriceFilters({
  categories,
}: CategoryPriceFiltersProps) {
  const { searchParams, updateParams } = useProductFilters();
  const activeCategory = searchParams.get("category");

  function handleCategoryChange(id: number | null) {
    updateParams({ category: id ? String(id) : null, page: null });
  }

  function handleMinPriceBlur(event: FocusEvent<HTMLInputElement>) {
    updateParams({ minPrice: event.target.value || null, page: null });
  }

  function handleMaxPriceBlur(event: FocusEvent<HTMLInputElement>) {
    updateParams({ maxPrice: event.target.value || null, page: null });
  }

  const numberInputClassName =
    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  return (
    <>
      <div className="pb-6 mb-6">
        <FilterSection title="Category">
          <div className="flex flex-col gap-3">
            <Checkbox
              label="All"
              checked={!activeCategory}
              onChange={() => handleCategoryChange(null)}
            />
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                label={category.name}
                checked={activeCategory === String(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      <FilterSection title="Price">
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            min={0}
            step="0.01"
            placeholder="Min Price"
            defaultValue={searchParams.get("minPrice") ?? ""}
            onBlur={handleMinPriceBlur}
            className={numberInputClassName}
            rightIcon={
              <span className="flex items-center gap-1 text-paragraph-s">
                USD
              </span>
            }
          />
          <Input
            type="number"
            min={0}
            step="0.01"
            placeholder="Max Price"
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onBlur={handleMaxPriceBlur}
            className={numberInputClassName}
            rightIcon={
              <span className="flex items-center gap-1 text-paragraph-s">
                USD
              </span>
            }
          />
        </div>
      </FilterSection>
    </>
  );
}

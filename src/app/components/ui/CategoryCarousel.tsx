"use client";
import Button from "./Button";
import Image from "next/image";
import RightArrowIcon from "../icons/RightArrow";
import UpArrowIcon from "../icons/UpArrowIcon";
import { Category } from "@prisma/client";
import { useState } from "react";

interface CategoryProps {
  categories: Category[];
}

export default function CategoryCarousel({ categories }: CategoryProps) {
  console.log(categories);
  const lastPage = categories.length - 1;
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () =>
    currentPage === lastPage
      ? setCurrentPage(0)
      : setCurrentPage((prev) => prev + 1);

  const handlePrevious = () =>
    currentPage === 0
      ? setCurrentPage(lastPage)
      : setCurrentPage((prev) => prev - 1);

  return (
    <div className="flex justify-between items-center h-113 border border-gray-800 bg-gray-900 rounded-md overflow-hidden">
      <Button
        onClick={handlePrevious}
        className="rotate-270 origin-top-left translate-y-12 rounded-t-none"
      >
        <UpArrowIcon className="stroke-neutral-900" />
      </Button>
      <div className="w-1/4">
        <h2 className="text-[32px] font-semibold leading-11 mb-6">
          {categories[currentPage].name}
        </h2>
        <p className="leading-6.5 mb-10">
          Explore our diverse selection of electronic mice for sale, featuring
          cutting-edge technology, ergonomic designs, and unbeatable prices.
          Shop now!
        </p>
        <Button variant="outline" rightIcon={<RightArrowIcon />}>
          Explore Category
        </Button>
      </div>
      {categories[currentPage].image && (
        <div
          className={`${currentPage === 0 ? "relative w-1/2 h-[300%]" : "relative h-full w-1/2"}`}
        >
          <Image
            src={categories[currentPage].image}
            alt={categories[currentPage].name}
            fill
            loading="eager"
            sizes="50vw"
            className={`${currentPage === 0 ? "rotate-326 object-cover scale-62 -translate-y-15 overflow-visible" : "object-contain"} `}
          />
        </div>
      )}
      <Button
        onClick={handleNext}
        className="rotate-90 origin-top-right translate-y-12 rounded-t-none"
      >
        <UpArrowIcon className="stroke-neutral-900" />
      </Button>
    </div>
  );
}

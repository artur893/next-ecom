"use client";
import Button from "../basics/Button";
import Image from "next/image";
import { RightArrowIcon, ChevronRightIcon } from "@/app/components/icons";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";

const AUTOPLAY_INTERVAL_MS = 5000;

interface CategoryProps {
  categories: Category[];
}

function CategoryDots({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  const dots = [];
  for (let i = 0; i < totalPages; i++) {
    dots.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`w-3 h-3 rounded-full mx-1.5 cursor-pointer ${
          i === currentPage ? "bg-primary-500" : "bg-gray-800"
        }`}
      ></button>,
    );
  }
  return <div className="flex justify-center my-4">{dots}</div>;
}

export default function CategoryCarousel({ categories }: CategoryProps) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev === lastPage ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [currentPage, lastPage]);

  return (
    <>
      <div className="flex justify-between items-center h-113 border border-gray-800 bg-gray-900 rounded-md overflow-hidden">
        <button
          onClick={handlePrevious}
          className="rotate-180 flex items-center justify-center w-11 h-18.5 py-1 px-1.75 rounded-l-md bg-primary-500 hover:bg-primary-600 active:bg-primary-600 transition-colors duration-200 cursor-pointer"
        >
          <ChevronRightIcon className="stroke-neutral-900" />
        </button>
        <div className="w-1/4">
          <h2 className="text-heading-3 font-semibold mb-6">
            {categories[currentPage].name}
          </h2>
          <p className="text-paragraph-m mb-10">
            {categories[currentPage].description}
          </p>
          <Button variant="outline" rightIcon={<RightArrowIcon />}>
            Explore Category
          </Button>
        </div>
        {categories[currentPage].image && (
          <div
            key={categories[currentPage].id}
            className={`${categories[currentPage].name === "Mouse" ? "relative w-1/2 h-[300%]" : "relative h-full w-1/2"}`}
          >
            <Image
              src={categories[currentPage].image}
              alt={categories[currentPage].name}
              fill
              loading="eager"
              sizes="50vw"
              className={`${categories[currentPage].name === "Mouse" ? "rotate-326 object-cover scale-62 -translate-y-15 overflow-visible" : "object-contain"} `}
            />
          </div>
        )}
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-11 h-18.5 py-1 px-1.75 rounded-l-md bg-primary-500 hover:bg-primary-600 active:bg-primary-600 transition-colors duration-200 cursor-pointer"
        >
          <ChevronRightIcon className="stroke-neutral-900" />
        </button>
      </div>
      <CategoryDots
        currentPage={currentPage}
        totalPages={categories.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

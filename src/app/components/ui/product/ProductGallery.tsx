"use client";
import { MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import Image from "next/image";
import ProductImageFrame from "./ProductImageFrame";

const DRAG_THRESHOLD_PX = 5;

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  const activeImage = images[selected];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isPointerDownRef = useRef(false);
  const didDragRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  function handleWindowMouseMove(event: MouseEvent) {
    const el = scrollRef.current;
    if (!el || !isPointerDownRef.current) return;

    const delta = event.pageX - startXRef.current;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) {
      didDragRef.current = true;
    }
    el.scrollLeft = startScrollLeftRef.current - delta;
  }

  function handleWindowMouseUp() {
    isPointerDownRef.current = false;
    setIsDragging(false);
    window.removeEventListener("mousemove", handleWindowMouseMove);
    window.removeEventListener("mouseup", handleWindowMouseUp);
  }

  function handleMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    event.preventDefault();
    isPointerDownRef.current = true;
    didDragRef.current = false;
    startXRef.current = event.pageX;
    startScrollLeftRef.current = el.scrollLeft;
    setIsDragging(true);
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
  }

  function handleClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return (
    <div className="w-full shrink-0 md:w-105.5">
      <ProductImageFrame
        src={activeImage}
        alt={name}
        sizes="398px"
        className="aspect-422/341 w-full md:h-85.25 md:w-105.5"
      />
      {images.length > 1 && (
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onClickCapture={handleClickCapture}
          className={`scrollbar-hide mt-4 flex select-none gap-3 overflow-x-auto ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelected(index)}
              className={`relative h-24.75 w-32.5 shrink-0 rounded-md bg-base-white ${
                index === selected
                  ? "border-2 border-primary-500"
                  : "border-2 border-gray-800"
              }`}
            >
              <Image
                src={image}
                alt={`${name} ${index + 1}`}
                fill
                sizes="130px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

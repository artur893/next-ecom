"use client";
import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { RightArrowIcon } from "@/app/components/icons";

interface HorizontalScrollSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DRAG_THRESHOLD_PX = 5;

export default function HorizontalScrollSection({
  title,
  children,
  className = "mt-20",
}: HorizontalScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isPointerDownRef = useRef(false);
  const didDragRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () =>
      setHasOverflow(el.scrollWidth > el.clientWidth + 1);

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  function handleSeeAll() {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  }

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
    <section className={className}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-heading-6 font-medium lg:text-heading-5 xl:text-heading-4">
          {title}
        </h2>
        {hasOverflow && (
          <button
            type="button"
            onClick={handleSeeAll}
            className="flex items-center gap-2 text-paragraph-s text-primary-500"
          >
            See All
            <RightArrowIcon width={16} height={16} />
          </button>
        )}
      </div>
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        className={`scrollbar-hide flex select-none gap-6 overflow-x-auto pb-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

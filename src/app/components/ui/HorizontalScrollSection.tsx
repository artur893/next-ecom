"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { RightArrowIcon } from "@/app/components/icons";

interface HorizontalScrollSectionProps {
  title: string;
  children: ReactNode;
}

export default function HorizontalScrollSection({
  title,
  children,
}: HorizontalScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

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

  return (
    <section className="mt-20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-heading-5 font-semibold">{title}</h2>
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
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-2">
        {children}
      </div>
    </section>
  );
}

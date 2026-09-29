"use client";
import { useEffect, useRef, useState } from "react";

export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    const checkTruncation = () =>
      setIsTruncated(el.scrollHeight > el.clientHeight);

    checkTruncation();
    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded, description]);

  return (
    <div className="w-full">
      <p
        ref={textRef}
        className={`text-paragraph-m font-normal text-[#FCFCFC] ${
          expanded ? "" : "line-clamp-1"
        }`}
      >
        {description}
      </p>
      {(isTruncated || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-1 text-paragraph-m font-medium text-primary-500"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}

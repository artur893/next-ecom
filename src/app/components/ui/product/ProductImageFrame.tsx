import Image from "next/image";

export default function ProductImageFrame({
  src,
  alt,
  sizes,
  className = "",
  innerClassName = "p-3",
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`rounded-md border border-gray-800 bg-neutral-900 p-3 ${className}`}
    >
      <div className={`h-full w-full rounded-md bg-base-white ${innerClassName}`}>
        <div className="relative h-full w-full">
          {src && (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}

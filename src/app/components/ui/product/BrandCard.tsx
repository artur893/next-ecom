export default function BrandCard({ name }: { name: string }) {
  return (
    <div className="flex h-30 w-38 shrink-0 flex-col items-center justify-center gap-3 rounded-md border border-gray-800 bg-neutral-900">
      <span className="text-heading-6 font-semibold">{name}</span>
    </div>
  );
}

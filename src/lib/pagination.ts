export type PageEntry = number | "ellipsis";

export function getPageNumbers(current: number, total: number): PageEntry[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const keep = new Set(
    [1, 2, 3, total - 2, total - 1, total, current].filter(
      (page) => page >= 1 && page <= total,
    ),
  );
  const sorted = [...keep].sort((a, b) => a - b);

  const result: PageEntry[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push("ellipsis");
    result.push(page);
    previous = page;
  }
  return result;
}

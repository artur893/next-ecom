export function buildProductFilterParams(
  params: Record<string, string | undefined>,
): URLSearchParams {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.minPrice) query.set("minPrice", params.minPrice);
  if (params.maxPrice) query.set("maxPrice", params.maxPrice);
  if (params.sort) query.set("sort", params.sort);
  return query;
}

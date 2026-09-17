import "server-only";
import { cookies, headers } from "next/headers";

/**
 * Self-fetch helper for Server Components calling this app's own API routes.
 * A server-side `fetch()` has no browser context, so it needs an absolute
 * URL and has to manually forward the session cookie (the middleware that
 * protects /api/* routes only sees cookies that are explicitly attached).
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const host = headerList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  const response = await fetch(`${protocol}://${host}${path}`, {
    ...init,
    headers: {
      cookie: cookieHeader,
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request to ${path} failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

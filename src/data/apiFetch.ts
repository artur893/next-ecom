import "server-only";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`API request to ${path} failed with ${status}`);
    this.name = "ApiError";
  }
}

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
    throw new ApiError(response.status, path);
  }

  return response.json() as Promise<T>;
}

/**
 * Like `apiFetch`, but renders the 404 page when the resource does not exist.
 * Any other failure is rethrown so a broken API surfaces as an error instead
 * of pretending the resource is missing.
 */
export async function apiFetchOrNotFound<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  try {
    return await apiFetch<T>(path, init);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}

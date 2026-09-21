import { NextResponse } from "next/server";

/**
 * Wraps a route handler so an unexpected throw becomes a JSON 500 instead of
 * Next.js' HTML error page — clients parse `error` from the body, so an
 * HTML response would fail again on `response.json()`.
 */
export function withErrorHandling<TArgs extends unknown[]>(
  handler: (...args: TArgs) => Promise<Response>,
) {
  return async (...args: TArgs): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    }
  };
}

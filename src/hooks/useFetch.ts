import { useEffect, useState } from "react";
import type { AsyncState } from "../types/api";

export function useFetch<T>(url: string | null): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "idle" });

  useEffect(() => {
    if (!url) {
      setState({ status: "idle" });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json() as Promise<T>;
      })
      .then((data) => {
        setState({ status: "success", data });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") {

          return;
        }
        const message = err instanceof Error ? err.message : "Unknown error";
        setState({ status: "error", error: message });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

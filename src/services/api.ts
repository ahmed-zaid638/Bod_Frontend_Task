const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  };

  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      const message = await res.text();
      throw new Error(
        `API Error: ${res.status} ${res.statusText} – ${message || "Unknown"}`
      );
    }
    return res.json() as Promise<T>;
  } catch (err) {
    throw err;
  }
}

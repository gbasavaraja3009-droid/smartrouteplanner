export interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

export async function searchLocation(query: string): Promise<LocationResult[]> {
  if (!query.trim()) return [];

  const response = await fetch(
    `http://localhost:5000/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
}
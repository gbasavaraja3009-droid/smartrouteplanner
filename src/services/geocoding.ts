export interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

export async function searchLocation(query: string): Promise<LocationResult[]> {
  if (!query.trim()) return [];

  const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
  {
    headers: {
      Accept: "application/json",
    },
  }
);

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
}
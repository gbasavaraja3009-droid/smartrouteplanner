export async function getNearestAirport(lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
  console.log("API KEY =", apiKey);

  const url =
    `https://api.geoapify.com/v2/places?` +
    `categories=airport` +
    `&filter=circle:${lon},${lat},50000` +
    `&limit=1` +
    `&apiKey=${apiKey}`;

  try {
    console.log("Request URL =", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch airport");
    }

    const data = await response.json();

console.log("Airport API Response:", data);

    if (!data.features || data.features.length === 0) {
      return {
        name: "Nearest Airport",
        lat,
        lon,
      };
    }

    const airport = data.features[0];
    console.log("Selected Airport:", airport);

    return {
      name: airport.properties.name || "Nearest Airport",
      lat: airport.properties.lat,
      lon: airport.properties.lon,
    };
  } catch (error) {
    console.error(error);

    return {
      name: "Nearest Airport",
      lat,
      lon,
    };
  }
}
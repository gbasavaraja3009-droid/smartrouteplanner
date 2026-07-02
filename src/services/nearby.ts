const API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;


function getQuery(category: string) {
  switch (category) {
    case "Fuel":
      return "fuel station";

    case "Restaurant":
      return "restaurant";

    case "Hotel":
      return "hotel";

    case "Tourist":
      return "tourist attraction";

    default:
      return "fuel station";
  }
}

export async function getNearbyPlaces(
  lat: number,
  lon: number,
  category: string = "Fuel"
) {
 
  try {  
    const query = getQuery(category);
  const url =
  `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json` +
  `?lat=${lat}` +
  `&lon=${lon}` +
  `&radius=10000` +
  `&limit=25` +
  `&key=${API_KEY}`;
    const response = await fetch(url);
    console.log("Category:", category);
console.log("URL:", url)

    if (!response.ok) {
      console.error("TomTom Search Error:", response.status);
      return [];
    }

    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((place: any) => ({
      name: place.poi?.name || "Unknown",

      type:
        category === "Fuel"
          ? "Petrol Pump"
          : category === "Restaurant"
          ? "Restaurant"
          : category === "Hotel"
          ? "Hotel"
          : "Tourist Place",

      lat: place.position.lat,

      lon: place.position.lon,

      address: place.address?.freeformAddress || "",

      distance: (
        (place.dist || 0) / 1000
      ).toFixed(2),
    }));
  } catch (error) {
    console.error("Nearby Places Error:", error);
    return [];
  }
}
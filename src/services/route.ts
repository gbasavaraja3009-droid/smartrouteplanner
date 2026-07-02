export async function getRoute(
  sourceLat: number,
  sourceLon: number,
  destinationLat: number,
  destinationLon: number
) {
  try {
    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_ORS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [
            [sourceLon, sourceLat],
            [destinationLon, destinationLat],
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("========== ROUTE API ==========");
    console.log("HTTP Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
      throw new Error(
        data.error?.message ||
        data.error ||
        "Unable to fetch route."
      );
    }

    return data;
  } catch (error) {
    console.error("Route API Error:", error);

    return {
      features: [],
    };
  }
}
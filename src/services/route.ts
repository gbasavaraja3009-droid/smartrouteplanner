const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY1NDg1MjBjN2Y3NzQzZTY4ZThjYTcyODYzMTViODQyIiwiaCI6Im11cm11cjY0In0=";

export async function getRoute(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
) {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [startLon, startLat],
          [endLon, endLat],
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Route API failed");
  }

  return await response.json();
}
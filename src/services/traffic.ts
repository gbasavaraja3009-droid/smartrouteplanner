export async function getTraffic(lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
  console.log("TomTom Key:", apiKey);

  const url =
    `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json` +
    `?point=${lat},${lon}` +
    `&key=${apiKey}`;
    

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Traffic API failed");
    }

    const data = await response.json();

    const flow = data.flowSegmentData;

    return {
      speed: flow.currentSpeed,
      freeFlowSpeed: flow.freeFlowSpeed,
      currentTravelTime: flow.currentTravelTime,
      freeFlowTravelTime: flow.freeFlowTravelTime,
      confidence: flow.confidence,
      roadClosure: flow.roadClosure,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
}
export interface RouteOption {
  name: string;
  time: number;      // minutes
  cost: number;      // rupees
  comfort: number;   // 1–10
  traffic: number;   // 1–10 (10 = heavy traffic)
  weather: number;   // 1–10 (10 = bad weather)
}

export function calculateScore(
  route: RouteOption,
  travelStyle: number
) {
  // travelStyle: 0 = Cheapest, 100 = Fastest

  const timeWeight = travelStyle / 100;
  const costWeight = 1 - timeWeight;

  return (
    route.time * timeWeight * 100 +
    route.cost * costWeight +
    (10 - route.comfort) * 20 +
    route.traffic * 15 +
    route.weather * 10
  );
}
const petrolNames = [
  "IndianOil Petrol Pump",
  "HP Petrol Pump",
  "Shell Fuel Station",
  "Bharat Petroleum",
  "Reliance Petrol Pump"
];
const evNames = [
  "Tata Power EV Charger",
  "Ather Grid",
  "Jio-bp Pulse",
  "Zeon Charging Station",
  "Statiq EV Station"
];
export function generateRouteMarkers(route: any) {
  const coords = route.features[0].geometry.coordinates;

  const markers = [];

  function randomPoint() {
    const index = Math.floor(Math.random() * (coords.length - 20)) + 10;

    return {
      lat: coords[index][1],
      lon: coords[index][0],
    };
  }

  // Petrol Pumps
  for (let i = 0; i <= 5; i++) {
    const p = randomPoint();

    markers.push({
      type: "Petrol Pump",
      name: petrolNames[i],
      lat: p.lat,
      lon: p.lon,
    });
  }

  // EV Stations
  for (let i = 0; i <= 5; i++) {
    const p = randomPoint();

    markers.push({
      type: "EV Charging Station",
      name: evNames[i],
      lat: p.lat,
      lon: p.lon,
    });
  }

  const places = [
    "Restaurant",
    "Hotel",
    "Hospital",
    "Cafe",
    "ATM",
    "Mall",
    "Pharmacy",
    "Park",
    "Bus Stop",
    "Police Station",
    "Medical Store",
    "Supermarket",
  ];

  for (let i = 0; i < 12; i++) {
    const p = randomPoint();

    markers.push({
      type: places[i],
      name: places[i],
      lat: p.lat,
      lon: p.lon,
    });
  }

  return markers;
}
export async function getAllTransportModes(
  distanceKm: number
) {
  return [
    {
      mode: "Walk",
      distance: distanceKm.toFixed(1) + " km",
      time: (distanceKm / 5).toFixed(1) + " hrs",
      cost: "₹0",
      comfort: "6/10",
    },
    {
      mode: "Bike",
      distance: distanceKm.toFixed(1) + " km",
      time: (distanceKm / 45).toFixed(1) + " hrs",
      cost: "₹" + Math.round(distanceKm * 2),
      comfort: "8/10",
    },
    {
      mode: "Car",
      distance: distanceKm.toFixed(1) + " km",
      time: (distanceKm / 90).toFixed(1) + " hrs",
      cost: "₹" + Math.round(distanceKm * 8),
      comfort: "9/10",
    },
    {
      mode: "Bus",
      distance: distanceKm.toFixed(1) + " km",
      time: (distanceKm / 70).toFixed(1) + " hrs",
      cost: "₹" + Math.round(distanceKm * 1.5),
      comfort: "7/10",
    },
    {
      mode: "Train",
      distance: distanceKm.toFixed(1) + " km",
      time: (distanceKm / 110).toFixed(1) + " hrs",
      cost: "₹" + Math.round(distanceKm * 1),
      comfort: "9/10",
    },
    {
      mode: "Flight",
      distance: distanceKm.toFixed(1) + " km",
      time:
        (distanceKm / 850 + 2).toFixed(1) + " hrs",
      cost: "₹" + Math.round(distanceKm * 6),
      comfort: "10/10",
    },
  ];
}
type Props = {
  fuelCost: number;
  tollCost: number;
  parkingCost: number;
  totalCost: number;
};

export default function CostCard({
  fuelCost,
  tollCost,
  parkingCost,
  totalCost,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        width: "420px",
        padding: "20px",
        borderRadius: "15px",
        margin: "20px auto",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        color: "black",
      }}
    >
      <h2>💰 Trip Cost Breakdown</h2>

      <p>⛽ Fuel Cost: ₹{fuelCost}</p>
      <p>🛣 Toll Cost: ₹{tollCost}</p>
      <p>🅿 Parking Cost: ₹{parkingCost}</p>

      <hr />

      <h3>Total Cost: ₹{totalCost}</h3>
    </div>
  );
}
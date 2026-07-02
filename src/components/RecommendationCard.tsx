type Props = {
  bestRoute: any;
};

export default function RecommendationCard({ bestRoute }: Props) {
  if (!bestRoute) return null;

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        width: "450px",
        padding: "20px",
        borderRadius: "15px",
        margin: "20px auto",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      }}
    >
      <h2>🏆 AI Best Transport</h2>

      <h3>{bestRoute.name}</h3>

      <p>⏱ Time: {bestRoute.time} min</p>

      <p>💰 Cost: ₹{Math.round(bestRoute.cost)}</p>

      <p>⭐ Comfort: {bestRoute.comfort}/10</p>

      <p>🚦 Traffic: {bestRoute.traffic}/10</p>

      <p>🌤 Weather: {bestRoute.weather}/10</p>

      <hr />

      <p>
        <b>Reason:</b> This transport mode gives the best overall balance of
        time, cost, comfort and traffic.
      </p>
    </div>
  );
}
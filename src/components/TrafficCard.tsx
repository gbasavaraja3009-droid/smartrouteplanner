type Props = {
  traffic: any;
};

export default function TrafficCard({ traffic }: Props) {
  if (!traffic) return null;

  return (
  <div id="traffic"
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
    <h2>🚦 Live Traffic</h2>

    <h3>{traffic.route}</h3>

    <p>🚗 Congestion: {traffic.congestion}%</p>
    <p>⏱ Delay: {traffic.delay} min</p>
    <p>⚡ Average Speed: {traffic.speed} km/h</p>
    <p>🟢 Status: {traffic.status}</p>
  </div>
);
}
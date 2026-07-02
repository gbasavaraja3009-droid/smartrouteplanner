type Props = {
    title:string;
  weather: any;
};

export default function WeatherCard({ title, weather }: Props) {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
  id="weather"
  style={{
    background: "white",
    color: "black",      // ← ADD THIS
    width: "420px",
    padding: "20px",
    borderRadius: "15px",
    margin: "20px auto",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    textAlign:"center",
  }}
>
      <h2 style={{ color: "#0f172a", marginBottom: "15px" }}>
  🌤 {title}
</h2>
     <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>
  {weather.name}
</h3>

      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>🤗 Feels Like: {weather.main.feels_like}°C</p>
      <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
  alt="Weather"
  style={{
    width: "100px",
    height: "100px",
    margin: "10px auto",
    display: "block",
  }}
/>
      

<p><strong>Condition:</strong> {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>👁 Visibility: {weather.visibility / 1000} km</p>
      <p>🌅 Sunrise: {sunrise}</p>
      <p>🌇 Sunset: {sunset}</p>
    </div>
  );
}
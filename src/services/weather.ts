

const API_KEY = "3eb87ce030091a45f2197690b236f74e"

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();

  return {
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    city: data.name,
  };
}
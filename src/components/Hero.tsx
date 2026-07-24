import { useState, useEffect } from "react";

import PlannerSidebar from "./PlannerSidebar";
import RouteMap from "./RouteMap";
import PlacesSidebar from "./PlacesSidebar";
import Navbar from "./Navbar";

import { searchLocation, type LocationResult } from "../services/geocoding";
import { getRoute } from "../services/route";
import { getWeather } from "../services/weather";
import { getNearbyPlaces } from "../services/nearby";
import { getTraffic } from "../services/traffic";
import { calculateScore } from "../services/decisionEngine";
import { generateRouteMarkers } from "../services/routeMarkers";
import { getNearestAirport } from "../services/airports";
import Chatbot from "./Chatbot";

export default function Hero() {

const [source,setSource]=useState("");

const [destination,setDestination]=useState("");

const [sourceLat,setSourceLat]=useState(12.9716);

const [sourceLon,setSourceLon]=useState(77.5946);

const [destinationLat,setDestinationLat]=useState(12.2958);

const [destinationLon,setDestinationLon]=useState(76.6394);

const [sourceSuggestions,setSourceSuggestions]=useState<LocationResult[]>([]);

const [destinationSuggestions,setDestinationSuggestions]=useState<LocationResult[]>([]);

const [route,setRoute]=useState<any>(null);

const [routes,setRoutes]=useState<any[]>([]);

const [routeMarkers,setRouteMarkers]=useState<any[]>([]);

const [nearbyPlaces,setNearbyPlaces]=useState<any[]>([]);

const [traffic,setTraffic]=useState<any>(null);

const [weather,setWeather]=useState<any>(null);

const [distance,setDistance]=useState(0);

const [duration,setDuration]=useState(0);

const [fuelCost,setFuelCost]=useState(0);

const [tollCost,setTollCost]=useState(0);

const [parkingCost,setParkingCost]=useState(0);

const [totalCost,setTotalCost]=useState(0);

const [loading,setLoading]=useState(false);

const [transportMode,setTransportMode]=useState("car");

const [travelStyle,setTravelStyle]=useState(50);

const [comfortLevel,setComfortLevel]=useState(50);

const [priority,setPriority]=useState("balanced");

const [bestRoute,setBestRoute]=useState<any>(null);

const [sourceAirport,setSourceAirport]=useState("");

const [destinationAirport,setDestinationAirport]=useState("");

const [sourceAirportLat,setSourceAirportLat]=useState(0);

const [sourceAirportLon,setSourceAirportLon]=useState(0);

const [destinationAirportLat,setDestinationAirportLat]=useState(0);

const [destinationAirportLon,setDestinationAirportLon]=useState(0);

const [debouncedSource,setDebouncedSource]=useState("");

const [debouncedDestination,setDebouncedDestination]=useState("");

const [sourceWeather,setSourceWeather]=useState<any>(null);

const [destinationWeather,setDestinationWeather]=useState<any>(null);
const [selectedTab, setSelectedTab] = useState("fuel");
// ====================== SEARCH ======================

async function handleSourceChange(value: string) {
  setSource(value);

  if (value.length < 3) {
    setSourceSuggestions([]);
    return;
  }

  try {
    const results = await searchLocation(value);

    setSourceSuggestions(results);

    if (results.length > 0) {
      setSourceLat(parseFloat(results[0].lat));
      setSourceLon(parseFloat(results[0].lon));
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleDestinationChange(value: string) {
  setDestination(value);

  if (value.length < 3) {
    setDestinationSuggestions([]);
    return;
  }

  try {
    const results = await searchLocation(value);

    setDestinationSuggestions(results);

    if (results.length > 0) {
      setDestinationLat(parseFloat(results[0].lat));
      setDestinationLon(parseFloat(results[0].lon));
    }
  } catch (err) {
    console.error(err);
  }
}

// ====================== DEBOUNCE ======================

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSource(source);
  }, 500);

  return () => clearTimeout(timer);
}, [source]);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedDestination(destination);
  }, 500);

  return () => clearTimeout(timer);
}, [destination]);

// ====================== CURRENT LOCATION ======================

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setSourceLat(position.coords.latitude);
      setSourceLon(position.coords.longitude);
      setSource("My Current Location");
    },
    () => {
      alert("Unable to fetch current location.");
    }
  );
};

// ====================== SAVE RECENT SEARCH ======================

const saveRecentSearch = () => {
  if (!source.trim() || !destination.trim()) return;

  let recent = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );

  recent.unshift({
    source,
    destination,
    date: new Date().toLocaleString(),
  });

  recent = recent.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex(
        (t: any) =>
          t.source === item.source &&
          t.destination === item.destination
      )
  );

  recent = recent.slice(0, 5);

  localStorage.setItem(
    "recentSearches",
    JSON.stringify(recent)
  );
};
function calculateAIScore(route: any) {
  switch (priority) {
    case "fastest":
      return 100000 - route.time;

    case "cheapest":
      return 100000 - route.cost;

    case "comfortable":
      return route.comfort * 1000;

    case "balanced":
    default:
      return (
        route.comfort * 500 +
        (100000 - route.cost) +
        (100000 - route.time)
      );
  }
}
function formatTime(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  
  return `${hrs} hr ${mins} min`;
}
const handleFindRoute = async () => {
  if (!source.trim() || !destination.trim()) {
    alert("Please enter both source and destination.");
    return;
  }

  setLoading(true);

  try {
    let startLat = sourceLat;
    let startLon = sourceLon;
    let endLat = destinationLat;
    let endLon = destinationLon;

    // ===================== Flight Mode =====================

    if (transportMode === "flight") {
      const srcAirport = await getNearestAirport(sourceLat, sourceLon);
      const destAirport = await getNearestAirport(
        destinationLat,
        destinationLon
      );

      setSourceAirport(srcAirport.name);
      setDestinationAirport(destAirport.name);

      setSourceAirportLat(srcAirport.lat);
      setSourceAirportLon(srcAirport.lon);

      setDestinationAirportLat(destAirport.lat);
      setDestinationAirportLon(destAirport.lon);

      startLat = srcAirport.lat;
      startLon = srcAirport.lon;

      endLat = destAirport.lat;
      endLon = destAirport.lon;
    }

    // ===================== Get Route =====================
console.log("SOURCE", startLat, startLon);
console.log("DESTINATION", endLat, endLon);
    let data: any;

    if (transportMode === "flight") {
      data = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [startLon, startLat],
                [endLon, endLat],
              ],
            },
            properties: {
              summary: {
                distance: 310000,
                duration: 9000,
              },
            },
          },
        ],
      };
    } else {
      data = await getRoute(
        startLat,
        startLon,
        endLat,
        endLon
      );
    }

    console.log("Route Response:", data);

    if (!data?.features?.length) {
      alert("No route found.");
      return;
    }

    const routeDistance =
      data.features[0].properties.summary.distance;

    const routeDuration =
      data.features[0].properties.summary.duration;

    setRoute(data);
    setDistance(routeDistance);
    setDuration(routeDuration);

    if (transportMode === "flight") {
      setRouteMarkers([]);
    } else {
      setRouteMarkers(generateRouteMarkers(data));
    }
    // ===================== TRAFFIC =====================

    const trafficData = await getTraffic(startLat, startLon);

    if (trafficData) {

      const congestion = Math.round(
        ((trafficData.freeFlowSpeed - trafficData.speed) /
          trafficData.freeFlowSpeed) * 100
      );

      const delay = Math.max(
        0,
        Math.round(
          (trafficData.currentTravelTime -
            trafficData.freeFlowTravelTime) / 60
        )
      );

      let status = "Free Flow";

      if (trafficData.speed < 20) {
        status = "Heavy Traffic";
      } else if (trafficData.speed < 40) {
        status = "Moderate Traffic";
      }

      setTraffic({
        route:
          source.split(",")[0] +
          " → " +
          destination.split(",")[0],
        congestion,
        delay,
        speed: trafficData.speed,
        status,
      });
    }

    // ===================== WEATHER =====================

    const sourceWeatherData = await getWeather(
      sourceLat,
      sourceLon
    );

    const destinationWeatherData = await getWeather(
      destinationLat,
      destinationLon
    );

    setSourceWeather(sourceWeatherData);

    setDestinationWeather(destinationWeatherData);

    setWeather(destinationWeatherData);

    // ===================== NEARBY PLACES =====================
const category =
  selectedTab === "fuel"
    ? "Fuel"
    : selectedTab === "hotel"
    ? "Hotel"
    : "Tourist";

const places = await getNearbyPlaces(
  destinationLat,
  destinationLon,
  category
);
console.log("Nearby Places:", places);

setNearbyPlaces(places);

// ===================== COST ESTIMATION =====================

const km = routeDistance / 1000;

let fuel = 0;
let toll = 0;
let parking = 0;

// Fuel prices (example)
const petrolPrice = 100;

if (transportMode === "car") {
  // Car mileage: 15 km/L
  fuel = Math.round((km / 15) * petrolPrice);

  toll = Math.round(km * 2);

  parking = 100;
}

if (transportMode === "bike") {
  // Bike mileage: 45 km/L
  fuel = Math.round((km / 45) * petrolPrice);

  toll = 0;      // Usually no toll for bikes

  parking = 20;  // Example bike parking
}

setFuelCost(fuel);
setTollCost(toll);
setParkingCost(parking);
setTotalCost(fuel + toll + parking);
    // ===================== AI ROUTE COMPARISON =====================

    

    const liveTrafficScore = trafficData
      ? Math.min(
          10,
          Math.max(
            0,
            Math.round(
              ((trafficData.freeFlowSpeed - trafficData.speed) /
                trafficData.freeFlowSpeed) *
                10
            )
          )
        )
      : 0;
const carSpeed = 65;
const bikeSpeed = 55;
const busSpeed = 50;
const trainSpeed = 70;
const flightSpeed = 950;
   const allRoutes = [
  {
    name: "Car",
   time:Math.round ((km / carSpeed) * 60),
    distance: (routeDistance / 1000).toFixed(1),
    cost:
      Math.round((km / 15) * petrolPrice) +
      Math.round(km * 2) +
      100,
    comfort: 8,
    traffic: liveTrafficScore,
    weather: 2,
  },

  {
    name: "Bike",
   time:Math.round((km / bikeSpeed) * 60),
    distance: (routeDistance / 1000).toFixed(1),
    cost:
      Math.round((km / 25) * petrolPrice) +
      20,
    comfort: 6,
    traffic: liveTrafficScore,
    weather: 2,
  },

  {
    name: "Bus",
    time:Math.round((km / busSpeed) * 60),
    distance: (routeDistance / 1000).toFixed(1),
    cost: Math.round(km * 2.2),
    comfort: 6,
    traffic: liveTrafficScore,
    weather: 2,
  },

  {
    name: "Train",
  time: Math.round((km / trainSpeed) * 60),
    distance: (routeDistance / 1000).toFixed(1),
    cost: Math.round(km * 1.5),
    comfort: 9,
    traffic: 1,
    weather: 1,
  },

  {
    name: "Flight",
    time: Math.round((km / flightSpeed) * 60 + 40),
    distance: (routeDistance / 1000).toFixed(1),
    cost: Math.round(km * 13),
    comfort: 10,
    traffic: 0,
    weather: 2,
  },
];

    const scoredRoutes = allRoutes.map((item) => ({
      ...item,
    aiScore: Math.round(calculateAIScore(item)),
    }));

    setRoutes(scoredRoutes);

  scoredRoutes.sort((a, b) => b.aiScore - a.aiScore);

setRoutes(scoredRoutes);

const best = scoredRoutes[0];
    

    setBestRoute(best);

    // ===================== SAVE TRIP =====================

    const trip = {
      source,
      destination,
      mode: best.name,
      distance: km.toFixed(1),
      time: best.time,
      cost: best.cost,
      date: new Date().toLocaleString(),
    };

    const oldTrips = JSON.parse(
      localStorage.getItem("savedTrips") || "[]"
    );

    oldTrips.unshift(trip);

    localStorage.setItem(
      "savedTrips",
      JSON.stringify(oldTrips)
    );

    // ===================== RECENT SEARCHES =====================

    saveRecentSearch();

  } catch (error) {
    console.error("Route Error:", error);
    alert("Unable to calculate route.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  if (!destinationLat || !destinationLon) return;

  const loadPlaces = async () => {
    const category =
      selectedTab === "fuel"
        ? "Fuel"
        : selectedTab === "hotel"
        ? "Hotel"
        : "Tourist";

    const places = await getNearbyPlaces(
      destinationLat,
      destinationLon,
      category
    );

    setNearbyPlaces(places);
  };

  loadPlaces();
}, [selectedTab]);
let displaySource = source;
let displayDestination = destination;

if (transportMode === "bus") {
  displaySource = source + " Bus Stand";
  displayDestination = destination + " Bus Stand";
}

if (transportMode === "train") {
  displaySource = source + " Railway Station";
  displayDestination = destination + " Railway Station";
}

if (transportMode === "flight") {
  displaySource = source + " Airport";
  displayDestination = destination + " Airport";
}




return (
  <div
    style={{
      minHeight: "100vh",
      background: "#0B1120",
      padding: "20px",
      overflowY: "auto",
    }}
  >
    {/* Navbar */}
  

    {/* ================= DASHBOARD ================= */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px",
        marginBottom: "25px",
      }}
    >
     </div>

    {/* ================= TITLE ================= */}

    <div
      style={{
        textAlign: "center",
        marginBottom: "15px",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "34px",
          marginBottom: "5px",
        }}
      >
        🚀 AI Smart Route Planner
      </h1>

      <p
        style={{
          color: "#94A3B8",
          fontSize: "16px",
        }}
      >
        Live Traffic • Weather • AI Recommendation • Multi-Modal Travel
      </p>
    </div>

    {/* ================= MAIN GRID ================= */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "340px 1fr 340px",
        gap: "20px",
        alignItems: "start",
      }}
    >
      {/* ================= LEFT ================= */}

      <PlannerSidebar
        source={source}
        destination={destination}
        transportMode={transportMode}
        setTransportMode={setTransportMode}
        travelStyle={travelStyle}
        setTravelStyle={setTravelStyle}
        comfortLevel={comfortLevel}
        setComfortLevel={setComfortLevel}
        priority={priority}
        setPriority={setPriority}
        handleSourceChange={handleSourceChange}
        handleDestinationChange={handleDestinationChange}
        handleFindRoute={handleFindRoute}
        setSource={setSource}
        setDestination={setDestination}
        getCurrentLocation={getCurrentLocation}
        loading={loading}
    
    
/>
      
      {/* ================= CENTER ================= */}

      <RouteMap
  route={route}
source={displaySource}
destination={displayDestination}
  sourceLat={transportMode === "flight" ? sourceAirportLat : sourceLat}
  sourceLon={transportMode === "flight" ? sourceAirportLon : sourceLon}
  destinationLat={transportMode === "flight" ? destinationAirportLat : destinationLat}
  destinationLon={transportMode === "flight" ? destinationAirportLon : destinationLon}
  routeMarkers={routeMarkers}
  routes={routes}
/>

      {/* ================= RIGHT ================= */}

      <PlacesSidebar
        nearbyPlaces={nearbyPlaces}
        
        
        
        weather={destinationWeather}
      
        selectedTab={selectedTab}
    setSelectedTab={setSelectedTab}
      />
    </div>
 <Chatbot
  source={source}
  destination={destination}
  distance={(distance / 1000).toFixed(1)}
  time={`${Math.round(duration / 60)} min`}
  weather={destinationWeather}
  nearbyPlaces={nearbyPlaces}
/>
  </div>
);
}



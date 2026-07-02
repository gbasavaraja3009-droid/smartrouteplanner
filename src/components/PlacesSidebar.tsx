import { useMemo } from "react";

type Props = {
  nearbyPlaces: any[];
  weather?: any;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function PlacesSidebar({
  nearbyPlaces,
  weather,
  selectedTab,
  setSelectedTab,
}: Props) {

  const fuelStations = useMemo(
    () =>
      nearbyPlaces.filter(
        (p: any) =>
          p.type?.toLowerCase().includes("fuel") ||
          p.type?.toLowerCase().includes("petrol")
      ),
    [nearbyPlaces]
  );

  const hotels = useMemo(
    () =>
      nearbyPlaces.filter(
        (p: any) =>
          p.type?.toLowerCase().includes("hotel") ||
          p.type?.toLowerCase().includes("restaurant") ||
          p.type?.toLowerCase().includes("food")
      ),
    [nearbyPlaces]
  );

  const tourist = useMemo(
    () =>
      nearbyPlaces.filter(
        (p: any) =>
          p.type?.toLowerCase().includes("tour") ||
          p.type?.toLowerCase().includes("attraction") ||
          p.type?.toLowerCase().includes("museum") ||
          p.type?.toLowerCase().includes("park")
      ),
    [nearbyPlaces]
  );
let list = nearbyPlaces;

if (selectedTab === "all") {
  list = nearbyPlaces;
}

if (selectedTab === "fuel") {
  list = fuelStations;
}

if (selectedTab === "hotel") {
  list = hotels;
}

if (selectedTab === "tourist") {
  list = tourist;
}

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
        {/* CATEGORY BUTTONS */}

      <div
        style={{
          background: "#111827",
          borderRadius: "18px",
          padding: "18px",
        }}
      >
        <h2
          style={{
            color: "white",
            marginTop: 0,
            marginBottom: "15px",
          }}
        >
          📍 Places on Route
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setSelectedTab("fuel")}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                selectedTab === "fuel" ? "#2563eb" : "#1F2937",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ⛽ Fuel Stations
          </button>

          <button
            onClick={() => setSelectedTab("hotel")}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                selectedTab === "hotel" ? "#16a34a" : "#1F2937",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🍴 Hotels & Restaurants
          </button>

          <button
            onClick={() => setSelectedTab("tourist")}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                selectedTab === "tourist" ? "#9333ea" : "#1F2937",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🏛 Tourist Places
          </button>
        </div>
      </div>

      {/* WEATHER */}

      <div
        style={{
          background: "#111827",
          borderRadius: "18px",
          padding: "18px",
          color: "white",
        }}
      >
        <h2
          style={{
            marginTop: 0,
          }}
        >
          🌤 Weather
        </h2>

        <h1
          style={{
            margin: "10px 0",
            fontSize: "38px",
          }}
        >
          {weather?.temperature ?? "--"}°C
        </h1>

        <p
          style={{
            color: "#9CA3AF",
            marginBottom: 0,
          }}
        >
          {weather?.description ?? "Weather unavailable"}
        </p>
      </div>
     {/* PLACES LIST */}

<div
  style={{
    background: "#111827",
    borderRadius: "20px",
    padding: "20px",
    color: "white",
  }}
>
  <h2
    style={{
      marginTop: 0,
      marginBottom: "20px",
      fontWeight: "bold",
      fontSize: "28px",
      letterSpacing: "1px",
    }}
  >
    PLACES ON ROUTE
  </h2>

  <div
    style={{
      maxHeight: "650px",
      overflowY: "auto",
    }}
  >
    {list.length === 0 ? (
      <p style={{ color: "#9CA3AF" }}>
        No places found.
      </p>
    ) : (
      list.map((place: any, index: number) => {

        let color = "#2563EB";
        let icon = "P";

        if (place.type.includes("Petrol")) {
          color = "#22C55E";
          icon = "⛽";
        }

        if (place.type.includes("Hotel")) {
          color = "#9333EA";
          icon = "🏨";
        }

        if (place.type.includes("Restaurant")) {
          color = "#F59E0B";
          icon = "🍴";
        }

        if (
          place.type.includes("Tourist") ||
          place.type.includes("Museum") ||
          place.type.includes("Monument") ||
          place.type.includes("View")
        ) {
          color = "#EAB308";
          icon = "🏛";
        }

        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 0",
              borderBottom: "1px solid #374151",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  background: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "26px",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {place.name}
                </h3>

                <p
                  style={{
                    margin: "6px 0",
                    color: "#9CA3AF",
                  }}
                >
                  {place.distance} km from route
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#6B7280",
                    fontSize: "15px",
                  }}
                >
                  ({place.type})
                </p>
              </div>
            </div>

            <div
              style={{
                fontSize: "34px",
                color: "#9CA3AF",
                fontWeight: "bold",
              }}
            >
              ›
            </div>
          </div>
        );
      })
    )}
  </div>
</div>
</div>
);
}
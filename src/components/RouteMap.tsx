import MapView from "./MapView";
import { getBookingLink } from "../services/booking";

type Props = {
  route: any;
  source: string;
  destination: string;
  sourceLat: number;
  sourceLon: number;
  destinationLat: number;
  destinationLon: number;
  routeMarkers: any[];
  routes: any[];
};

export default function RouteMap({
  route,
  source,
  destination,
  sourceLat,
  sourceLon,
  destinationLat,
  destinationLon,
  routeMarkers,
  routes,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      {/* MAP */}

      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2
            style={{
              color: "white",
              margin: 0,
              fontSize: "24px",
            }}
          >
            🗺 AI Route Map
          </h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                border: "none",
                background: "#1f2937",
                color: "white",
                fontSize: "18px",
              }}
            >
              📍
            </button>

            <button
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                border: "none",
                background: "#1f2937",
                color: "white",
                fontSize: "18px",
              }}
            >
              🔄
            </button>

            <button
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                border: "none",
                background: "#1f2937",
                color: "white",
                fontSize: "18px",
              }}
            >
              🖥
            </button>
          </div>
        </div>

        <MapView
  route={route}
  sourceLat={sourceLat}
  sourceLon={sourceLon}
  destinationLat={destinationLat}
  destinationLon={destinationLon}
  sourceName={source}
  destinationName={destination}
  routeMarkers={routeMarkers}
/>
      </div>

      {/* ROUTE COMPARISON */}

      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "25px",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          🏆 AI Route Comparison
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "18px",
          }}
        >
          {routes.map((item: any, index: number) => {
            const bookingLinks = getBookingLink(item.name);

            return (
              <div
                key={index}
                style={{
                  background: "#1f2937",
                  borderRadius: "18px",
                  padding: "22px",
                  color: "white",
                  border: "1px solid #374151",
                }}
              >
                <h3
                  style={{
                    color: "#60a5fa",
                    marginTop: 0,
                  }}
                >
                  {item.name}
                </h3>

                <p>📏 Distance : {item.distance ?? "--"} km</p>

                <p>
                  ⏱ Time : {Math.floor(item.time / 60)} hr {item.time % 60} min
                </p>

                <p>💰 Cost : ₹{item.cost}</p>

                <p>⭐ Comfort : {item.comfort}/10</p>

                <p>🤖 AI Score : {item.aiScore}</p>
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    marginTop: "15px",
                    fontSize: "13px",
                    color: "white",
                  }}
                >
                  <span>🔵 Best</span>
                  <span>🟢 Alternative</span>
                  <span>🟠 Scenic</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    📄 View Details
                  </button>

                  <button
                    onClick={() => {
                      const old = JSON.parse(
                        localStorage.getItem("favoriteRoutes") || "[]"
                      );

                      old.push(item);

                      localStorage.setItem(
                        "favoriteRoutes",
                        JSON.stringify(old)
                      );

                      alert("⭐ Route added to Favorites");
                    }}
                    style={{
                      width: "55px",
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "22px",
                    }}
                  >
                    ⭐
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  {bookingLinks.government && (
                    <button
                      onClick={() =>
                        window.open(
                          bookingLinks.government,
                          "_blank"
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      🚌 Government
                    </button>
                  )}

                  {bookingLinks.redbus && (
                    <button
                      onClick={() =>
                        window.open(
                          bookingLinks.redbus,
                          "_blank"
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      🔴 RedBus
                    </button>
                  )}

                  {bookingLinks.other && (
                    <button
                      onClick={() =>
                        window.open(
                          bookingLinks.other,
                          "_blank"
                        )
                      }
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      🎫 Book
                    </button>
                  )}
                </div>
              </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
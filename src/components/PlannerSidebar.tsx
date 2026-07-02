import SearchBox from "./SearchBox";

const recentSearches = JSON.parse(
  localStorage.getItem("recentSearches") || "[]"
);

type Props = {
  source: string;
  destination: string;
  setTransportMode: (mode: string) => void;
  transportMode: string;
  travelStyle: number;
  setTravelStyle: any;
  comfortLevel: number;
  setComfortLevel: any;
  priority: string;
  setPriority: any;
  handleFindRoute: any;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  getCurrentLocation: () => void;
  handleSourceChange: (value: string) => void;
  handleDestinationChange: (value: string) => void;
  loading:boolean;
};

export default function PlannerSidebar({
  source,
  destination,
  transportMode,
  setTransportMode,
  travelStyle,
  setTravelStyle,
  comfortLevel,
  setComfortLevel,
  priority,
  setPriority,
  handleSourceChange,
  handleDestinationChange,
  handleFindRoute,
  setSource,
  setDestination,
  loading,
}: Props) {
  return (
    <div
     style={{
  width: "360px",
  background: "linear-gradient(180deg,#111827,#0f172a)",
  borderRadius: "24px",
  padding: "28px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 50px rgba(0,0,0,.45)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "22px"
}}
    >
      {/* Header */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          🚀 Smart Planner
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          Plan your journey using AI recommendations
        </p>
      </div>

      {/* Source */}
      <SearchBox
        placeholder="Enter Source"
        value={source}
        onChange={handleSourceChange}
      />

      {/* Swap Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            const temp = source;
            setSource(destination);
            setDestination(temp);
          }}
          style={{
width:"100%",
padding:"15px",
borderRadius:"14px",
border:"1px solid #334155",
background:"#1E293B",
color:"white",
fontSize:"16px",
outline:"none"
}}
        >
          ⇅
        </button>
      </div>

      {/* Destination */}
      <SearchBox
        placeholder="Enter Destination"
        value={destination}
        onChange={handleDestinationChange}
      />

      {/* Transport */}
      <h3>Transport</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
        }}
      >
        {[
          ["car", "🚗"],
          ["bike", "🏍️"],
          ["bus", "🚌"],
          ["train", "🚆"],
          ["flight", "✈️"],
          ["walk", "🚶"],
        ].map(([mode, icon]) => (
          <button
            key={mode}
            onClick={() => setTransportMode(mode)}
            style={{
              height: "90px",
              border: "none",
              borderRadius: "15px",
              background:
                transportMode === mode ? "#7c3aed" : "#1f2937",
              color: "white",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "38px",
              }}
            >
              {icon}
            </span>

            <span
              style={{
                fontSize: "13px",
                textTransform: "capitalize",
              }}
            >
              {mode}
            </span>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <h3>Time vs Cost</h3>

      <input
        type="range"
        min={0}
        max={100}
        value={travelStyle}
        onChange={(e) => setTravelStyle(Number(e.target.value))}
      />

      <h3>Comfort</h3>

      <input
        type="range"
        min={0}
        max={100}
        value={comfortLevel}
        onChange={(e) => setComfortLevel(Number(e.target.value))}
      />

      {/* Priority */}
      <div
        style={{
width:"100%",
padding:"15px",
borderRadius:"14px",
border:"1px solid #334155",
background:"#1E293B",
color:"white",
fontSize:"16px",
outline:"none"
}}
      >
        {["fastest", "cheapest", "comfortable", "balanced"].map((p) => (
          <button
            key={p}
            onClick={() => setPriority(p)}
            style={{
              background:
                priority === p ? "#7c3aed" : "#374151",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Find Route */}
     <button
  onClick={handleFindRoute}
  disabled={loading}
  style={{
    width: "100%",
    padding: "15px",
    background: loading ? "#6b7280" : "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "0.3s",
  }}
>
  {loading ? "⏳ Finding Best Route..." : "🚀 Find Best Route"}
</button>

      {/* Recent Searches */}
      <h3
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        🕒 Recent Searches
      </h3>

      {recentSearches.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>
          No recent searches
        </p>
      ) : (
        recentSearches.slice(0, 5).map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              handleSourceChange(item.source);
              handleDestinationChange(item.destination);
            }}
            style={{
              background: "#1f2937",
              padding: "14px",
              borderRadius: "12px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            📍 {item.source} → {item.destination}
          </div>
        ))
      )}
    </div>
  );
}
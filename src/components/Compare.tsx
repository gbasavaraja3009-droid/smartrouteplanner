interface CompareProps {
  results: any[];
}

export default function Compare({ results }: CompareProps) {
  if (!results || results.length === 0) {
    return null;
  }

  const sortedResults = [...results].sort(
    (a, b) => b.aiScore - a.aiScore
  );

  return (
    <div id="compare"
      style={{
        marginTop: "30px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "900px",
        color: "black",
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        📊 Compare All Transport Modes
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
        border={1}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "white",
          }}
        >
          <tr>
            <th>Mode</th>
            <th>Time (min)</th>
            <th>Cost (₹)</th>
            <th>Comfort</th>
            <th>Traffic</th>
            <th>AI Score</th>
          </tr>
        </thead>

        <tbody>
          {sortedResults.map((item, index) => (
            <tr
              key={index}
              style={{
                background: index === 0 ? "#d1fae5" : "white",
              }}
            >
              <td>{item.mode}</td>
              <td>
  {Math.floor(item.time / 60)} hr {Math.round(item.time % 60)} min
</td>
              <td>₹{Math.round(item.cost)}</td>
              <td>{item.comfort}/10</td>
              <td>{item.traffic}/10</td>
              <td>{item.aiScore.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
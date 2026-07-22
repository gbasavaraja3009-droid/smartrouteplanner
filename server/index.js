import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?format=json` +
      `&q=${encodeURIComponent(q)}` +
      `&countrycodes=in` +
      `&addressdetails=1` +
      `&limit=10`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "SmartRoutePlanner/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`OpenStreetMap Error: ${response.status}`);
    }

    const data = await response.json();

    const filtered = data.filter(
      (item) =>
        item.address?.city ||
        item.address?.town ||
        item.address?.village ||
        item.address?.state_district ||
        item.address?.county
    );

    res.json(filtered);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
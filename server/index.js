import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`,
      {
        headers: {
          "User-Agent": "SmartRoutePlanner/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`OpenStreetMap Error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
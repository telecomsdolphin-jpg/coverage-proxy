import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow all origins
app.use(express.json());

app.post("/validate-coverage", async (req, res) => {
  const { address, service_use } = req.body;

  if (!address) return res.status(400).json({ error: "Address required" });

  try {
    const response = await fetch(
      "https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Basic Y2xpZW50X29hMHVvODFrdW81ZDozYnQzR1Vvb3BxRzNuUDRRb2xNc3pBN2hFamxvamVEaA=="
        },
        body: JSON.stringify({ address, service_use })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
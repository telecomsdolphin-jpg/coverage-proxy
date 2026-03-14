import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables for API credentials
const API_USER = process.env.API_USER;
const API_PASS = process.env.API_PASS;

app.post("/validate", async (req, res) => {
  const { address } = req.body;
  if(!address) return res.status(400).json({error:"Address required"});

  try {
    const authHeader = 'Basic ' + Buffer.from(`${API_USER}:${API_PASS}`).toString('base64');

    const response = await fetch('https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({ address, service_use: "Home" })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

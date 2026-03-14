console.log("API_BASIC:", process.env.API_BASIC ? "SET" : "MISSING");
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();

// Allow Shopify domain
app.use(cors({
  origin: 'https://dolphin-store-20230509.myshopify.com'
}));
app.use(express.json());

app.post('/validate', async (req, res) => {
  try {
    const address = req.body.address;
    if(!address) return res.status(400).json({ error: "Address missing" });

    const response = await fetch('https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': process.env.API_BASIC
      },
      body: JSON.stringify({ address, service_use: "Home" })
    });

   if (!response.ok) {
  const text = await response.text();
  return res.status(response.status).json({ error: text });
}
const data = await response.json();
    console.log('API returned:', data);
res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));

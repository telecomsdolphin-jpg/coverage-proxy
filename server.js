console.log("API_BASIC:", process.env.Basic ? "SET" : "MISSING");
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

    const bodyToSend = { address, service_use: "Home" };
    console.log("Sending to Dolphin API:", JSON.stringify(bodyToSend));

    const response = await fetch(
      'https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic Y2xpZW50X29hMHVvODFrdW81ZDozYnQzR1Vvb3BxRzNuUDRRb2xNc3pBN2hFamxvamVEaA=='
        },
        body: JSON.stringify(bodyToSend)
      }
    );

    const text = await response.text();
    console.log("Dolphin API raw response:", text);

    if(!response.ok){
      return res.status(response.status).json({ error: text });
    }

    const data = JSON.parse(text);
    res.json(data);

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));

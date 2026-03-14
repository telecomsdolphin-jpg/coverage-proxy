const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for Shopify domain
app.use(cors({
  origin: 'https://dolphin-store-20230509.myshopify.com',
  methods: ['POST','GET'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());

app.post('/validate', async (req,res) => {
  try {
    const { address } = req.body;
    const response = await fetch('https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.API_USER}:${process.env.API_PASS}`).toString('base64')
      },
      body: JSON.stringify({ address, service_use: "Home" })
    });
    const data = await response.json();
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Proxy failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

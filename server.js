const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();

// Allow Shopify domain (ya sab ke liye *)
app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.post('/validate', async (req, res) => {
  try {
    const address = req.body.address;

    // Call client API
    const response = await fetch(
      'https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': process.env.API_BASIC // environment variable
        },
        body: JSON.stringify({ address, service_use: "Home" })
      }
    );

    const data = await response.json();
    res.json(data); // Shopify frontend ko return
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Listen on Render port
app.listen(process.env.PORT || 3000, () => console.log('Proxy running...'));

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();

// Allow only Shopify domain
app.use(cors({ origin: 'https://dolphin-store-20230509.myshopify.com' }));
app.use(express.json());

// Dolphin API credentials
const username = 'client_hy4kcyqls6xp';
const password = 'Zde02cfBnYsIwsgddlk6jiiYxMxO0Cw0';
const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

app.post('/validate', async (req, res) => {
  const address = req.body.address?.trim();
  if (!address) return res.status(400).json({ error: "Address missing" });

  try {
    const bodyToSend = { address, service_use: "Home" };
    console.log("Sending to Dolphin API:", JSON.stringify(bodyToSend));

    const response = await fetch(
      'https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(bodyToSend)
      }
    );

    const text = await response.text();
    console.log("Dolphin API raw response:", text);

    // Safe JSON parsing
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      return res.status(200).send(text);
    }

  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(200).json({ error: 'Could not validate coverage. Try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/validate', async (req, res) => {
  try {
    const address = req.body.address;

    const response = await fetch('https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': process.env.API_BASIC // Ensure this is correct
      },
      body: JSON.stringify({ address, service_use: "Home" })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running...'));

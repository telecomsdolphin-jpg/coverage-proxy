const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow all origins
app.use(express.json());

app.post('/validate', async (req, res) => {
  try {
    const address = req.body.address;
    const response = await fetch('https://dolphin-telecoms-coverage-map-api.lionafricadigital.com/api/external/coverage/validate', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Basic ' + process.env.API_BASIC
      },
      body: JSON.stringify({ address, service_use: "Home" })
    });
    const data = await response.json();
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy running...');
});

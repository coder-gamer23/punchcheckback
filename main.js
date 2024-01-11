const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const PORT = 4000; // You can change the port number as needed

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors())

// API endpoint to handle the request
app.post('/api/punchDetails', async (req, res) => {
  try {
    const { empCode, punchIn, punchOut } = req.body;

    // Create the data payload
    const data = JSON.stringify({
      empCode,
      punchIn,
      punchOut,
    });

    // Axios configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://is-cvm62/LeaveTrackService/PunchDetailsiStrong',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'http://is-cvm62:84',
        'Referer': 'http://is-cvm62:84/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      data,
    };

    // Make the request using Axios
    const response = await axios.request(config);

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

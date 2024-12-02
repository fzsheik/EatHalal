const axios = require('axios');
require('dotenv').config();
// Your API key (replace 'YOUR_API_KEY' with your actual API key)
const API_KEY = process.env.GOOGLE_API_KEY;

// Define the endpoint URL
const endpoint_url = 'https://places.googleapis.com/v1/places:searchNearby';

// Set up the request headers
const headers = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': API_KEY,
  'X-Goog-FieldMask': 'places.displayName'
};

// Set up the request body parameters
const request_body = {
  "includedTypes": ["restaurant"],
  "maxResultCount": 10,
  "locationRestriction": {
    "circle": {
      "center": {
        "latitude": 32.9618763,     // Latitude of San Francisco, CA
        "longitude": -96.99609249999999   // Longitude of San Francisco, CA
      },
      "radius": 16000.0             // Radius in meters
    }
  }
};

// Make the HTTP POST request
axios.post(endpoint_url, request_body, { headers: headers })
  .then(response => {
    // Handle success
    const data = response.data;
    console.log(JSON.stringify(data, null, 2));
    const places = data.places || [];
    if (places.length > 0) {
      places.forEach(place => {
        const name = place.displayName.text;
        console.log(`Name: ${name}`);
        console.log('-'.repeat(40));
      });
    } else {
      console.log('No places found.');
    }
  })
  .catch(error => {
    // Handle error
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error(`Error: ${error.response.status}`);
      console.error(error.response.data);
    } else {
      // Network error or other issues
      console.error('Error:', error.message);
    }
  });

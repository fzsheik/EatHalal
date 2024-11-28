const express = require('express');
const app = express()
const fs = require('fs')
require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const {getCoordinatesByZipcode, getNearbyPlaces } = require('./helper')





app.get('/restaurants/zipcode/:zipcode', async (req, res) => {
    const zipcode = req.params.zipcode;

    const location = await getCoordinatesByZipcode(zipcode, GOOGLE_API_KEY);

    const restaurants = await getNearbyPlaces(location, 16093.4, GOOGLE_API_KEY )
    let list = `Places Near ${zipcode} <br>`;
    restaurants.forEach(r => {
        list += `${r.name} <br>`
        
    });
    res.send(list)
    
    
    
})


app.get('/', (req, res) => {
    res.send("EatHalal is running")
});

const port = 5000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


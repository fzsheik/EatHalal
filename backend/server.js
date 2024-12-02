const express = require('express');
const app = express()
const fs = require('fs')
require('dotenv').config();
const cors = require('cors');

app.use(cors());


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const {getCoordinatesByZipcode, getNearbyPlaces, getPlacesByTextSearch } = require('./helper')





app.get('/restaurants/zipcode/:zipcode', async (req, res) => {
    
    const zipcode = req.params.zipcode;

    const location = await getCoordinatesByZipcode(zipcode, GOOGLE_API_KEY);

    //const nearbyRestaurants = await getNearbyPlaces(location, 16093.4, GOOGLE_API_KEY )
    
    const halalRestaurants = await getPlacesByTextSearch(`Halal restaurants near me`, location ,GOOGLE_API_KEY, 16093.4);
    
     
    
   // console.log(nearbyRestaurants);
    console.log(halalRestaurants)
    //console.log(nearbyRestaurants.places.map(r => r.displayName.text));
    //console.log(halalRestaurants.places.map(r => r.displayName.text));

        
    let list = []
    halalRestaurants.forEach(r => {
       list += `${r.displayName.text} <br>`
        
   });
    res.send(halalRestaurants)
    
    
    
})


app.get('/', (req, res) => {
    console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY);
    res.send("EatHalal is running")
}); 

const port = 5001
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


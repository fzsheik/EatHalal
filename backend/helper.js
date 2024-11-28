const axios = require('axios')
require('dotenv').config();

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

async function getCoordinatesByZipcode(zipcode, key){
    try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${key}`
    const geoloc = await axios.get(geocodeUrl)
    console.log(geoloc.data.results[0].geometry.location)
    return location =  `${geoloc.data.results[0].geometry.location.lat},${geoloc.data.results[0].geometry.location.lng}`
    } catch (error) {
        console.error('Error with Geocoding API:', error);
    }

}

async function getNearbyPlaces(coordinates, radius, key ) {
    try {
        const places = await axios.get(GOOGLE_URL,{
            params: {
            location: coordinates,
            radius: radius,
            key: key 
            }
    
        });
        console.log(places.data.results)
        return places.data.results
    } catch (error) {
        console.error("Error fetching data from Google Places API:", error);
        return 0;
    }
}

module.exports = {getCoordinatesByZipcode, getNearbyPlaces }
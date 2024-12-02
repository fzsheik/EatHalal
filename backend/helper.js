const axios = require('axios')
require('dotenv').config();

const nearby_url = 'https://places.googleapis.com/v1/places:searchNearby';
const text_url = 'https://places.googleapis.com/v1/places:searchText';

async function getCoordinatesByZipcode(zipcode, key){
    try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${key}`
    const geoloc = await axios.get(geocodeUrl)
    console.log(geoloc.data.results[0].geometry.location)
    return location =  [geoloc.data.results[0].geometry.location.lat, geoloc.data.results[0].geometry.location.lng]
    } catch (error) {
        console.error('Error with Geocoding API:', error);
    }

}

async function getNearbyPlaces(location, radius, key) {

    
    try {
        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': key,
            'X-Goog-FieldMask': 'places.displayName'
        }
        const request_body = {
            "includedTypes": ["afghani_restaurant", "mediterranean_restaurant", "middle_eastern_restaurant"],
            //"maxResultCount": 10,
            "locationRestriction": {
              "circle": {
                "center": {
                  "latitude": location[0],     // Latitude of San Francisco, CA
                  "longitude": location[1]  // Longitude of San Francisco, CA
                },
                "radius": radius        // Radius in meters
              }
            }
        };
        const responses = await axios.post(nearby_url, request_body, { headers: headers });
        const data = responses.data;

        console.log('Full Response Data:', JSON.stringify(data, null, 2));

        return data;

    } catch (error) {
        console.error('Error with Nearby Search API:', error.response?.data || error.message);
        throw error;
    }
}


async function getPlacesByTextSearch(query,location, key, radius) {
    console.log("at the textsearch function");
    const allResults = []
    let nextPage = null
    try {
        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': key,
            'X-Goog-FieldMask': 'places.displayName,nextPageToken'
        }
        
        const query_body = {
            "textQuery" : `${query}`,
            "locationBias": {
                    "circle": {
                    "center": {
                        "latitude": location[0],
                        "longitude": location[1]},
                    "radius": radius
                    }
                }
        }
        
        const responses = await axios.post(text_url, query_body, {headers : headers});
        allResults.push(...responses.data.places)
       
        const data = responses.data.nextPageToken;
        
        nextPage = data;
        console.log(nextPage)
        let i = 0;
        while(nextPage != null && i <= 5){
            console.log("in the loop")
            const later_query_body = {
                "textQuery" : `${query}`,
                "pageToken" : `${nextPage}`,
                "locationBias": {
                    "circle": {
                    "center": {
                        "latitude": location[0],
                        "longitude": location[1]},
                    "radius": radius
                    }
                }
            }
            const nextPageResponses = await axios.post(text_url, later_query_body, {headers : headers});
            allResults.push(...nextPageResponses.data.places)
            nextPage = nextPageResponses.data.nextPageToken;
            i++;
            
        }
        console.log("done seeing the total results")
        console.log(allResults)
        console.log(allResults.length)
        console.log('Full Response Data:', JSON.stringify(data, null, 2));
        return allResults;
    } catch (error){
        console.log('Error', error.message)
    }
}



module.exports = {getCoordinatesByZipcode, getNearbyPlaces, getPlacesByTextSearch}
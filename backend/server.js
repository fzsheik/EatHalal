const express = require('express');
const app = express()
const fs = require('fs')

const getRestData = () => {
    const rawdata  = fs.readFileSync('restaurants.json');
    const restData = JSON.parse(rawdata);
    return restData;
}

app.get('/restaurants', (req, res) => {
    const restData = getRestData();
    let list = 'Restaurant \n';
    restData.forEach((restaurant) => {
        if (restaurant.zip === '08817'){
            list += `${restaurant.name} \n`;
        }

    })

    res.send(list);
})
app.get('/', (req, res) => {
    res.send("EatHalal is running")
});

const port = 5000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


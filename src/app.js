const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aman Vijay'
    })
})
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aman Vijay'
    })
} )
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Helping from the outer world',
        name: 'Aman Vijay'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'AMan',
//         age:67
//     });
// })
// app.get('/about', (req, res) => {
//     res.send('About');
// })
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    let errorMessage, location, forecaseData;
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            console.log(location);
            console.log(forecastData);
            res.send(({
                "forecast": forecastData,
                "location": location,
                "address": req.query.address
            }));
        })
    })
    
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send(({
        products: []
    }));
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Aman Vijay',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Aman Vijay',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})

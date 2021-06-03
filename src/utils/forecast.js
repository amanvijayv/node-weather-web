const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48e834d7bb89f9d88c8ebd8090589baa&query=' + lat + ',' + long + '';

    // using property shorthand, url:url, replacing as url
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Not able to get api respone', undefined);
        } else if (body.error) {
            callback('Some other error', undefined);
        } else {
            callback(undefined, {
                'temperature': body.current.temperature,
                'prec': body.current.precip
            })
        }

    })
}

module.exports = forecast;
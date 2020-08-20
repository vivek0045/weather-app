const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmF3YXp6MTIzIiwiYSI6ImNrZHY2cmdodTJleXUyc3BhcmwzMGg1djMifQ.1Bcdvf7l4gbJeFIkXxF49Q&limit=1'
    request({ url,json: true},(error,{body}) =>{
         if(error)
         {
              callback('unable to connect to location service',undefined)       
         }else if(body.features.length===0)
         {
              callback('unable to find location. try another search.'.undefined)
         }else{    
              callback(undefined,{
                   longitude: body.features[0].center[0],
                   latitude: body.features[0].center[1],
                   location: body.features[0].place_name
              })
         }
    })
}

module.exports = geocode
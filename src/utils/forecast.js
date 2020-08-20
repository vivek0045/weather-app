const request = require('request')

const forecast = (longitude,latitude,callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&exclude=&appid=f03cc414d516688aa3211e0bda3cb3b2'
    request({ url,json: true}, (error,{body}) =>{
              if(error)
              {
                   callback('unable to connect to weather service',undefined)       
              }else if(body.message)
              {
                   callback('unable to find location',undefined)
              }else{
                   callback(undefined,body.daily[0].weather[0].description+'. it is currently '+body.current.temp + ' degress out. there is a '+body.current.clouds+'% chance of rain')
              }
          } )
}

module.exports = forecast
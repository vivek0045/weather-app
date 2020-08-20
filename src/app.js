const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express() 

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partiaPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partiaPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'vivek ginoya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'vivek ginoya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'vivek ginoya',
        helpText: 'this is helpful text'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide location'
        })
    }
    geocode(req.query.address,(error,{longitude, latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
                if(error)
                {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        prodects:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'vivek ginoya',
        errorMessage : 'help ar not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'vivek ginoya',
        errorMessage : 'page not found'
    })
})

app.listen(3000,() =>{
    console.log('port 3000')
})
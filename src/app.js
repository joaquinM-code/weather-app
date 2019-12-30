const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')


const app = express()
const port = process.env.PORT || 80

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine, views location and partials 
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('' , (req , res)=>{
    res.render('index', {
        title:'Weather',
        name:'Ecatom'
    })
})

app.get('/about' , (req , res)=>{
    res.render('about', {
        title:'About us',
        name:'Ecatom'
    })
})

app.get('/help' , (req , res)=>{
    res.render('help', {
        title:'Help',
        message:'Help message from src',
        name:'Ecatom'
    })
})

app.get('/weather',(req , res)=>{
    if(!req.query.address){
        return res.send({
            error:'An address must be provided'
        })
    }

    geocode(req.query.address , (error , {latitude , longitude , location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude , longitude , (error , forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData
            })
        })
    })
    
})



app.get('/help/*' , ( req , res )=>{
    res.render('404' , {
        title: 'Aticle not found',
        message:'Go back and try another one',
        name:'Ecatom'
    })
})

app.get('*' , (req , res)=>{
    res.render('404' , {
        title:'Page not found',
        name:'Ecatom',
        message:'Go back and try another one'
    })
})

app.listen(port, ()=>{
    console.log('Server running!')
})
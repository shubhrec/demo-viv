const axios = require('axios')
const fs = require('fs')

const express = require('express')

var app = express()

/* Getting the API details. Not ideal to store the API Keys in conf.json. Should use a key management tool or environment varibles.
For the sake of this demo and to make the code sharable more easily, doing it this way */

const config = JSON.parse(fs.readFileSync('./config/conf.json'))



/********************************** API Routes ****************************** */

const FAILURE_RESPONSE_CODE = -1
const SUCCESS_RESPONSE_CODE = 0

app.get('/weatherdata',(req, res) => {
    refreshRealtimeData(config.URL, config.API_KEY, config.DAYS, config.Q).then(response => {
        // console.log(response)
        res.json({retcode : SUCCESS_RESPONSE_CODE , message: "Request was processed succesfully" , readings : formatResponse(response.data)})
    }).catch(error => {
        res.json({retcode : FAILURE_RESPONSE_CODE , message: "Something went wrong. Please try to refresh the page" })
    })
    
})




/***************************************************************************** */



//gets data from the API
var refreshRealtimeData = function (url, apiKeys, days, q) {
    let queryStringParams = {
        key: apiKeys,
        q: q,
        days: days
    }
    return axios.get(url, { params: queryStringParams })
}


//Formats the data received from API
var formatResponse = function (responseDataFromWeatherApi) {

    //this is going to be the final response to the frontend
    let finalResponseStructure = {
        current: {
            temp_f: "",
            time : ""
        },
        forecast: []
    }

    finalResponseStructure.current.temp_f = responseDataFromWeatherApi.current.temp_f //set the current temperature
    finalResponseStructure.current.time = responseDataFromWeatherApi.current.last_updated //set the current temperature

    //Forecast returns temperatures across all hours of the day. but we don't need the temperature for the past hours so filtering them out
    let filteredForeCastTimes = [...responseDataFromWeatherApi.forecast.forecastday[0].hour , ...responseDataFromWeatherApi.forecast.forecastday[1].hour].filter(epochs => {
        return epochs.time_epoch > responseDataFromWeatherApi.current.last_updated_epoch
    })

    //Finally all the relevant forecasts are pushed to the forecast array 
    filteredForeCastTimes.forEach(element => {
        finalResponseStructure.forecast.push({
            time: element.time,
            temp_f: element.temp_f
        })
    })
    return finalResponseStructure;
}





//starts the express server
app.listen(4000,()=>{
    console.log("server is running")
})
const express = require("express")
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
const https = require("https")
app.get("/",function(req, res){

    res.sendFile(__dirname + "/index.html")   
});

app.post("/",function(req,res){
    

    const query = req.body.cityName
    const apiid = "0532cb5b10f1bcd79150526138a32b51"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiid 
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            if (weatherdata.cod === "404") {
                res.sendFile(__dirname + "/not-found.html");
            } else {
            const temp = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const cityn = weatherdata.name
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            // res.write("<h1>Weather in " + cityn + " is " + temp + "<h1>");
            // res.write("<img src =" + imageurl + ">");
            res.write(`
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: green;
                        background-color: #8a6300;
                        background-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png");

                    }
                    h1 {
                        text-align: center;
                        color: white;
                    }
                    img {
                        display: block;
                        margin: 0 auto;
                    }
                </style>
                <h1>Weather in ${cityn} is ${temp}</h1>
                <img src="${imageurl}" alt="Weather Icon">
            `);
            res.send() }
    })

}) 



})





app.listen(3000,function(){
    console.log("server running")
})


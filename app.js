const express  = require("express");
const { rmSync } = require("fs");
const https  = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")
})
app.post("/",function(req,res){
     
           const query = req.body.cityName
       const apiKey = "95297257553a46843df78036b935b381"
       const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units=" + unit

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = Math.floor(weatherData.main.temp)
            const weatherDes = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon 
            const iconURL =     "http://openweathermap.org/img/wn/"+icon+"@2x.png" 
            console.log(icon);            
           
            res.send( "<p>The weather currently " + weatherDes +  "</p>" + "<h1>The temperature in " + хуконукquery +" is "+ temp +"</h1>" +"<img src='"  + iconURL +  "'>" )
        })

    })
  })
                      



   


app.listen(3000, function(){
    console.log('server is running you can use it man ');
})
document.getElementById("btn").addEventListener("click",getWeather);
var tempElement = document.querySelector(".temperature-value p");
var descElement = document.querySelector(".temperature-description p");
var locationElement = document.querySelector(".location p");
var notificationElement = document.querySelector(".notification");
var windElement = document.querySelector(".wind-value p")

const weather = {};

weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;

const key = "15b64d8945088dd1942e017cfe05127c";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let api1 = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api1)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.wind = data.wind.speed;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


// GET WEATHER FROM API PROVIDER
function getWeather(selectedValue){
    //let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
     var searchName=document.getElementById("cityName").value
     var api = `http://api.openweathermap.org/data/2.5/forecast?q=${searchName}&appid=${key}`
    if(!searchName.trim()){
      alert("Search Name is Empty");
      return;
    }
    fetch(api)
        .then(function(apiResponse){
          var response = apiResponse.json();
          //console.log(response);
          response.then(resp => {
            var data = resp || [];
            if(selectedValue == "A"){
           weather.temperature.value = Math.floor(data.list[0].main.temp - KELVIN);
            weather.description = data.list[0].weather[0].description;
            weather.city = data.city.name;
            weather.country = data.country;
            weather.wind = data.list[0].wind.speed;
          }
      else if(selectedValue == "B"){
          weather.temperature.value = Math.floor(data.list[5].main.temp - KELVIN);
                  weather.description = data.list[5].weather[0].description;
                  weather.city = data.city.name;
                  weather.country = data.country;
                  weather.wind = data.list[5].wind.speed;
         }
      else if(selectedValue == "C"){
          weather.temperature.value = Math.floor(data.list[13].main.temp - KELVIN);
                  weather.description = data.list[13].weather[0].description;
                  weather.city = data.city.name;
                  weather.country = data.country;
                  weather.wind = data.list[13].wind.speed;
         }
      else if(selectedValue == "D"){
          weather.temperature.value = Math.floor(data.list[21].main.temp - KELVIN);
                  weather.description = data.list[21].weather[0].description;
                  weather.city = data.city.name;
                  weather.country = data.country;
                  weather.wind = data.list[21].wind.speed;
         }
      else if(selectedValue == "E"){
          weather.temperature.value = Math.floor(data.list[29].main.temp - KELVIN);
                  weather.description = data.list[29].weather[0].description;
                  weather.city = data.city.name;
                  weather.country = data.country;
                  weather.wind = data.list[29].wind.speed;
         }
      else{
         weather.temperature.value = Math.floor(data.list[37].main.temp - KELVIN);
                  weather.description = data.list[37].weather.description;
                  weather.city = data.city.name;
                  weather.country = data.country;
                  weather.wind = data.list[37].wind.speed;
         }
            displayWeather();
          });
        })
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    windElement.innerHTML = `WindSpeed :${weather.wind}<span>m/s</span>`
}
function changeDay(){
  selectedValue = document.getElementById("day").value;
  getWeather(selectedValue);
}

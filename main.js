const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#search-btn");
const weather_img = document.querySelector(".weather-img");
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidityLevel = document.querySelector("#humidity-level");
const windSpeed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
    const api_key = "f2aef34ca802ebc37819598e0b83c8f0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none"
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex"
    temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidityLevel.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "img/cloud.png";
            break;

        case 'Clear':
            weather_img.src = "img/clear.png";
            break;

        case 'Mist':
            weather_img.src = "img/mist.png";
            break;

        case 'Rain':
            weather_img.src = "img/rain.png";
            break;

        case 'Snow':
            weather_img.src = "img/snow.png";
            break;
    }
    console.log(weather_data);
}
inputBox.addEventListener('keyup', e => {
    e.preventDefault();
    if(e.keyCode === 13){
        checkWeather(inputBox.value);
    }
});

// searchBtn.addEventListener('click', () => {
//     checkWeather(inputBox.value);
// });
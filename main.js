const apiKey = '8af7ef9e00bad1238e2f86767f941118';

const cityInput = document.querySelector("#inputText")
const searchBtn = document.querySelector("#searchBtn")
const containerMain = document.querySelector("#weather-data")
const errorMessage = document.querySelector("#error-Status")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")
const ImageTemp = document.querySelector("#weather-data img")

//Functions

const getWeatherData = async (city) => {
    
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    const res = await fetch(apiWeather)
    const data = await res.json()

    return data
}

//Error Message

const handleErrorMessage = () => {
    errorMessage.classList.remove("hide")
}

const hideInfo = () => {
    errorMessage.classList.add("hide")
    containerMain.classList.add("hide")
}

const showWeatherData = async (city) => {
   
    const data = await getWeatherData(city)
    hideInfo()

    if(data.cod === "404") {
        handleErrorMessage()
        return
    }
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        humidityElement.innerText = data.main.humidity + "%";
        windElement.innerText = data.wind.speed + "km/h"
        containerMain.classList.remove('hide')
}

//Events

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;
    
    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city)
    }
})
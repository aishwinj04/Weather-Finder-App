import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import thunder from "../assets/images/thunder.png"
import { useState, useEffect } from "react"

const WeatherFinder = () => {
   // holds api response
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const apiKey = import.meta.env.VITE_API_KEY // stored in environment variable
  
  // default weather when mounted
    useEffect(() => {
    const fetchDeafultWeather = async () => {
      const defaultLocation = "Toronto"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${apiKey}`
      const res = await fetch(url)
      const defaultData = await res.json()
      setData(defaultData)
    }

    fetchDeafultWeather()

  },[])
  
  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }    

    // GET request
  const search = async () => {
    if(location.trim() !== ""){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      const res = await fetch(url)
      const searchData = await res.json()
      console.log(searchData)

      setData(searchData)
      setLocation("")
    }

  }

  // map images to **common** OpenWeatherAPI weather types
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Drizzle: rainy,
    Thunderstorm: thunder,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
    Smoke: cloudy
  }

  // check existence prior to assigning image
  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null 
  
  // map different backgrounds 
  const backgroundImages = {
    Clear: 'linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF)',
    Clouds: 'linear-gradient(to right, #bdc3c7, #2c3e50)',
    Rain: 'linear-gradient(to right, #00416A, #E4E5E6)',
    Drizzle: 'linear-gradient(to right, #4b79a1, #1CB5E0)',
    Thunderstorm: 'linear-gradient(to right, #4b79a1, #283e51)',
    Snow: 'linear-gradient(to right, #9CECFB, #004e92)',
    Haze: 'linear-gradient(to right, #e6dada, #274046)',
    Mist: 'linear-gradient(to right, #e6dada, #274046)',
    Smoke:'linear-gradient(to right, #e6dada, #274046)'
    
    

  }

  // unsuccessful fetch, set background to given color (string guarantee )
  const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #FDC830, #F37335)'
  console.log(data)

  


  return (
    <div className="container" style={{backgroundImage}}>
      <div className="weather-app" style={{backgroundImage: backgroundImage.replace("to right", "to top")}}> 
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location" onChange={handleInputChange}/>
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        <div className="weather">
          <img src={weatherImage} alt="weather"/>
          <div className="weather-type">{data.weather ? `${(data.weather[0].main)}` : null}</div>
          <div className="temp">{data.main ? `${Math.floor(data.main.temp)}ºC` : null}</div>
          <div className="feels-like">{data.weather ? `Feels Like: ${(data.main.feels_like)}ºC` : null}</div>
        </div>
        <div className="weather-date">
          <p>Fri, 10 Jan</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">{data.main ? `${(data.main.humidity)}%` : null}</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">{data.wind ? `${(data.wind.speed)}km/h` : null}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherFinder

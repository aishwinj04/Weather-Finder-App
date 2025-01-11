import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import { useState } from "react"

const WeatherFinder = () => {
    // holds api response
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const apiKey = import.meta.env.VITE_API_KEY // stored in environment variable

  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }    
  // GET request
  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    const res = await fetch(url)
    const searchData = await res.json()
    console.log(searchData)

    setData(searchData)
    setLocation("")

  }


  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{location}</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location" onChange={handleInputChange}/>
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="sunny"/>
          <div className="weather-type">Clear</div>
          <div className="temp">28ºC</div>
        </div>
        <div className="weather-date">
          <p>Fri, 10 Jan</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">35%</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">3 km/h</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherFinder

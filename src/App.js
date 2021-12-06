import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Weather from './components/Weather'

const App = () => {
  const [userInput, setUserInput] = useState("")
  const [msg, setMsg] = useState("")
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [coordinates, setCoordinates] = useState(null)

  const API_KEY = process.env.REACT_APP_API_KEY

  useEffect(()=> {
    getLocation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reverseGeocode = (position) => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    if (lat & lon) {
      axios
      .get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
        .then(response => {
          setLocation(response.data[0].name)
      })
      .catch(error => {
        setMsg("Error. Please try again.")
        setWeather(null)
      })
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(reverseGeocode)
      setMsg("Loading...")
    }
  }

  useEffect(() => {
    if (location) {
      axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`)
        .then(response => {
          setCoordinates([response.data[0].lat, response.data[0].lon])
        })
        .catch(error => {
          setMsg("Error. Please try again.")
          setWeather(null)
        })
      }
  }, [location, API_KEY])

  useEffect(() => {
    if (coordinates) {
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?&exclude=minutely,alerts&lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        setMsg("Error. Please try again.")
        setWeather(null)
      })
    }
  }, [coordinates, API_KEY])

  const handleChange = (e) => {
    e.preventDefault()
    setUserInput(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault()
    setMsg(null)
    setLocation(userInput)
    setUserInput("")
  }

  return (
    <>
      <Header 
        submitForm={submitForm}
        userInput={userInput}
        handleChange={handleChange}
        getLocation={getLocation}
        
      />
      <main className="container">
      {weather ?
        <>
        <Weather
          weather={weather}
          location={location}
        />
        </>
        :
        <p className="msg">{msg}</p>
        }
    </main>
    </>
  )
}

export default App
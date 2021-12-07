const Weather = ({ weather, location }) => {
  const getDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(weather.current.dt * 1000).toLocaleDateString("en-US", options)
    return date
  }

  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay() 
    return isNaN(dayOfWeek) ? null : 
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
  }

  const convertTime = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000)
    const hours = date.getHours()
    const minutes = "0" + date.getMinutes()
    const seconds = "0" + date.getSeconds()
    const time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    return time
  }

  const getHours = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000)
    const hours = date.getHours()
    return hours + '.00:'
  }

  const capitalizeLetters = (str) => {
    const arr = str.split(" ")
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    const words = arr.join(" ")
    return words
  }

  return (
    <div>
      <h3>Current Weather</h3>
      <div className="weather">
        <div className="box">
          <h4>{getDate()}</h4>
          <h2>{Math.round(weather.current.temp)} &#8451; in {capitalizeLetters(location)}</h2>
          <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].main} width="100"/> 
          <h2>{weather.current.weather[0].description}</h2>
          <p>Timezone: {weather.timezone}</p>
        </div>
        <div className="description">
          <p>Description: {weather.current.weather[0].description}</p>
          <p>Feels like: {Math.round(weather.current.feels_like)} &#8451;</p>
          <p>Temp min: {Math.round(weather.daily[0].temp.min)} &#8451;</p>
          <p>Temp max: {Math.round(weather.daily[0].temp.max)} &#8451;</p>
          <p>Humidity: {weather.current.humidity} %</p>
          <p>Pressure: {weather.current.pressure} hPa</p>
          <p>Wind speed: {weather.current.wind_speed} m/s</p>
          <p>Sunrise: {convertTime(weather.daily[0].sunrise)}</p>
          <p>Sunset: {convertTime(weather.daily[0].sunset)}</p>
        </div>
      </div>
      <h3>7 Day Forecast</h3>
      <div className="forecast-daily">
        {weather.daily.slice(0, 7).map(forecast => 
          <div key={forecast.dt}>
            <p><b>{getDayOfWeek(new Date(forecast.dt * 1000))}:</b></p>
            <p>{Math.round(forecast.temp.day)} &#8451;, {forecast.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={`${forecast.weather[0].description}`} />
          </div>
        )}
      </div>
      <h3>48 Hour Forecast</h3>
      <div className="forecast-hourly">
        {weather.hourly.map(hour=> 
          <div key={hour.dt}>
            <span>{getDayOfWeek(new Date(hour.dt * 1000))} </span>
            <span><b>{getHours(hour.dt)}</b> </span>
            <span>{hour.temp} &#8451; </span>
            {hour.weather.map((weather, index) =>
              <span key={index}> 
              {weather.description}
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={`${weather.description}`
                }/>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather
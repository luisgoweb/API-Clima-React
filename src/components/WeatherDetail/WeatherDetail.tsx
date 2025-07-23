import type { weatherSchema } from "../../hooks/useWeather"
import styles from "./WeatherDetail.module.css"

type WeatherDetailProps = {
    weather: weatherSchema
}

const WeatherDetail = ({weather}: WeatherDetailProps) => {

    const formatTemperature = (temperature: number) => {
        const kelvin = 273.5
       return  parseInt( (temperature - kelvin).toString() )
    }

  return (
    <div className={styles.container}>
        <h2>El clima de: {weather.name}</h2>
        <p className={styles.current}>{ formatTemperature(weather.main.temp) }°C</p>
        <div className={styles.temperature}>
            <p>Min <span>{ formatTemperature(weather.main.temp_min) }°C</span> </p>
            <p>Max <span>{ formatTemperature(weather.main.temp_max) }°C</span> </p>
        </div>
       
    </div>
  )
}

export default WeatherDetail

import axios from "axios"
import type { SearchType } from "../types"


export const useWeather = () => {
    
    const fetchWeather = async (search: SearchType) => {
        

        try {
            const appId = '5738334d7396873b0bda0ea4824d0ab7'
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(geoUrl)
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}
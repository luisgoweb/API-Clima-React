import axios from "axios"
import { useMemo, useState } from "react"
import z from "zod"
import type { SearchType } from "../types"

const weatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

export type weatherSchema = z.infer<typeof weatherSchema>

export const useWeather = () => {

    const initialState = {
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }
    const [weather, setWeather] = useState<weatherSchema>(initialState)
    const[loading, setLoading] = useState(false)
    const[notFound, setNotfound] = useState(false)
    
    const fetchWeather = async (search: SearchType) => {
        setLoading(true)
        setWeather(initialState)
        setNotfound(false)
    
        try {
            const appId = import.meta.env.VITE_API_KEY
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(geoUrl)
            
            
            //Comprobar si la ciudad existe
            if(!data[0]){
                setNotfound(true)
                return
            }
            

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
           
            const {data: weatherResult} = await axios(weatherUrl)
            const result = weatherSchema.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
            }

            
            
            
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            

        }
    }

    const hasWeatherData = useMemo(()=> weather.name ,[weather])
    

    return {
        weather,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound
    }
}
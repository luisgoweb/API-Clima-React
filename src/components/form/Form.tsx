import { useState, type ChangeEvent, type FormEvent } from "react"
import { countries } from "../../data/countries"
import type { SearchType } from "../../types"
import Alert from "../alert/Alert"
import styles from "./Form.module.css"

type FormProps = {
fetchWeather: () => void
}

const Form = ({fetchWeather}: FormProps) => {


    const[search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const[alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.id] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }

        fetchWeather(search)


    }

  return (
    <form 
    className={styles.form}
    onSubmit={handleSubmit}
    >
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
            id="city"
            type="text"
            placeholder="Ciudad"
            value={search.city}
            onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">País:</label>
            <select 
            id="country"
            value={search.country}
            onChange={handleChange}
            > 
                <option value="">-- Seleccione un país --</option>
                {countries.map( country => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            /</select>
        </div>

        <input 
        type="submit"
        value="Consultar Clima"
        />

       {alert && <Alert >{alert}</Alert>}
    </form>
  )
}

export default Form

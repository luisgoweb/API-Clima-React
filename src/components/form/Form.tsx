import { useState, type ChangeEvent } from "react"
import { countries } from "../../data/countries"
import type { SearchType } from "../../types"
import styles from "./Form.module.css"


const Form = () => {
    const[search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.id] : e.target.value
        })
    }

  return (
    <form className={styles.form} >
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
    </form>
  )
}

export default Form

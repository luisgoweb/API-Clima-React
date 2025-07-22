import { countries } from "../../data/countries"
import styles from "./Form.module.css"


const Form = () => {
  return (
    <form className={styles.form} >
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
            id="city"
            type="text"
            placeholder="Ciudad"
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="city">País:</label>
            <select 
            id="city"
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

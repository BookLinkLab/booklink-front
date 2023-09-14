import { Autocomplete as AutocompleteMUI, TextField } from "@mui/material"
import "./styles.css"
import { useField } from "formik"

const Autocomplete = (props) => {
    const { options, label, name, placeholder } = props
    const [field, meta, helpers] = useField(name)

    const handleChange = (event, values) => {
        helpers.setValue(values) // Update the form field value
    }

    const helperTextFinal = meta.error ? meta.error : props.helpText

    return (
        <div className={"autocomplete-container"}>
            <label className="body2">{label}</label>
            <AutocompleteMUI
                multiple
                id="tags-filled"
                freeSolo
                name={name}
                options={options}
                value={field.value || []}
                onChange={handleChange}
                getOptionLabel={(option) => option.name || option}
                renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
            />
            <small className="body3 smallTextField">{helperTextFinal}</small>
        </div>
    )
}

export default Autocomplete

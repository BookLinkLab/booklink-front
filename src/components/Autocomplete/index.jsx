import { Autocomplete as AutocompleteMUI, TextField } from "@mui/material"
import "./styles.css"
import { useField } from "formik"

const Autocomplete = (props) => {
    const {
        options,
        label,
        name,
        placeholder,
        freeSolo = false,
        onTagChange,
        className,
        noOptionsText,
    } = props
    const [field, meta, helpers] = useField(name)

    const handleChange = (event, values) => {
        helpers.setValue(values) // Update the form field value
        if (onTagChange) {
            onTagChange(values)
        }
    }

    const helperTextFinal = meta.error ? meta.error : props.helpText

    return (
        <div className={"autocomplete-container" + " " + className}>
            <label className="body2">{label}</label>
            <AutocompleteMUI
                multiple
                id="tags-filled"
                freeSolo={freeSolo}
                name={name}
                noOptionsText={noOptionsText}
                options={options}
                value={field.value || []}
                onChange={handleChange}
                className={className}
                getOptionLabel={(option) => option.name || option}
                renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
            />
            <small className="body3 smallTextField">{helperTextFinal}</small>
        </div>
    )
}

export default Autocomplete

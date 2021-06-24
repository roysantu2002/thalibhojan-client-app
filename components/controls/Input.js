import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, variant, onChange, error = null, ...other } = props;
    return (
        <TextField
        inputProps={{style: {fontSize: '.9em'}}} // font size of input text
        InputLabelProps={{style: {fontSize: '.9em'}}} // font size of input label
            variant={variant || "outlined"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}

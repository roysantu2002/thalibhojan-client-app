import React, { useState } from 'react'

export function useForm(getFreshModelObject) {

    const [values, setValues] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {

        const { name, value } = e.target
        console.log(value)
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(getFreshModelObject());
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}


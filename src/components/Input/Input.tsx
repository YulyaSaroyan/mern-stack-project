import React from 'react'

interface InputProps {
    type: string,
    name: string,
    onChange: any,
    onBlur: any,
    value: string,
    placeholder: string
}

const Input = ({type, name, onChange, onBlur, value, placeholder}: InputProps) => {
    return (
        <input
            type={type} 
            name={name}
            onChange={onChange}
            onBlur={onBlur} 
            value={value}
            placeholder={placeholder}
        />
    )
}

export default Input
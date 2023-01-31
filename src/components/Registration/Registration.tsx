import axios from "axios"

import React, { useState, useEffect, useCallback, Suspense, lazy } from "react"
import { NavigateFunction, useNavigate } from "react-router"

import { Formik } from 'formik'
import * as yup from 'yup'
import UserPool from "../../UserPool"

import './Registration.css'

const Input = lazy(() => import('../Input/Input'))

const Registration = () => {
    const [codeStatus, setCodeStatus] = useState<number>(0)
    const [isNavigate, setIsNavigate] = useState<boolean>(false)

    const navigate: NavigateFunction = useNavigate()

    const register = useCallback(async ({ email, password }: { email: string; password: string }) => {
        if (email && password) {
            
            const res = await axios.post('http://localhost:4000/app/registration', {
                email,
                password
            })
            setCodeStatus(res.status)
            setIsNavigate(true)
        }
    }, [])

    const cognitoRegistration = ({ email, password }: { email: string; password: string }) => {
        UserPool.signUp(email, password, [], null!, (err, data) => {
            if (err) {
                console.log(err)
            } 
            console.log(data)
        })
    }

    const validationSchema = yup.object().shape({
        // email: yup.string().email('login is incorrect').required('this field is required *'),
        // password: yup.string().typeError('password is incorrect').required('this field id required *').matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //     "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        // ).matches(/^\S*$/, 'Whitespace is not allowed'),
        // confirmPassword: yup.string().typeError('password is incorrect').required('this field id required *').oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    useEffect(() => {
        if (codeStatus === 200 && isNavigate) {
            navigate('/')
        }
        setIsNavigate(false)
    }, [codeStatus, isNavigate, navigate])

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
            }}

            validateOnBlur

            validationSchema={validationSchema}

            onSubmit={(values) => {
                register(values)
                cognitoRegistration(values)
                
                values.email = ''
                values.password = ''
                values.confirmPassword = ''
            }}  
        >
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
            <div className="registration-center">
                {touched.password && errors.password && 
                errors.password === "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" && 
                <p>{errors.password}</p>}
                <div className="registration">

                    <form onSubmit={handleSubmit}>
                        <h3>Registration</h3>

                        <Suspense fallback={<div>Loading...</div>}>
                            <Input 
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="email"
                            />
                        </Suspense>

                        {touched.email && errors.email && <p>{errors.email}</p>}

                        <Suspense fallback={<div>Loading...</div>}>
                            <Input
                                type="password" 
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                value={values.password}
                                placeholder="password"
                            />
                        </Suspense>

                        {touched.password && errors.password && 
                        errors.password !== "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" &&
                        <p>{errors.password}</p>}
                        
                        <input
                            type="password" 
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            value={values.confirmPassword}
                            placeholder="confirmPassword"
                        />

                        {touched.password && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                        
                        <button disabled={!isValid && !dirty} type="submit">Registration</button>

                    </form>
                </div>
            </div>
        )}
        </Formik>
    )
}

export default Registration
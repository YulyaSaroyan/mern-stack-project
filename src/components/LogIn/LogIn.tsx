import axios from "axios"
import * as yup from "yup"
import { Formik } from "formik"

import React, { lazy, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import Pool from "../../UserPool"

import "./LogIn.css"

const Input = lazy(() => import("../Input/Input"))

const LogIn = () => {

  const [status, setStatus] = useState<boolean>(false)

  const navigate = useNavigate()

  const logIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post("http://localhost:4000/app/log-in", {
      email,
      password,
    })

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token)
      navigate("/user-account")
    }
  }, [navigate])

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()

      if (user) {
        user.getSession((err: any, session: any) => {
          if (err) {
            reject()
          } else {
            resolve(session)
          }
        })
      } else {
        reject()
      }
    })
  }

  useEffect(() => {
    getSession().then(session => {
      setStatus(true)
    })
  }, [])

  const cognitoLogIn = async ({ email, password }: { email: string; password: string }) => {
    return await new Promise((resolve: any, reject: any) => {
      const user = new CognitoUser({
        Username: email,
        Pool
      })
  
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      })
  
      const authObj = {
        onSuccess: (data: any) => {
          console.log('onSuccess: ', data)
          resolve(data)
        },
        onFailure: (err: any) => {
          console.error('onFailure: ', err)
          reject(err)
        },
        newPasswordRequired: (data: any) => {
          console.log('newPasswordRequired: ', data)
          resolve(data)
        }
      }
      user.authenticateUser(authDetails, authObj)
    })
  }

  const validationSchema = yup.object().shape({
    email: yup.string(),
    password: yup
      .string()
      .typeError("password is incorrect")
      .required("this field id required *"),
  })

  return (
    <>
      <p>{status ? 'logged in' : 'Please log in'}</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values) => {
          logIn(values)
          cognitoLogIn(values)
          
          values.email = ""
          values.password = ""
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <>
            <div className="log-in">
              <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="email"
                />

                {touched.email && errors.email && <p>{errors.email}</p>}

                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="password"
                />

                {touched.password && errors.password && <p>{errors.password}</p>}

                <button disabled={!isValid && !dirty} type="submit">
                  Log In
                </button>
              </form>
            </div>
          </>
        )}
      </Formik>
    </>
  )
}

export default LogIn

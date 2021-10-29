import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import styles from './Login.module.css';

interface IRegister {
  username: string;
  password: string;
}

export default function Register(): JSX.Element {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alert, setAlert] = useState<any>("")


  const register = () => {
    axios.post<IRegister>("http://localhost:8000/users/register", {
      username,
      password
    }, {
      withCredentials: true
    }).then((res : AxiosResponse) => {
      typeof(res.data)
      setAlert(res.data)
      if (res.data === "success") {
       window.location.href = "/login"
     }
    })
  }

  return (
    <>
    <a href="/" id={styles.back}>Back to quizes</a>
    <div className={styles.login_container}>
      <h1>Register</h1>
      {alert ? <span className={styles.alert}>{alert}</span> : null }
      <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)}/>
      <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <a href="/login">Already have account? Login</a>
    </div>
    </>
  )
}
import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import styles from './Login.module.css';

interface ILogin {
  username: string;
  password: string;
}
export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alert, setAlert] = useState<any>("")


  const login = () => {
    axios.post<ILogin>("http://localhost:8000/users/login", {
      username,
      password
    }, {
      withCredentials: true
    }).then((res : AxiosResponse) => {
     if (res.data === "success") {
       window.location.href = "/"
     }
    }, () => {
      setAlert("Invalid username or password")
    })
  }

  return (
    <>
    <a href="/" id={styles.back}>Back to quizes</a>
    <div className={styles.login_container}>
      <h1>Login</h1>
      {alert ? <span className={styles.alert}>{alert}</span> : null }
      <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} required/>
      <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} required/>
      <button onClick={login}>Login</button>
      <a href="/register">Don&apos;t have account? Register</a>
    </div>
    </>
  )
}
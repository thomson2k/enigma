import React, { FC, useEffect, useState } from 'react';
import ListCategory from './components/ListCategory';
import styles from './App.module.css';
import logo from "./images/logo.svg";
import Axios from "axios";

export interface IState {
  data: {
      category: string
      img: string
      questions: {
        questionName: string
        answers: {
          A: string
          B: string
          C: string
          D: string
        }
        correctAnswer: string
      }[]
  }[]
  isAuthenticated: boolean
}
const App = () => {
  const [data, setData] = useState<IState["data"]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get<IState[]>('http://localhost:8000/api/questions')
    .then((res:any) => {
      const data = res.data
      setData(data);
      setIsLoading(false);
    })
    .catch((err) => {
      setHasError(true)
      console.log(err)
    });
  }, []);


  return (
    <div className={styles.App}>
      <div id={styles.logo}><img src={logo} alt="logo" /></div>
      <span className={styles.login} onClick={()=> setIsAuthenticated(!isAuthenticated) }>{isAuthenticated ? "logout": "Login"  }</span>
        {hasError && <p>Something went wrong.</p>}
        {!isLoading ? <ListCategory setData={setData} data={data} isAuthenticated={isAuthenticated}/> : "loading"}

    </div>
  );
}

export default App;
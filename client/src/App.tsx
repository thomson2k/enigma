import React, { useEffect, useState, useContext } from 'react';
import ListCategory from './components/ListCategory';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import logo from "./images/logo.svg";
import Axios from "axios";
import { myContext } from './pages/Context';
import AdminPage from './pages/AdminPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { IQuestion } from './Interfaces/Interfaces';

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
  ctx: any
}
const App = (): JSX.Element => {
  const ctx = useContext(myContext);

  const [data, setData] = useState<IState["data"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const logout = () => {
    Axios.get("http://localhost:8000/users/logout", {
      withCredentials: true
    }).then((res: any) => {
      if (res.data === "success") {
        window.location.href = "/";
      }
    })
  }
  useEffect(() => {
    setIsLoading(true);

    Axios.get<IQuestion[]>('http://localhost:8000/api/questions')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setHasError(true)
      });
  }, []);


  return (
    <>
      <BrowserRouter>
        <Switch>
          {
            ctx ? (ctx!.isAdmin ? <Route path='/admin' component={AdminPage}></Route> : null) : null
          }
          <>
                <Route exact path='/login' component={Login}></Route>
                <Route exact path='/register' component={Register}></Route>
                <Route exact path='/'>
                  <div className={styles.App}>
                    <div id={styles.logo}><img src={logo} alt="logo" /></div>
                    <div className={styles.nav}>
                      {ctx ? ctx.isAdmin ? <a href="admin">Admin</a> : null : null}
                      <a href="login">{ctx ? <span onClick={logout}>Logout</span> : "Login"}</a>
                    </div>
                    {hasError && <p>Something went wrong.</p>}
                    {!isLoading ? <ListCategory setData={setData} data={data} ctx={ctx} /> : "loading"}
                  </div>
                </Route>
              </>
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
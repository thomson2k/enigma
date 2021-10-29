import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { UserInterface } from '../Interfaces/Interfaces'

export const myContext = createContext<Partial<UserInterface>>({})

const Context = (props: PropsWithChildren<any>) => {
  const [user,setUser] = useState<any | null>()
  useEffect(() => {
    Axios.get<UserInterface>("http://localhost:8000/users/user", { withCredentials: true })
    .then((res: AxiosResponse) => {
        setUser(res.data);
    })
  }, []);

  return (
    <myContext.Provider value={user!}>{props.children}</myContext.Provider>
    )
}
export default Context
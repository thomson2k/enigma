import React, { useEffect, useState, useContext } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { myContext } from './Context';
import { UserInterface, IQuestion } from '../Interfaces/Interfaces';

const AdminPage = (): JSX.Element =>{
  const ctx = useContext(myContext);

  const [data, setData] = useState<UserInterface[]>();
  const [question, setQuestion] = useState<IQuestion[]>();
  const [selectedUser, setSelectedUser] = useState<string>();
  const [selectedQuestion, setSelectedQuestion] = useState<string>();

  useEffect(() => {
    Axios.get<UserInterface>("http://localhost:8000/users/getallusers", {
      withCredentials: true
    }).then((res:any) => {
      setData(res.data.filter((item : UserInterface) => {
        return item.username !== ctx.username
      }))
    })
  }, [ctx]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/questions").then((res:any) => {
      setQuestion(res.data)
    })
  }, []);


  if (!data || !question) {
    return null!;
  }


  const deleteUser = () => {
    let userid : string;
    data.forEach((item: UserInterface) => {

      if (item.username === selectedUser) {
        userid = item.id;
      }
    })

    Axios.post("http://localhost:8000/users/deleteuser", {
      id: userid!
    }, {
      withCredentials: true
    });
  }

  const deleteQuestion = () => {
    let questionid : string;
    question.forEach((item: any) => {
      if (item.category === selectedQuestion) {
        questionid = item._id;
      }
    })

    Axios.post("http://localhost:8000/api/deletequestion", {
      id: questionid!
    }, {
      withCredentials: true
    });
  }
  return (
    <div>
      <h1>Hello Admin: {ctx.username} </h1>
      <p>Users</p>
      <select onChange={e => setSelectedUser(e.target.value)} name="deleteuser" id="deleteuser">
      <option id="select user">Select user to delete:</option>
        {
          data.map((item : UserInterface) => {
            return (
              <option key={item.username} id={item.username}>{item.username}</option>
            )
          })
        }
      </select>
      <button onClick={deleteUser}>Delete User</button>
      <h3>Questions</h3>
      <select onChange={e => setSelectedQuestion(e.target.value)} name="deleteuser" id="deleteuser">
      <option id="select user">select category to delete</option>
        {
          question.map((item : any) => {
            return (
              <option key={item.category} id={item.category}>{item.category}</option>
            )
          })
        }
      </select>
      <button onClick={deleteQuestion}>Delete question</button>
    </div>
  )
}
export default AdminPage
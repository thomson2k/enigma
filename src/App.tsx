import React, { FC, useState } from "react";
import ListCategory from './components/ListCategory';
import styles from './App.module.css';
import logo from "./images/logo.svg";

export interface IState {
  data: {
      category: string
      numberOfQuestions: number
      img: string
      questions: {
        question: string
        answer: string
      }[]
  }[]
}
const App = () => {
  const [data, setData] = useState<IState["data"]>([
    {
        category: "Typescipt",
        numberOfQuestions: 3,
        img: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/special_relativity-XtFWlC.png?width=160",
        questions: [
          {
            question: "What is love",
            answer: "asd"
          }
        ]
    },
    {
      category: "Javascript",
      numberOfQuestions: 10,
      img: "https://source.unsplash.com/random",
      questions: [
        {
          question: "What is love",
          answer: "asd"
        }
      ]
    },{
      category: "Rust",
      numberOfQuestions: 5,
      img: "https://source.unsplash.com/random/1",
      questions: [
        {
          question: "What is love",
          answer: "asd"
        }
      ]
    }
  ])
  return (
    <div className={styles.App}>
      <div id={styles.logo}><img src={logo} alt="logo" /></div>
      <ListCategory setData={setData} data={data} />
    </div>
  );
}

export default App;
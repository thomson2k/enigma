import React, { FC, useState } from "react";
import ListCategory from './components/ListCategory';
import styles from './App.module.css';
import logo from "./images/logo.svg";
import nodeIcon from "./images/nodejs-icon.svg";
import typescriptIcon from "./images/typescript.svg";
import pythonIcon from "./images/python.svg";
import rustIcon from "./images/rust.svg";
import javascriptIcon from "./images/javascript.svg";

export interface IState {
  data: {
      category: string
      numberOfQuestions: number
      img: string
      questions: {
        question: string
        answers: {
          A: string
          B: string
          C: string
          D: string
        }[]
        correctAnswer: string
      }[]
  }[]
}
const App = () => {
  const [data, setData] = useState<IState["data"]>([
    {
        category: "Node JS",
        numberOfQuestions: 3,
        img: `${nodeIcon}`,
        questions: [
          {
            question: "Inside which HTML element do we put the JavaScript?",
            answers: [{
              A: "<javascript>",
              B: "<scripting>",
              C: "<script>",
              D: "<js>"
            }],
            correctAnswer: "2",
          },
          {
            question: "Which programing language is used by Flutter",
            answers: [{
              A: "Ruby",
              B: "Dart",
              C: "C++",
              D: "Kotlin"
            }],
            correctAnswer: "1",
          },
          {
            question: "Who created Dart programing language?",
            answers: [{
              A: "Lars Bak and Kasper Lund",
              B: "Brendan Eich",
              C: "Bjarne Stroustrup",
              D: "Jeremy Ashkenas"
            }],
            correctAnswer: "0",
          }
        ]
    },
    {
      category: "Javascript",
      numberOfQuestions: 1,
      img: `${javascriptIcon}`,
      questions: [
        {
          question: "All of the following programs are classified as raster graphics editors EXCEPT:",
          answers: [{
            A: "Paint.NET",
            B: "GIMP",
            C: "Adobe Photoshop",
            D: "Inkscape"
          }],
          correctAnswer: "3",
        }
      ]
    },
    {
      category: "Typescript",
      numberOfQuestions: 1,
      img: `${typescriptIcon}`,
      questions: [
        {
          question: "All of the following programs are classified as raster graphics editors EXCEPT:",
          answers: [{
            A: "Paint.NET",
            B: "GIMP",
            C: "Adobe Photoshop",
            D: "Inkscape"
          }],
          correctAnswer: "3",
        }
      ]
    },{
      category: "Python",
      numberOfQuestions:1,
      img: `${pythonIcon}`,
      questions: [
        {
          question: "A Boolean value of &quot;0&quot; represents which of these words?A Boolean value of &quot;0&quot; represents which of these words?",
          answers: [{
            A: "False",
            B: "True",
            C: "horse",
            D: "pumpkin"
          }],
          correctAnswer: "1",
        }
      ]
    },
    {
      category: "Rust",
      numberOfQuestions:2,
      img: `${rustIcon}`,
      questions: [
        {
          question: "A Boolean value of &quot;0&quot; represents which of these words?A Boolean value of &quot;0&quot; represents which of these words?",
          answers: [{
            A: "False",
            B: "True",
            C: "horse",
            D: "pumpkin"
          }],
          correctAnswer: "1",
        },
        {
          question: "A Boolean value of &quot;0&quot; represents which of these words?A Boolean value of &quot;0&quot; represents which of these words?",
          answers: [{
            A: "False",
            B: "True",
            C: "horse",
            D: "pumpkin"
          }],
          correctAnswer: "1",
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
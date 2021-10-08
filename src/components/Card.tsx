import React, { useState } from 'react'
import styles from "./Card.module.css";
import { IState as Props } from "../App";

interface categoryProps {
    passSpecificCategory: {
        category: string
          numberOfQuestions: number
          img: string
          questions: {
            question: string
            answer: string
          }[]
    }[]
}

const Card: React.FC<categoryProps> = ({passSpecificCategory}) => {
    return (
        <div className={styles.Card}>
            <div className={styles.question_container}>
                <div className={styles.question}>
                    <span>1 - 10</span>
                    <p> 1.What is the highest mountain in the world?</p>
                </div>
            </div>
            <div className={styles.answer_container}>

            </div>
        </div>
    )
}

export default Card
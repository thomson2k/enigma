import React, { useState, useEffect} from 'react'
import styles from "./Card.module.css";
import { IState as Props } from "../App";
import Confetti from 'react-dom-confetti';

interface categoryProps {
    passSpecificCategory: {
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


const Card: React.FC<categoryProps> = ({ passSpecificCategory }) => {
    const [questionNo, setquestionNo] = useState(0)
    const [userAnswer, setUserAnswer] = useState('')
    const [count, setCount] = useState(100);
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false)
    const questions = passSpecificCategory[0].questions[questionNo].question;
    const answers = passSpecificCategory[0].questions[questionNo].answers[0];
    const correctAnswer = passSpecificCategory[0].questions[questionNo].correctAnswer;


    const config:any = {
        angle: "234",
        spread: 2000,
        startVelocity: "100",
        elementCount: "400",
        dragFriction: "0.2",
        duration: "5000",
        stagger: 5,
        width: "15px",
        height: "15px",
        perspective: "1000px",
        colors: score == 0 ? ["#FF0000"] : ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
      };

    useEffect(() => {
        if(count >= 0) {
            console.log(count);
            const timer = setTimeout(() => {
                setCount((count) => count - 1);
            }, 100);
            return () => clearTimeout(timer);
        }
    });

    const checkAnswer = (index:number) => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            const answerID = event.target as HTMLElement;
            setUserAnswer(answerID.id)

            if(answerID.id == correctAnswer) {
                setScore(score + 1)
            }
        }
    }


    useEffect(() => {
        if(passSpecificCategory[0].questions.length === (questionNo + 1) && (!!userAnswer || (count == 0))) {
            setCount(0)
            setFinish(true)
            return
        } else if(!!userAnswer || count == 0) {
            setTimeout(() => {
                setCount(100)
                setUserAnswer('')
                setquestionNo(questionNo + 1)
            },1000)
            setCount(100)
        }
    }, [count])

    const answersOutput = Object.values(answers).map((item, index) => (
        <div
        key={index}
        className={(index != parseInt(correctAnswer)) && (index == parseInt(userAnswer)) ? 'fail' : (index == parseInt(correctAnswer) && userAnswer == correctAnswer) ? 'success' : ''}
        id={`${index}`}
        onClick={!userAnswer ? checkAnswer(index) : undefined}>
            {item}
        </div>
    ))

    return (
        <div className={styles.Card}>
            <div className={styles.confetti}><Confetti active={ finish } config={ config } /></div>
            <div className={!finish ? styles.question_container : styles.question_container + " " + styles.full_height}>
                <div className={styles.question}>
                    <p> SCORE: {score}</p>
                    {!finish ? <><span className={styles.questionNo}>{questionNo + 1} of {passSpecificCategory[0].questions.length}</span>
                    <p>{questions}</p>
                    <span id={styles.progress_bar} className={count < 25 ? styles.red : ''} style={{width: `${count}%`}}></span></>:
                    null
                    }
                </div>
            </div>
           { !finish ?<div className={styles.answer_container}>
                {answersOutput}
                {/* {userAnswer ? <button disabled={!userAnswer ? true : false} className={styles.nextBtn} onClick={nextQuestion()}>Następne pytanie</button> : null} */}
            </div> : null}
        </div>
    )
}

export default Card
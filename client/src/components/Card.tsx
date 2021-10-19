import React, { useState, useEffect} from 'react'
import styles from "./Card.module.css";
import { IState as Props } from "../App";
import Confetti from 'react-dom-confetti';
import { parse } from 'path';

interface categoryProps {
    passSpecificCategory: {
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
}


const Card: React.FC<categoryProps> = ({ passSpecificCategory }) => {
    const [questionNo, setquestionNo] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [userIndex, setUserIndex] = useState('');
    const [count, setCount] = useState(100);
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false)
    const questions = passSpecificCategory[0].questions[questionNo].questionName;
    const answers = passSpecificCategory[0].questions[questionNo].answers;
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
            const timer = setTimeout(() => {
                if(!userAnswer) {
                    setCount((count) => count - 1);
                } else {
                    setCount((count) => count);
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    },[count]);


    const checkAnswer = (index:number) => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            const ev = event.target as HTMLElement;
            setUserIndex(ev.id);
            // tu lezy problem
            // user answer sie nadpisuje
            const answerID = parseInt(ev.id)

            switch (answerID) {
                case 0:
                    setUserAnswer("A")
                    break;
                case 1:
                    setUserAnswer("B")
                    break;
                case 2:
                    setUserAnswer("C")
                    break;
                case 3:
                    setUserAnswer("D")
                    break;
                default:
                    break;
            }
        }
    }
    useEffect(() => {
        if(userAnswer === correctAnswer) {
            setScore(score + 1)
        }
    }, [userAnswer])

    useEffect(() => {
        if(passSpecificCategory[0].questions.length === (questionNo + 1) && (!!userAnswer || (count == 0))) {
            setCount(0)
            setFinish(true)
            return
        } else if(!!userAnswer || count == 0) {
            setTimeout(() => {
                setUserAnswer('')
                setUserIndex('')
                setquestionNo(questionNo + 1)
                setCount(100)
            },1500)
        }
    }, [count])

    const answersOutput = Object.values(answers).map((item, index) => (
        <div
        key={index}
        className={(userAnswer != correctAnswer) && (index == parseInt(userIndex)) ? 'fail' : (index == parseInt(userIndex) && userAnswer == correctAnswer) ? 'success' : ''}
        id={`${index}`}
        // eslint-disable-next-line no-extra-boolean-cast
        onClick={!userAnswer ? checkAnswer(index) : null}>
            {item}
        </div>
    ))

    return (
        <>
        <div className={styles.Card}>
            <div className={styles.confetti}><Confetti active={ finish } config={ config } /></div>
            <div className={!finish ? styles.question_container : styles.question_container + " " + styles.full_height}>
                <div className={styles.question}>
                    <p className={styles.score}> SCORE: {score}</p>
                    {!finish ? <><span className={!userAnswer ? styles.questionNo : styles.next_round + " " + styles.questionNo}>{questionNo + 1} of {passSpecificCategory[0].questions.length}</span>
                    <p>{questions}</p>
                    <span id={styles.progress_bar} className={count < 25 ? styles.red : ''} style={{width: `${count}%`}}></span></>:null
                    }
                </div>
            </div>
           { !finish ?<div className={styles.answer_container}>
                {answersOutput}
            </div> : null}
        </div>
        </>
    )
}

export default Card
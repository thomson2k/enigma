import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Question from '../models/question';

const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const { category, img, questionName, A, B, C, D, correctAnswer} = req.body;

    let categoryExist = await Question.find({ category: category });

    if(typeof categoryExist !== 'undefined' && categoryExist.length > 0) {

        Question.updateOne(
            { category: category },
            { $addToSet: { questions: {
                id: new mongoose.Types.ObjectId(),
                questionName: questionName.toUpperCase(),
                answers: {
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                },
                correctAnswer: correctAnswer.toUpperCase(),
            } } },
            function(err:any, result:any):void {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
    } else {
        const question = new Question({
            category: category,
            img: img,
            questions: [{
                id: new mongoose.Types.ObjectId(),
                questionName: questionName,
                answers: {
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                },
                correctAnswer: correctAnswer,
            }]
        });

        return question
            .save()
            .then((result) => {
                return res.status(201).json({
                    question: result
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    }
};

const getAllQuestions = (req: Request, res: Response, next: NextFunction) => {
    Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
};

export default { createQuestion, getAllQuestions };
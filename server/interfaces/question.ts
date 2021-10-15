import { Document } from 'mongoose';

export default interface IQuestion extends Document {
    category: string,
    img: string,
    questions: [{
        questionName: string,
        answers: {
            A: string,
            B: string,
            C: string,
            D: string,
        },
        correctAnswer: string,
     }],
}
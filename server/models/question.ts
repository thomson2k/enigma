import mongoose, { Schema } from 'mongoose';
import IQuestion from '../interfaces/question';

const QuestionSchema: Schema = new Schema(
    {
        category: { type: String, required: true },
        img: { type: String, required: true },
        questions: [{
            questionName: { type: String, required: true },
            answers: {
                A: {type: String, required: true},
                B: {type: String, required: true},
                C: {type: String, required: true},
                D: {type: String, required: true},
            },
            correctAnswer: {type: String, required: true},
         }],
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IQuestion>('Question', QuestionSchema);
export interface UserInterface {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface IQuestion  {
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
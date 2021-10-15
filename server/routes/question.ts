import express from 'express';
import controller from '../controllers/question';

const router = express.Router();

router.post('/create/question', controller.createQuestion);
router.get('/questions', controller.getAllQuestions);

export = router;
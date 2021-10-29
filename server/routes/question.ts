import express from 'express';
import controller from '../controllers/question';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/create/question', auth, controller.createQuestion);
router.get('/questions', controller.getAllQuestions);
router.post('/deletequestion', auth, controller.deletequestion);

export = router;
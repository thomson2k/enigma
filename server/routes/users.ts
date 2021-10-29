import express from 'express';
import controller from '../controllers/users';
import auth from '../middleware/auth';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate("local"), controller.login);
router.get('/logout',  controller.logout);
router.get('/user',  controller.user);
router.get('/getallusers', auth, controller.getallusers);
router.post('/deleteuser', auth, controller.deleteuser);


export = router;
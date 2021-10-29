import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './models/User'
import dotenv from 'dotenv';
import { UserInterface, DatabaseUserInterface } from './interfaces/user';
import questionRoute from './routes/question';
import usersRoute from './routes/users';
import auth from './middleware/auth';

const LocalStrategy = passportLocal.Strategy
const PORT = 8000;

dotenv.config();
const uri:any = process.env.ATLAS_URI;

mongoose
    .connect(uri)
    .then((result) => {
      console.log('Mongo Connected');
    })
    .catch((error) => {
        console.log(error)
    });

// Middleware
const app = express();
app.use(express.json({limit: "10mb"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Passport
passport.use(new LocalStrategy((username: string, password: string, done) => {
  User.findOne({ username: username }, (err:any, user: DatabaseUserInterface) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user: any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err:any, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id
    };
    cb(err, userInformation);
  });
});


// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req?.body;
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    res.send("Invalid Values");
    return;
  }
  User.findOne({ username }, async (err:any, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success")
    }
  })
});

app.listen(PORT, () => {
  console.log(`👽 Server is running at http://localhost:${PORT}`);

  app.use('/api', questionRoute);
  app.use('/users', usersRoute);

});
export default auth
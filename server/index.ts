import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import questionRoute from './routes/question';
const router = express();

const app = express();

dotenv.config();

const PORT = 8000;
app.get('/', (req,res) => res.send('Express + TypeScript Server'));


const uri:any = process.env.ATLAS_URI;

mongoose
    .connect(uri)
    .then((result) => {
      console.log('Mongo Connected');
    })
    .catch((error) => {
        console.log(error)
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next();
});

app.listen(PORT, () => {
  console.log(`👽 Server is running at http://localhost:${PORT}`);

  app.use('/api', questionRoute);

});
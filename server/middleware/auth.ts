import User from '../models/User'
import express, { Request, Response, NextFunction } from 'express';
import { UserInterface, DatabaseUserInterface } from '../interfaces/user';

const auth = (req: Request, res: Response, next: NextFunction) => {
    const { user }: any = req;
    if (user) {
      User.findOne({ username: user.username }, (err:any, doc: DatabaseUserInterface) => {
        if (err) throw err;
        if (doc?.isAdmin) {
          next();
        }
        else {
          res.send("Access denied, need admin to perform this action")
        }
      })
    }
    else {
      res.send("Access required")
    }
  }
  export default auth;
import User from '../models/User';
import { UserInterface, DatabaseUserInterface } from '../interfaces/user';

const login = (req:any, res:any) => {
  res.send("success")
};

const logout = (req:any, res:any) => {
  req.logout();
  res.send("success")
}

const user = (req:any, res:any) => {
  res.send(req.user);
};

const getallusers = async (req:any, res:any) => {
    await User.find({}, (err, data: DatabaseUserInterface[]) => {
      if (err) throw err;
      const filteredUsers: UserInterface[] = [];
      data.forEach((item: DatabaseUserInterface) => {
        const userInformation = {
          id: item._id,
          username: item.username,
          isAdmin: item.isAdmin
        }
        filteredUsers.push(userInformation);
      });
      res.send(filteredUsers);
    })
  };

const deleteuser = async (req:any, res:any) => {
  const { id } = req?.body;
  await User.findByIdAndDelete(id, (err:any) => {
    if (err) throw err;
  });
  res.send("success");
};

export default { login, logout, user, getallusers, deleteuser };
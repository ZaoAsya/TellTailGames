import { Request, Response } from 'express';
import User from '../../models/user';
import { hashCode } from '../../utils';

export const getUser = (req: Request, res: Response) => {
  const { login, password } = req.body;
  const secret = String(hashCode(`${login}+${password}`));
  User.findOne({
    attributes: ['id', 'login', 'password', 'avatar'],
    where: {
      login,
      password: secret
    },
  }).then((user: User | null) => {
    if (user) {
      res.send(user).json();
    } else {
      res.send({message: 'Неправильный логин или пароль'}).json();
    }
  });
};

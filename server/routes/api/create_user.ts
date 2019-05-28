import { Request, Response } from 'express';
import cloudinaryDB from '../../cloudinaryDB';
import User from '../../models/user';
import { hashCode } from '../../utils';

export const createUser = (req: Request, res: Response) => {
  const { login, password } = req.body;
  let { avatar } = req.body;
  avatar = avatar
    ? avatar
    : 'https://avatars.mds.yandex.net/get-pdb/1352825/2adee258-b8fb-419a-bab6-25d26a6be61e/s1200';
  const secret = String(hashCode(`${login}+${password}`));
  if (login.search(/[^a-zA-Z0-9-]/) !== -1) {
    res.send({ message: 'Логин может содержать только символы "a-Z", "0-9" и "-"' });
    return;
  }
  User.findOne({
    attributes: ['id', 'login', 'password', 'avatar'],
    where: {
      login,
    },
  }).then((user: User | null) => {
    if (user) {
      res.send({ message: 'Пользователь с таким логином уже существует' }).json();
      return;
    }
    cloudinaryDB
      .upload(avatar)
      .then((imgUrl: string) => User.create<User>({ login, password: secret, avatar: imgUrl }))
      .then((newUser: User) => {
        newUser.$set('adventures', []);
        const result = {
          avatar: newUser.avatar,
          id: newUser.id,
          login,
        };
        res.send(result).json();
      });
  });
};

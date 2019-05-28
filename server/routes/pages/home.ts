import { Request, Response } from 'express';
import Adventure from '../../models/adventure';
import Hashtag from '../../models/hashtag';
import User from '../../models/user';

const home = (req: Request, res: Response) => {
  Adventure.findAll<Adventure>({
    attributes: ['id', 'name', 'picture', 'description', 'firstSceneId'],
    include: [
      {
        attributes: ['id', 'nameRu', 'nameEn'],
        model: Hashtag,
        through: { attributes: [] },
      },
      {
        attributes: ['id', 'login', 'password', 'avatar'],
        model: User,
      }
    ],
    limit: 5,
  }).then((adventures: Adventure[]) => {
    const newAdv = adventures.map((adv) => ({
      description: adv.description,
      firstSceneId: adv.firstSceneId,
      id: adv.id,
      name: adv.name,
      picture: adv.picture,
      tags: adv.tags,
      users: adv.users.map((user: any) => ({
        adventures: user.adventures,
        avatar: user.avatar,
        id: user.id,
        login: user.login,
        password: user.password,
        winsCount: user.AdventureUser.winCount}))
    }));
    res.renderPage('/home', { title: 'home', adventures: newAdv });
  });
};

export default home;

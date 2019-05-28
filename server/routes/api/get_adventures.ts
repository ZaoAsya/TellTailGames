import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import Adventure from '../../models/adventure';
import Hashtag from '../../models/hashtag';
import User from '../../models/user';

export const getAdventures = (req: Request, res: Response, next: NextFunction) => {
  const { text, tags, advIndex } = req.body;
  Adventure.findAll({
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
      },
    ],
    where: {
      id: { [Op.gt]: advIndex },
      [Op.or]: {
        description: { [Op.substring]: text },
        name: { [Op.substring]: text },
      },
    },
  }).then((adventures: Adventure[]) => {
    let result: any = adventures || [];
    const tagsIds = tags.map((tag: Hashtag) => tag.id);
    if (tags.length) {
      result = adventures.filter((adventure: Adventure) =>
        adventure.tags.some((tag: Hashtag) => tagsIds.includes(+tag.id))
      );
    }
    result = result.map((adv: Adventure) => ({
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
        winsCount: user.AdventureUser.winCount,
      })),
    }));
    res.send(result.slice(0, 5)).json();
  });
};

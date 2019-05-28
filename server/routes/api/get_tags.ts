import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Hashtag from '../../models/hashtag';

export const getTags = (req: Request, res: Response) => {
  const { request } = req.body;
  Hashtag.findAll({
    attributes: ['id', 'nameEn', 'nameRu'],
    where: {
      nameRu: {
        [Op.substring]: request,
      },
    },
  }).then((tags: Hashtag[]) => res.send(tags).json());
};

import { Request, Response } from 'express';
import Adventure from '../../models/adventure';
import Hashtag from '../../models/hashtag';

const tagRoute = (req: Request, res: Response) => {
  const { tagName } = req.params;
  Hashtag.findOne<Hashtag>({
    attributes: ['nameRu', 'nameEn'],
    include: [
      {
        attributes: ['id', 'name', 'picture', 'description', 'firstSceneId'],
        include: [
          {
            attributes: ['nameRu', 'nameEn'],
            model: Hashtag,
            through: { attributes: [] },
          },
        ],
        model: Adventure,
      },
    ],
    where: {
      nameEn: tagName,
    },
  }).then((tag: any) => {
    if (tag) {
      res.renderPage('/home', { title: `${tag.nameRu}`, adventures: tag.adventures });
    } else {
      res.renderPage('/error', { status: 404, text: 'Такой страницы нет...' });
    }
  });
};

export default tagRoute;

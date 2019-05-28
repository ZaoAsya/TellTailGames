import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Achieve from '../../models/achive';
import Action from '../../models/action';
import Adventure from '../../models/adventure';
import Scene from '../../models/scene';

const sceneRoute = (req: Request, res: Response) => {
  const { sceneId } = req.params;
  if (!Number(sceneId)) {
    res.renderPage('/error', { status: 404, text: 'Такой страницы нет...' });
  }
  Promise.all([
    Scene.findOne<Scene>({
      attributes: ['id', 'description', 'picture'],
      include: [
        {
          attributes: ['id', 'name', 'picture'],
          model: Achieve,
          through: { attributes: [] },
        },
      ],
      where: {
        id: sceneId,
      },
    }),
    Action.findAll({
      attributes: ['id', 'name', 'curSceneId', 'nextSceneId'],
      where: {
        curSceneId: sceneId,
      },
    }),
  ]).then(([scene, actions]) => {
    if (scene) {
      const final = actions.some((action: Action) => action.name.trim() === 'Начать заново');
      getAdventureId(scene.id).then((id: number | null) =>
        res.renderPage('/scene', {
          achieves: scene.achieves,
          actions,
          adventureId: id,
          description: scene.description,
          final,
          picture: scene.picture,
        })
      );
    } else {
      res.renderPage('/error', { status: 404, text: 'Такой страницы нет...' });
    }
  });
};

async function getAdventureId(sceneId: number) {
  const adventures: Adventure[] = (await Adventure.findAll<Adventure>({
    attributes: ['id'],
    where: {
      firstSceneId: { [Op.lte]: sceneId },
    },
  })) as Adventure[];
  return adventures[adventures.length - 1].id;
}

export default sceneRoute;

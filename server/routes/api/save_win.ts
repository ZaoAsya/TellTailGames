import { Request, Response } from 'express';
import AdventureUser from '../../models/adventure_user';

export const saveWin = (req: Request, res: Response) => {
  const { adventureId, userId } = req.body;
  AdventureUser.findOne<AdventureUser>({
    attributes: ['advId', 'userId', 'winCount'],
    where: {
      advId: adventureId,
      userId,
    },
  }).then((result: AdventureUser | null) => {
    if (result) {
      result.winCount = result.winCount + 1;
      result.save();
    } else {
      AdventureUser.create<AdventureUser>({ advId: adventureId, userId, winCount: 1 });
    }
    res.send({ message: 'OK' }).json();
  });
};

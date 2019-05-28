import React, { Component } from 'react';
// @ts-ignore
import cookie from 'react-cookies';
import { AchieveComponent } from '../components/achieve';
import { ActionComponent } from '../components/action';
import Achieve from '../server/models/achive';
import Action from '../server/models/action';
import { fetchData } from '../server/utils';
import '../static/styles/scene.css';

interface SceneProps {
  adventureId: number;
  picture: string;
  description: string;
  final: boolean;
  achieves: Achieve[];
  actions: Action[];
}

export default class SceneComponent extends Component<SceneProps> {
  static getInitialProps({req, query}: any) {
    const picture = query.picture;
    const description = query.description;
    const final = query.final;
    const achieves = query.achieves;
    const actions = query.actions;
    const adventureId = query.adventureId;

    return {picture, description, achieves, actions, final, adventureId };
  }

  saveWin = (userId: number) => {
    const {adventureId} = this.props;
    fetchData('/api/save_win', {adventureId, userId});
  }

  render() {
    const {picture, description, achieves, actions, final} = this.props;
    const user = cookie.load('userCookie');
    if (final && user) {
      this.saveWin(user.id);
    }
    return (
      <article className="scene">
        <section className="scene__content">
          <div className="scene__content-pic"
               style={{backgroundImage: 'url(' +
                   (picture ? picture :
                     'https://images.wallpaperscraft.ru/image/pyatna_tekstura_fon_poverhnost_50559_1680x1050.jpg')
                   + ')'}}>
          </div>
          <p className="scene__content-desc">{ description }</p>
        </section>
        {achieves ? (
          <article className="scene-achieves">
            {achieves.map((achieve: Achieve) => (
              <AchieveComponent name={achieve.name}
                                picture={achieve.picture}
                                key={achieve.id}/>
            ))}
          </article>
        ) : ''}
        <section className="scene-actions">
          {actions.map((action: Action) => (
            <ActionComponent name={action.name}
                             nextSceneId={action.nextSceneId}
                             key={action.id}/>
          ))}
        </section>
        {final && user ? (
          <div className="scene-final">Пользователь {user.login} прошел приключение!</div>
        ) : ''}
      </article>
    );
  }
}

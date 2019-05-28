import Link from 'next/link';
import React from 'react';
import Hashtag from '../../server/models/hashtag';
import User from '../../server/models/user';
import { TagComponent } from '../tag';
import { UserComponent } from '../user';
import './index.css';

interface AdventureProps {
  picture: string;
  name: string;
  description: string;
  firstSceneId: number;
  tags: Hashtag[];
  users: User[];
}

export const AdventureComponent = ( {picture, name, description, firstSceneId, tags, users}: AdventureProps ) => {

  return (
      <section className="adventures-item">
        <Link href={`/scene/${firstSceneId}`}>
          <div className="adventures-item__pic"
               style={{backgroundImage: 'url(' +
                   ( picture ? picture :
                   'https://images.wallpaperscraft.ru/image/pyatna_tekstura_fon_poverhnost_50559_1680x1050.jpg')
                   + ')'}}>
          </div>
        </Link>
        <section className="adventures-item__info">
          <Link href={`/scene/${firstSceneId}`}>
            <a className="adventures-item__info-name">{ name }</a>
          </Link>
          {description ? (
          <p className="adventures-item__info-desc">{ description }</p>
          ) : '' }
          {users ? (
            <section className="adventures-item__info-users">
              {users.map((user: any) => (
                <UserComponent login={user.login}
                               avatar={user.avatar}
                               winsCount={user.winsCount}
                               key={user.id}/>
              ))}
            </section>
          ) : ''}
          {tags ? (
            <section className="adventures-item__info-tags">
              {tags.map((tag: Hashtag) => (
              <TagComponent nameRu={tag.nameRu}
                            nameEn={tag.nameEn}
                            key={tag.id}/>
              ))}
            </section>
          ) : ''}
        </section>
      </section>
  );
};

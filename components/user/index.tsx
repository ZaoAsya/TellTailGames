import React from 'react';
import './index.css';

interface UserProps {
  login: string;
  avatar: string;
  winsCount: number;
}

export const UserComponent = ({login, avatar, winsCount}: UserProps) => {
  return (
    <div style={{backgroundImage: 'url(' + avatar + ')'}}
         className='user'
         title={login}>
      {winsCount === 1 ? '' : (
        <div className='user__wins'>{winsCount}</div>
      )}
    </div>
  );
};

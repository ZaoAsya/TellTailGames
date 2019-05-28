import Link from 'next/link';
import React from 'react';
// @ts-ignore
import cookie from 'react-cookies';
import './index.css';

interface HeaderProps {
  isAuthorised: boolean;
  username: string;
  avatar: string;
}

export const Header = ({isAuthorised, username, avatar}: HeaderProps) => {
  function logOut() {
    cookie.remove('userCookie');
    window.location.replace('/authorization');
  }

  return (
    <article>
      <div className="header">
      <Link href="/">
        <section className="header-item">
          <div className="header-item__icon pink"
               style={{backgroundImage:
                   "url(https://i.pinimg.com/originals/f8/ca/01/f8ca01c659965a0aef8208b9371a206b.png)"}} />
          <p className="header-item__title pink">TellTail</p>
          <p className="header-item__title black">Games</p>
        </section>
      </Link>
      {isAuthorised ? (
        <section className="header-user">
          <div className="header-user__pic" style={{backgroundImage: 'url(' + avatar + ')'}} />
          <p className="header-user__name">{username}</p>
          <button className="header-user__button button-grey" onClick={logOut}>Выйти</button>
        </section>
      ) : (
        <section className="header-user">
          <Link href="/registration"><a className="button-grey">Зарегистрироваться</a></Link>
          <Link href="/authorization"><a className="button-pink">Войти</a></Link>
        </section>
      )}
      </div>
      <hr />
    </article>
  );
};

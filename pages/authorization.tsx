import React, { ChangeEvent, Component, FormEvent } from 'react';
// @ts-ignore
import cookie from 'react-cookies';
import { fetchData } from '../server/utils';
import '../static/styles/auth-page.css';

export default class AuthorizationForm extends Component {
  state = {
    error: '',
    login: '',
    password: '',
  };

  authoriseUser = (e: FormEvent<HTMLFormElement>) => {
    const { login, password } = this.state;
    e.preventDefault();
    fetchData('/api/login', { login, password }).then((value: any) => {
      if (value.message) {
        this.setState({ error: value.message });
      } else {
        cookie.save('userCookie', value);
        window.location.replace('/');
      }
    });
  }

  onChangeField = (field: string, e: ChangeEvent<HTMLInputElement>) => {
    const { login, password } = this.state;
    this.setState({
      login: field === 'login' ? e.target.value : login,
      password: field === 'password' ? e.target.value : password,
    });
  }

  componentWillMount = () => {
    const user = cookie.load('userCookie');
    if (user) {
      window.location.replace('/');
    }
  }

  render() {
    const { error } = this.state;
    return (
      <article className="auth-page">
        <p className="auth-page__title">Вход</p>
        <form className="auth-page__form" onSubmit={this.authoriseUser}>
          <input
            type="text"
            required
            placeholder="Логин"
            pattern="[a-zA-Z0-9-]+"
            className="auth-page-form__input"
            onChange={this.onChangeField.bind(this, 'login')}
          />
          <input
            type="password"
            required
            placeholder="Пароль"
            className="auth-page-form__input"
            onChange={this.onChangeField.bind(this, 'password')}
          />
          <input type="submit"
                 value="Войти"
                 className="auth-page-form__submit button-pink" />
        </form>
        {error ? <p className="auth-page__error">{error}</p> : ''}
      </article>
    );
  }
}

import React, { ChangeEvent, Component, FormEvent } from 'react';
// @ts-ignore
import cookie from 'react-cookies';
import { fetchData, getBase64 } from '../server/utils';
import '../static/styles/auth-page.css';

export default class RegistrationForm extends Component {
  state = {
    avatar: '',
    error: '',
    loading: false,
    login: '',
    password: '',
  };

  componentWillMount = () => {
    const user = cookie.load('userCookie');
    if (user) {
      window.location.replace('/');
    }
  }

  onChangeField = (field: string, e: ChangeEvent<HTMLInputElement>) => {
    if (field === 'avatar') {
      this.setState({loading: true});
      getBase64((e as any).target.files[0]).then((base64: any) => {
        this.setState({avatar: base64, loading: false});
      });
    } else {
      if (field === 'login') {
        this.validateLogin(e.target.value);
      }
      this.setState({[field]: e.target.value});
    }
  }

  validateLogin = (value: string) => {
    const isValidLogin = value.search(/[^a-zA-Z0-9-]/) === -1;
    this.setState({ error: isValidLogin ? '' : 'Логин может содержать только символы "a-Z", "0-9" и "-"'});
  }

  registerNewUser = async (e: FormEvent<HTMLFormElement>) => {
    const {avatar, login, password, error} = this.state;
    e.preventDefault();
    if (!error) {
      fetchData('/api/new_user', {login, password, avatar}).then((value) => {
        if (value.message) {
          this.setState({error: value.message});
        } else {
          cookie.save('userCookie', value);
          window.location.replace('/');
        }
      });
    }
  }

  render() {
    const {error, loading} = this.state;
    return (
      <article className="auth-page">
        <p className="auth-page__title">Регистрация</p>
        <form className="auth-page__form" onSubmit={this.registerNewUser}>
          <input type="text"
                 required
                 placeholder="Логин"
                 pattern="[a-zA-Z0-9-]+"
                 className="auth-page-form__input"
                 onChange={this.onChangeField.bind(this, 'login')}/>
          <input type="password"
                 required
                 placeholder="Пароль"
                 className="auth-page-form__input"
                 onChange={this.onChangeField.bind(this, 'password')}/>
          <input type="file"
                 className="auth-page-form__file"
                 onChange={this.onChangeField.bind(this, 'avatar')}/>
          <input type="submit"
                 value="Зарегистрироваться и войти"
                 className={`auth-page-form__submit button-pink ${loading ? 'loading' : ''}`} />
        </form>
        {loading ? (
          <p className="auth-page__error">Загрузка картинки</p>
        ) : ''}
        {error ? (
            <p className="auth-page__error">{error}</p>
          ) : ''}
      </article>
    );
  }
}

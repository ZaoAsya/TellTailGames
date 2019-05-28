import Head from 'next-server/head';
import App, {Container, NextAppContext} from 'next/app';
import React from 'react';
// @ts-ignore
import cookie from 'react-cookies';
import { Header } from '../components/header';
import './app.css';

export default class MyApp extends App {
  static async getInitialProps({Component, ctx}: NextAppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  state = {
    avatar: '',
    isAuthorised: false,
    username: '',
  };

  componentWillMount() {
    const user = cookie.load('userCookie');
    if (user) {
      this.setState({isAuthorised: true, username: user.login, avatar: user.avatar});
    } else {
      this.setState({isAuthorised: false, username: '', avatar: ''});
    }
  }

  render() {
    const {Component, pageProps} = this.props;
    const {isAuthorised, username, avatar} = this.state;
    return (
      <Container>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Gabriela" rel="stylesheet" />
        </Head>
        <Header isAuthorised={isAuthorised} username={username} avatar={avatar}/>
        <Component {...pageProps}/>
      </Container>
    );
  }
}

import { Component } from 'react';
import React from 'react';
import '../static/styles/error.css';

interface ErrorProps {
  status: number;
  text: string;
}

export default class ErrorComponent extends Component<ErrorProps> {
  static getInitialProps({req, query}: any) {
    const status = query.status;
    const text = query.text;
    return {status, text };
  }

  render() {
    return (
      <section className="error">
        <p className="error-item__message">{this.props.status}. {this.props.text}</p>
        <div className="error-item__pic" style={{backgroundImage: "url(https://ur-l.ru/iKt)"}}/>
      </section>
    );
  }
}

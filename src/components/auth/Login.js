import React from 'react';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { auth } from './Auth';
import { MOLogo } from '../svgs';

export default class Login extends React.Component {
  state = {
    loading: false,
    redirectToReferrer: false,
  };

  login = (data) => {
    console.log(data);
    console.log('Logging in ' + data.username);
    this.setState({
      loading: true,
    });
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          auth.authenticate(() => {
            this.setState({
              redirectToReferrer: true,
              loading: false,
            });
          });
        } else {
          res.json().then((body) => {
            alert(`Unable to login: ${body.error}`);
            this.setState({
              loading: false,
            });
          });
        }
      })
      .catch((err) => {
        console.error('Error logging in.', err);
      });
  };

  render() {
    const style = {
      container: {
        height: '300px',
      },
      warning: {
        textAlign: 'center',
        border: 'none',
      },
    };

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-form">
        <div className="form-wrapper">
          <div className="logo-wrapper">
            <MOLogo />
          </div>
          <Loading loading={this.state.loading}>
            <LoginForm onLogin={this.login} />
          </Loading>
        </div>
        <div className="left-content">
          <div className="text-stripe">
            <div className="logo-vertical">
              <img src="/MO-secondary-logo-colour.webp" alt="Logo Vertical" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

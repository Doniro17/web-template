import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserData } from '../store/actions';
import Input from './Input';
import API from '../utils/API';

const LoginForm = ({ dispatch }) => {
  const history = useHistory();
  const [formUser, setFormUser] = useState({
    login: '',
    password: '',
  });
  const { login, password } = formUser;
  function onChangeLogin(event) {
    const {
      target: { value },
    } = event;
    setFormUser({
      password,
      login: value,
    });
  }
  function onChangePassword(event) {
    const {
      target: { value },
    } = event;
    setFormUser({
      login,
      password: value,
    });
  }

  function onSend(event) {
    const loginToSystem = async () => {
      event.preventDefault();
      await API.post(
        'users/login',
        {
          username: login,
          password,
        },
        {
          withCredentials: true,
        },
      )
        .then((result) => {
          console.log(result.data.id);
          dispatch(
            setUserData({
              id: result.data.id,
              login,
              roles: result.data.role,
            }),
          );
          if (result.data.role.includes('client')) {
            history.push('/products');
          } else {
            history.push('/deliveries');
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
            // eslint-disable-next-line no-alert
            alert('Incorrect email or password');
          }
        });
    };
    loginToSystem();
  }
  return (
    <form onSubmit={onSend} className="login__form" data-testid="login-form">
      <h2 className="form__title">Login</h2>
      <div className="form__inputs">
        <Input
          type="text"
          value={login}
          onChange={onChangeLogin}
          placeholder="email"
          className="form__input"
          labelStyle="container"
        />
        <br />
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="password"
          className="form__input"
          labelStyle="container"
        />
        <br />
        <Input type="submit" value="Login" className="form__submit" />
      </div>
    </form>
  );
};

export default connect()(LoginForm);

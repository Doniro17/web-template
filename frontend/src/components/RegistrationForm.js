import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import API from '../utils/API';

export default function RegistrationForm() {
  const history = useHistory();
  const [state, setState] = useState({
    login: '',
    password: '',
    email: '',
    phone: '',
    client: false,
    courier: false,
    role: [],
  });
  const { login, password, email, phone, role, client, courier } = state;

  function handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setState((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  }
  function onSend(event) {
    const loginToSystem = async () => {
      if (client) role.push('client');
      if (courier) role.push('courier');
      await API.post('users/register', {
        username: login,
        password,
        email,
        phone,
        balance: 0,
        role,
      })
        .then(() => {
          history.push('/login');
        })
        .catch((e) => {
          if (e.response.status === 400) {
            // eslint-disable-next-line no-alert
            alert('WIP');
          }
        });
    };
    loginToSystem();
    event.preventDefault();
  }
  return (
    <form onSubmit={onSend} className="login__form">
      <h2 className="form__title">Registration</h2>
      <Input
        label="Client"
        labelStyle="container"
        type="checkbox"
        value={client}
        onChange={handleChange}
        className="form__checkbox"
        name="client"
      />
      <Input
        label="Courier"
        labelStyle="container"
        type="checkbox"
        value={courier}
        onChange={handleChange}
        className="form__checkbox"
        name="courier"
      />
      <Input
        type="text"
        value={login}
        onChange={handleChange}
        placeholder="login"
        className="form__input"
        name="login"
      />
      <Input
        type="text"
        value={email}
        onChange={handleChange}
        placeholder="email"
        className="form__input"
        name="email"
      />
      <br />
      <Input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="password"
        className="form__input"
        name="password"
      />
      <Input
        type="text"
        value={phone}
        onChange={handleChange}
        placeholder="phone"
        className="form__input"
        name="phone"
      />
      <br />
      <Input type="submit" value="Register" className="form__submit" name="submitButton" />
    </form>
  );
}

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../scenes/NotFound';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import ConnectedHeader from '../components/ConnectedHeader';
import ConnectedProductList from '../components/ConnectedProductList';
import ConnectedOrderList from '../components/ConnectedOrderList';
import Test from '../components/Test';

function App() {
  return (
    <div style={{ paddingTop: '100px' }}>
      <ConnectedHeader />
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/register">
          <RegistrationForm />
        </Route>
        <Route exact path="/products">
          <ConnectedProductList />
        </Route>
        <Route exact path="/orders">
          <ConnectedOrderList />
        </Route>
        <Route exact path="/deliveries">
          <Test />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/components/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserProducts from './products/pages/UserProduct';
import NewProduct from './products/pages/NewProduct';
import Login from './users/pages/Login';
import { AuthContext } from './shared/context/auth-context';
import MainNavigation2 from './shared/components/Navigation/MainNavigation2';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);


  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/products" exact>
          <UserProducts />
        </Route>
        <Route path="/products/new" exact>
          <NewProduct />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        {/* <Route path="/" exact>
          <Users />
        </Route> */}
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            {routes}
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

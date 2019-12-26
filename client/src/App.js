import React , { useEffect } from 'react';
import './App.css';
import { Route , Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRouting/PrivateRoute';
//Comps.
import Nav from './components/layout/Nav';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

//Is there an User to load?
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App(){
  useEffect(() => {
    store.dispatch(loadUser());
  }, 
  []);
  return (
    <>
    <Provider store={store}>
      <Nav />
      <Route exact path='/' render={() => <Landing />}/>
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path='/login' render={() => <Login/>}/>
          <Route exact path='/register' render={() => <Register/>}/>
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        </Switch>
      </section>
    </Provider>
    </>
  );
}

export default App;

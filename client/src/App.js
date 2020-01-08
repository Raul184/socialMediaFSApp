import React , { useEffect } from 'react';
import './App.css';
import { Route , Switch } from 'react-router-dom';
//Comps.
import Nav from './components/layout/Nav';
import Landing from './components/layout/Landing';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
//routes
import Routes from './components/privateRouting/Routes'


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
      <Switch>
        <Route exact path='/' render={() => <Landing />}/>
        <Route component={Routes} />
      </Switch>
    </Provider>
    </>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Route , Switch } from 'react-router-dom';
//Comps.
import Nav from './components/layout/Nav';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


function App() {
  return (
    <>
      <Nav />
      <Route exact path='/' render={() => <Landing />}/>
      <section className="container">
        <Switch>
          <Route exact path='/login' render={() => <Login/>}/>
          <Route exact path='/register' render={() => <Register/>}/>
        </Switch>
      </section>
    </>
  );
}

export default App;

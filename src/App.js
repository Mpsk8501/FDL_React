import React from 'react';
import Main from "./Pages/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import {Redirect, Route, Switch} from "react-router-dom";
import Menu from "./Pages/Menu/Menu";
import CartModal from "./Components/CartModal/CartModal";
import AuthModal from "./Components/AuthModal/AuthModal";



function App() {


  return (
      <>
        <AuthModal/>
        <CartModal/>
        <Header/>
          <Switch>
            <Route path={'/restoraunt/:id'}>
              <Menu/>
            </Route>
            <Route exact path={'/'}>
              <Main/>
            </Route>
            <Redirect to={'/'}/>
          </Switch>
        <Footer/>
      </>
  );
}

export default App;

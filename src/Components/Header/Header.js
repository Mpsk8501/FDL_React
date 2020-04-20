import React from 'react';
import classes from './Header.module.scss'
import Input from "../UI_Grid/Input/Input";
import Button from "../UI_Grid/Button/button";
import {useHistory} from "react-router-dom";

import {cartOpen} from "../../ReduxStore/actions/cartActions";
import {useDispatch, useSelector} from "react-redux";
import {authOpen} from "../../ReduxStore/actions/authAction";


const Header = () => {
  const history = useHistory();
  const goHome=()=>{
    history.push('/')
  };
  const dispatch = useDispatch();
  const cartHandler = () =>{
    dispatch(cartOpen())
  };

  const authHandler = () =>{
    dispatch(authOpen())
  };

  const inCart = useSelector(state=>state.cart.inCart);
  const inCartLength = Object.keys(inCart).length

  return (
      <div className="container">
      <header className={classes.header}>
          <img onClick={goHome} src="../../img/logo.svg" alt="logo"/>
          <Input
              type="text"
              placeholder="Адрес доставки"
          />
          <div className={classes.block}>
            <Button
                onClick={authHandler}
                icon={"../../img/user.svg"}
                type={'primary'}
                text={'Войти'}
            />
            <Button
                onClick={cartHandler}
                icon={"../../img/shopping-cart.svg"}
                text={'Корзина'}
            />
            <span
                className={!inCartLength ? classes.inCartCount:`${classes.inCartCount} ${classes.inCart}`}>
              {inCartLength}</span>
        </div>

      </header>
      </div>
  );
};

export default Header;
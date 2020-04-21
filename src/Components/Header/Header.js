import React from 'react'
import classes from './Header.module.scss'
import Input from '../UI_Grid/Input/Input'
import Button from '../UI_Grid/Button/button'
import { useHistory } from 'react-router-dom'

import { cartOpen } from '../../ReduxStore/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { authOpen, logout } from '../../ReduxStore/actions/authAction'

const Header = () => {
  const cart = useSelector(state => state.cart.cart)
  const token = useSelector(state => state.auth.token)
  const cartLength = Object.keys(cart).length
  const history = useHistory()
  const isAdmin = useSelector(state => state.auth.isAdmin)

  const goHome = () => {
    history.push('/')
  }
  const dispatch = useDispatch()
  const cartHandler = () => {
    if (!isAdmin) {
      dispatch(cartOpen())
    } else {
      history.push('/admin')
    }
  }

  const authHandler = () => {
    token ? dispatch(logout()) : dispatch(authOpen())
  }

  return (
    <div className="container">
      <header className={classes.header}>
        <img onClick={goHome} src="https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Flogo.svg?alt=media&token=c0efa3ae-4f09-4dd4-a4ce-901e99e9ab24" alt="logo"/>
        <Input
          type="text"
          placeholder="Адрес доставки"
        />
        <div className={classes.block}>
          <Button
            onClick={authHandler}
            icon={'https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Fuser.svg?alt=media&token=9b14306b-c21c-4fc7-bfa5-3c721cdac542'}
            type={!token ? 'primary' : 'inCart'}
            text={!token ? 'Войти' : 'Выйти'}
          />
          <Button
            onClick={cartHandler}
            icon={'https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Fshopping-cart.svg?alt=media&token=8b5df32e-f918-4510-b8fb-d3f288618cd2'}
            text={'Корзина'}
          />
          {<span
            className={!cartLength ? classes.inCartCount : `${classes.inCartCount} ${classes.inCart}`}>
            {cartLength}</span>}
        </div>

      </header>
    </div>
  )
}

export default Header

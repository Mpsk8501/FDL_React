import React, { useState } from 'react'
import Modal from '../../HOC/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addFromCart, cartClose, createOrder, removeFromCart, resetCart } from '../../ReduxStore/actions/cartActions'
import classes from './CartModal.module.scss'
import Button from '../UI_Grid/Button/button'

const CartModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.cart.isOpen)
  const restorants = useSelector(state => state.restorants.restorants)
  const cartItems = useSelector(state => state.cart.cart)

  const btnDisabled = useSelector(state => state.cart.isBlock)

  const token = useSelector(state => state.auth.token)

  const [message, setmessage] = useState(null)

  const newCart = []
  let amount = 0

  if (cartItems && isOpen) {
    const restorantsMenu = restorants.map((item) => {
      return item.menu
    })
    const rty = []
    restorantsMenu.forEach((item) => {
      if (item) {
        rty.push(...item)
      }
    })
    for (const item in cartItems) {
      const newElem = rty.filter(elem =>
        elem.id.toString() === item
      )
      newCart.push(...newElem)
    }
    amount = newCart.reduce((previousValue, item) => {
      return (item.itemPrice * cartItems[item.id] + previousValue)
    }, 0)
  }

  const addItem = (e) => {
    dispatch(addFromCart(e.target.getAttribute('data-id')))
  }

  const removeItem = (e) => {
    dispatch(removeFromCart(e.target.getAttribute('data-id')))
  }

  const orderHandler = () => {
    if (!newCart.length) {
      setmessage('Добавте товары в корзину')
      setTimeout(() => {
        setmessage(null)
      }, 1000)
    } else {
      if (!token) {
        setmessage('Войдите в аккаунт или зарегистрируйтесь')
        setTimeout(() => {
          setmessage(null)
        }, 1000)
      } else {
        const orderList = {}
        const cart = JSON.parse(localStorage.getItem('cart'))
        newCart.forEach((item) => {
          orderList[item.id] = {
            imgUrl: item.imgUrl,
            title: item.title,
            score: cart[item.id],
            itemPrice: item.itemPrice,
            total: cart[item.id] * item.itemPrice
          }
        })
        orderList.amount = amount
        const order = {
          cart: orderList,
          userName: localStorage.getItem('userName'),
          userPhone: localStorage.getItem('userPhone'),
          useId: localStorage.getItem('userId')
        }
        dispatch(createOrder(order)).then(() => {
          setmessage(`Поздравляем ${localStorage.getItem('userName')} заказ оформлен!`)
          setTimeout(() => {
            setmessage(null)
            dispatch(cartClose())
            dispatch(resetCart())
          }, 1000)
        }).catch((e) => {
          setmessage(`${e.message}`)
          setTimeout(() => {
            setmessage(null)
          }, 1000)
        })
      }
    }
  }

  return (
    <Modal title={'Корзина'} isOpen={isOpen} onClose={cartClose}>
      <div style={{ minHeight: 150 }}>

        {
          message
            ? <div className={classes.message}>{message}</div>
            : newCart.map((item) => (
              <div key={item.id} className={classes.foods}>
                <div className={classes.name}>
                  {item.title}
                </div>
                <div className={classes.price}>
                  <strong>{item.itemPrice * cartItems[item.id]} ₽</strong>
                </div>
                <div className={classes.amount}>
                  <button disabled={btnDisabled} data-id={item.id} onClick={removeItem} className={classes.counterBtn}>-</button>
                  <span>{cartItems[item.id]}</span>
                  <button disabled={cartItems[item.id] === +item.maxScore || btnDisabled} data-id={item.id} onClick={addItem}
                    className={classes.counterBtn}>+
                  </button>
                </div>
              </div>
            ))
        }

      </div>
      <div className={classes.footer}>
        <span className={classes.totalPrice}>
          {amount} ₽
        </span>
        <div className={classes.btnBlock}>
          <Button onClick={orderHandler} type={'primary'} text={'Оформить заказ'}/>
          <Button text={'Отмена'} close={true}/>
        </div>
      </div>
    </Modal>
  )
}

export default CartModal

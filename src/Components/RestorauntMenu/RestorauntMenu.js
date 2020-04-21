import React from 'react'
import classes from '../Restoraunts/Restoraunts.module.scss'
import CardMenu from '../Card/CardMenu'
import { useDispatch, useSelector } from 'react-redux'
import { addFromCart, removeFromCart } from '../../ReduxStore/actions/cartActions'
import Button from '../UI_Grid/Button/button'
import { delMenuOneItem, openModalMenu } from '../../ReduxStore/actions/adminAction'

const RestorauntMenu = props => {
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()
  const isInCart = id => !!cart[id]
  const isAdmin = useSelector(state => state.auth.isAdmin)
  const cartBtnHandler = (id) => {
    if (isAdmin) {
      return null
    }
    if (isInCart(id)) {
      dispatch(removeFromCart(id, true))
    } else {
      dispatch(addFromCart(id))
    }
  }
  const addMenuItem = () => {
    dispatch(openModalMenu(props.index))
  }

  const deleteMenuHandler = index => {
    if (isAdmin) {
      const conf = window.confirm('Вы хотите удалить блюдо?')
      if (conf) {
        dispatch(delMenuOneItem(props.index, index))
      }
    }
  }

  return (
    <div className="container">
      <section className={`${classes.restoraunts} ${classes.menu}`}>
        <div className={classes.heading}>
          <h2 className={classes.title}>
            {props.header.title}
          </h2>
          <div className={classes.info}>
            <div className={classes.rating}>
              {props.header.rating}
            </div>
            <div className={classes.price}>
                От {props.header.minPrice} ₽
            </div>
            <div className={classes.category}>
              {props.header.category}
            </div>
          </div>
        </div>
        <div className={classes.cards}>
          {props.cards
            ? props.cards.map((card, index) => {
              return <CardMenu
                onRightClick={deleteMenuHandler}
                index={index}
                inCart={isInCart(card.id)}
                onClick={cartBtnHandler}
                key={index}
                options={card}/>
            })
            : null
          }

        </div>
        {isAdmin &&
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button text={'Добавить блюдо'} onClick={addMenuItem}/>
          </div>}
      </section>
    </div>
  )
}

export default RestorauntMenu

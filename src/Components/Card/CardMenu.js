import React from 'react'
import classes from './Card.module.scss'
import Button from '../UI_Grid/Button/button'
import { useSelector } from 'react-redux'

const Card = props => {
  const btnDisabled = useSelector(state => state.cart.isBlock)

  const cardStyle = [classes.card,
    classes.card2
  ].join(' ')

  const onClickHandler = () => {
    props.onClick(props.options.id)
  }

  const clickHandler = e => {
    if (e.nativeEvent.which === 3) {
      e.preventDefault()
      props.onRightClick(props.index)
    }
  }

  return (
    <div className={cardStyle}
      onMouseDown={clickHandler}
    >
      <img className={classes.image} src={props.options.imgUrl} alt="food"/>
      <div className={classes.text}>
        <div className={classes.heading}>
          <h3 className={classes.title}>
            {props.options.title}
          </h3>
        </div>
        <div className={classes.info}>
          <div className={classes.ingredients}>
            {props.options.ingredients}
          </div>
          <div className={classes.cart}>
            <Button
              disabled={btnDisabled}
              onClick={onClickHandler}
              text={ !props.inCart
                ? 'В корзину' : 'В корзине'}
              type={
                !props.inCart
                  ? 'primary' : 'inCart'}
              iconAfter={'https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Fshopping-cart.png?alt=media&token=02337d8f-3793-48ee-a9de-d582cb33626e'}
            />

            <div className={classes.itemPrice}>
              {props.options.itemPrice}₽
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

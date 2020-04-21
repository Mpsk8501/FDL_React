import React from 'react'
import classes from './Card.module.scss'

const Card = props => {
  const clickHandler = e => {
    if (e.nativeEvent.which === 3) {
      e.preventDefault()
      props.onRightClick(props.index)
    }
  }

  return (
    <div
      // style={{transitionDelay: `${props.delay}ms`}}
      onClick={props.onClick}
      onMouseDown={clickHandler}
      className={classes.card}>
      <img className={classes.image} src={props.options.imgUrl} alt="food"/>
      <div className={classes.text}>
        <div className={classes.heading}>
          <h3 className={classes.title}>
            {props.options.menuHeader.title}
          </h3>
          <span>{props.options.time} мин</span>
        </div>
        <div className={classes.info}>
          <div className={classes.rating}>
            {props.options.menuHeader.rating}
          </div>
          <div className={classes.price}>
              От {props.options.menuHeader.minPrice} ₽
          </div>
          <div className={classes.category}>
            {props.options.menuHeader.category}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

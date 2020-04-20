import React from 'react';
import classes from './Card.module.scss'
import Button from "../UI_Grid/Button/button";

const Card = props => {

  const cardStyle = [classes.card,
    classes.card2
  ].join(' ');

  const onClickHandler = () =>{

    props.onClick({
      id:props.options.id,
      title:props.options.title,
      maxScore:props.options.maxScore,
      price:props.options.itemPrice,
      score:1
    })
  };

  return (
      <div className={cardStyle}>
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
                  onClick={onClickHandler}
                text={ !props.inCart?
                    'В корзину':'В корзине'}
                type={
                  !props.inCart?
                  'primary':'inCart'}
                iconAfter={'../../img/shopping-cart.png'}
              />

              <div className={classes.itemPrice}>
                {props.options.itemPrice}₽
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
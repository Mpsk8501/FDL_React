import React from 'react';
import classes from "../Restoraunts/Restoraunts.module.scss";
import CardMenu from "../Card/CardMenu";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../ReduxStore/actions/cartActions";


const RestorauntMenu = props => {

  const inCart = useSelector(state=>state.cart.inCart);
  const dispatch = useDispatch();

  const cartBtnHandler = (cartItem) =>{
    dispatch(addItem(cartItem));
  };



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
            {props.cards.map((card,index)=> {
               return <CardMenu
                   inCart={inCart[card.id]}
                   onClick={cartBtnHandler}
                   key={index}
                   options={card}/>
            })}

          </div>
        </section>
      </div>
  );
};

export default RestorauntMenu;
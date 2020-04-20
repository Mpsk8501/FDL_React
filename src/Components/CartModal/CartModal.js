import React from 'react';
import Modal from "../../HOC/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {removeOneItem, cartClose, addOneItem} from "../../ReduxStore/actions/cartActions";
import classes from './CartModal.module.scss'
import Button from "../UI_Grid/Button/button";

const CartModal = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector(state=>state.cart.isOpen);
  let cart = useSelector(state=>state.cart.cart);
  const amount = cart.reduce((previousValue,item)=>{
    return (item.price*item.score + previousValue)
  },0);


  const addItem = (e) =>{
    dispatch(addOneItem(e));
  };


  const removeItem = (e) =>{
    dispatch(removeOneItem(e))
  };





  return (
      <Modal title={'Корзина'} isOpen={isOpen} onClose={cartClose}>
        <div style={{minHeight:150}}>
          {

            cart.map((item)=>(
              <div key={item.id} className={classes.foods}>
                <div className={classes.name}>
                  {item.title}
                </div>
                <div className={classes.price}>
                  <strong>{item.price*item.score} ₽</strong>
                </div>
                <div className={classes.amount}>
                  <button data-id={item.id} onClick={removeItem} className={classes.counterBtn}>-</button>
                  <span>{item.score}</span>
                  <button disabled={item.score===item.maxScore} data-id={item.id} onClick={addItem} className={classes.counterBtn}>+</button>
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
            <Button type={'primary'} text={'Оформить заказ'}/>
            <Button text={'Отмена'} close={true} />
          </div>
        </div>
      </Modal>
  );
};

export default CartModal;
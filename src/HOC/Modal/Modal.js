import React from 'react';
import classes from './modal.module.scss'
import {useDispatch} from "react-redux";


const Modal = props => {

  const dispatch = useDispatch();

  const modalOnClickHandler = e =>{

    const close = e.target.getAttribute('data-close');
    if(close){
      dispatch(props.onClose())
    }

  };
  return (
      <>
        {props.isOpen
            ?<div onClick={modalOnClickHandler} className={classes.modal}>
                <div data-close="true"   className={classes.wrapper}>
                  <div className={classes.dialog}>
                    <div className={classes.header}>
                      <h3>
                        {props.title || 'Корзина'}
                      </h3>
                      <button data-close="true" className={classes.close}>&times;</button>
                    </div>
                    {props.children||'Children'}
                  </div>
                </div>
             </div>
            :null
          }
      </>
  );
};

export default Modal;
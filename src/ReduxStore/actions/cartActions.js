import {CART_OPEN, CART_CLOSE, ADD_REMOVE_TO_CART, RESET_CART, ADD_BTN_TO_CART, REMOVE_BTN_TO_CART} from "../types";

export function cartOpen() {
  return {
    type: CART_OPEN
  }
}

export function cartClose() {
  return {
    type: CART_CLOSE
  }
}

export function addRemoveToCart(newCart) {
  return {
    type: ADD_REMOVE_TO_CART,
    newCart,
  }
}

export function resetCart() {
  return {
    type: RESET_CART,
  }
}



export const addItem = (cartItem) => {
  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    let newCart = [...cart,cartItem];
    const isInCart = cart.find(item => item.id === cartItem.id);
    if(!isInCart){
      dispatch(addBtnToCart(cartItem.id));
      dispatch(addRemoveToCart(newCart))
    }else{
       newCart = cart.filter((item)=>
        item.id!==cartItem.id);

      const inCart=getState().cart.inCart;
      delete inCart[cartItem.id];

      dispatch(removeBtnToCart(inCart));
      dispatch(addRemoveToCart(newCart))
    }

  }
};



export const addOneItem = (e) => {
  const id = +e.target.getAttribute('data-id');
  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    const newCart = [...cart];
    newCart.forEach((item) => {
      if (item.id === id) {
        item.score++;
      }
    });
    dispatch(addRemoveToCart(newCart))
  }
};

export const removeOneItem = (e) => {

  const id = +e.target.getAttribute('data-id');

  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    const newCart = [...cart];
    newCart.forEach((item, index) => {
      if (item.id === id) {
        item.score--;
        if (item.score <= 0) {
          newCart.splice(index, 1);

          const inCart=getState().cart.inCart;
          delete inCart[item.id];
          dispatch(removeBtnToCart(inCart));
        }
      }
    });
    dispatch(addRemoveToCart(newCart))
  }
};

export function addBtnToCart(item) {
  return {
    type: ADD_BTN_TO_CART,
    item,
  }
}
export function removeBtnToCart(item) {
  return {
    type: REMOVE_BTN_TO_CART,
    item,
  }
}



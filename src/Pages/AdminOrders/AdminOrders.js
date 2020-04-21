import React, { useEffect } from 'react'

import classes from './adminOrders.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../ReduxStore/actions/adminAction'

/* const orders = {
  hffudd:{
    cart:{
      1111:{
        imgUrl:"../../img/cards_img_rest/1.png",
        itemPrice:450,
        score:1,
        title:'Ролл111',
        total:450
      },
      1141:{
        imgUrl:"../../img/cards_img_rest/5.png",
        itemPrice:500,
        score:1,
        title:'Ролл111',
        total:500
      },
      amount:950
    },
    userName:'Kirill',
    userPhone:"+790833432"
  },
  hffhgjghj:{
    cart:{
      1114:{
        imgUrl:"../../img/cards_img_rest/2.png",
        itemPrice:450,
        score:2,
        title:'Ролл111',
        total:900
      },
      amount:900
    },
    userName:'john',
    userPhone:"+79084556"
  }
}; */

const AdminOrders = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const orders = useSelector(state => state.admin.orders)
  console.log(orders)

  return (
    <div className='container'>
      <section className={classes.adminOrders}>
        <h2>Список заказов</h2>
        <div className={classes.orderCards}>
          {
            Object.keys(orders).map((item, index) => (
              <div key={index} className={classes.orderCard}>
                <div className={classes.title}>
                  <h3>ID заказа: <i>{item}</i></h3>
                  <h3>User ID: <i>{orders[item].useId}</i></h3>
                  <h3>Имя: <i>{orders[item].userName}</i></h3>
                  <h3>Телефон: <i>{orders[item].userPhone}</i></h3>
                </div>
                <div className={classes.body}>
                  {
                    Object.keys(orders[item].cart).map((cartItem, index) => {
                      const cart = orders[item].cart
                      const inner = cartItem === 'amount'
                        ? <div className={classes.total}>Итого:{cart[cartItem]}</div>
                        : <>
                          <div><img src={cart[cartItem].imgUrl} alt={cart[cartItem].title}/></div>
                          <div>{cart[cartItem].title}</div>
                          <div>Цена:{cart[cartItem].itemPrice}</div>
                          <div>Количество:{cart[cartItem].score}</div>
                          <div>Суммма:{cart[cartItem].total}</div>
                        </>
                      return <div key={index} className={classes.item}>
                        {inner}
                      </div>
                    })
                  }
                </div>
              </div>
            ))
          }
        </div>
      </section>

    </div>
  )
}

export default AdminOrders

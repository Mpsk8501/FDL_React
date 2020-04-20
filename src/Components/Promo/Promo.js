import React from 'react';
import classes from './promo.module.scss'

const Promo = () => {
  return (
      <div className="container">
        <section className={classes.promo}>

            <h1 className={classes.title}>
              Онлайн-сервис <br/> доставки еды на дом
            </h1>
            <p className={classes.text}>
              Блюда из любимого ресторана привезет курьер в перчатках, маске и с антисептиком
            </p>
        </section>
      </div>
  );
};

export default Promo;
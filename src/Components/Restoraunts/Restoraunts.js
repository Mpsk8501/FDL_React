import React from 'react';
import classes from './Restoraunts.module.scss'
import Card from "../Card/Card";
import Input from "../UI_Grid/Input/Input";
import {useHistory} from "react-router-dom";
import Loader from "../Loader/Loader";



const Restoraunts = props => {

  const history = useHistory();
  const goRestorauntHandler = id => {
    history.push(`/restoraunt/${id}`)
  };

  return (<div className="container">
              <section className={classes.restoraunts}>
                <div className={classes.heading}>
                  <h2 className={classes.title}>
                    Рестораны
                  </h2>
                  <Input placeholder="Поиск блюд и ресторанов"/>
                </div>
                <div className={classes.cards}>
                  {props.loading
                      ? <div style={{margin:'0 auto'}}><Loader/></div>
                      : props.cards.map((card, index) => (
                            <Card onClick={() => goRestorauntHandler(card.id)} key={index} options={card}/>
                        ))
                  }
                </div>
              </section>
            </div>);
};

export default Restoraunts;
import React from 'react'
import classes from './Restoraunts.module.scss'
import Card from '../Card/Card'
import Input from '../UI_Grid/Input/Input'
import { useHistory } from 'react-router-dom'
// import Loader from "../Loader/Loader";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Button from '../UI_Grid/Button/button'
import { useDispatch, useSelector } from 'react-redux'
import { delRestorant, openModalRestorant } from '../../ReduxStore/actions/adminAction'

const Restoraunts = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const goRestorauntHandler = id => {
    history.push(`/restoraunt/${id}`)
  }

  const isAdmin = useSelector(state => state.auth.isAdmin)

  const addRestorant = () => {
    dispatch(openModalRestorant())
  }
  const deleteRestorant = index => {
    if (isAdmin) {
      const conf = window.confirm('Вы хотите удалить ресторан?')
      if (conf) {
        dispatch(delRestorant(index))
      }
    }
  }

  return (<div className="container">
    <section className={classes.restoraunts}>
      <div className={classes.heading}>
        <h2 className={classes.title}>
                    Рестораны
        </h2>
        <Input placeholder="Поиск блюд и ресторанов"/>
      </div>
      <TransitionGroup className={classes.cards}>
        {props.cards.map((card, index) => {
          const delay = 1000 * (index / 10)
          return <CSSTransition
            classNames={'card'}
            key={index}
            timeout={400}
          >
            <Card index={index}
              delay={delay}
              onClick={() => goRestorauntHandler(card.id)}
              onRightClick={deleteRestorant}
              options={card}/>

          </CSSTransition>
        })
        }
      </TransitionGroup>
      {isAdmin && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button text={'Добавить ресторан'} onClick={addRestorant}/>
      </div>}
    </section>

  </div>)
}

export default Restoraunts

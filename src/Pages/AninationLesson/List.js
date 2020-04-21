import React from 'react'
import './list.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const List = ({ items, onRemove }) => {
  return (
    <div className={'list'}>
      <TransitionGroup component={'ul'}>
        {
          items.map(item => (
            <CSSTransition
              classNames={'os'}
              key={item.id}
              timeout={750}
            >
              <li onClick={() => onRemove(item.id)} >{item.title}</li>
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    </div>
  )
}

export default List

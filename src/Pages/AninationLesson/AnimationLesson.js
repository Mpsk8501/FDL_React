import React, { useState } from 'react'

import { Transition, CSSTransition } from 'react-transition-group'
import './AnimationLesson.scss'
import List from './List'

const AnimationLesson = () => {
  const [toggle, setToggle] = useState(true)
  const [toggle2, setToggle2] = useState(true)

  const [items, setItems] = useState([
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 3' },
    { id: 3, title: 'Item 3' }
  ])

  const removeItem = id => {
    setItems(items.filter(i => i.id !== id))
  }
  const addItem = () => {
    const title = prompt('enter item title')
    const id = Date.now()
    setItems(items.concat([{ title, id }]))
  }

  return (
    <div className={'animation'}>
      <div className={'container'}>
        <button onClick={() => setToggle(!toggle)}>Toggle</button>
        <button onClick={() => setToggle2(!toggle2)}>Toggle2</button>
        <hr/>
        <div className={'blocks'}>
          <Transition
            in={toggle}
            timeout={{
              enter: 1000,
              exit: 500
            }}
            mountOnEnter
            unmountOnExit
            onEnter={() => console.log('1')}
            onEntering={() => console.log('2')}
            onEntered={() => console.log('3')}
            onExit={() => console.log('4')}
            onExiting={() => console.log('5')}
            onExited={() => console.log('6')}
          >
            {state => <div className={`square blue ${state}`}>{state}</div>}

          </Transition>
          <CSSTransition
            timeout={1000}
            in={toggle2}
            mountOnEnter
            unmountOnExit
            classNames={'os'}

          >
            <div className="square orange">{toggle2.toString()}</div>
          </CSSTransition>
          <button onClick={addItem}>Add Item</button>
        </div>
        <List items={items} onRemove={removeItem}/>
      </div>
    </div>
  )
}

export default AnimationLesson

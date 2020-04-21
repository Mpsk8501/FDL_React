import React from 'react'
import classes from './component404.module.scss'

import { useHistory } from 'react-router-dom'

const Component404 = () => {
  const history = useHistory()
  const goHomeHandler = e => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <div className={classes.component404}>
      <div className={classes.notfound}>
        <div className={classes.notfound404}>
          <h1>Oops!</h1>
          <h2>404 - Страница не найдена</h2>
        </div>
        <a onClick={goHomeHandler} href="/">Домой</a>
      </div>
    </div>
  )
}

export default Component404

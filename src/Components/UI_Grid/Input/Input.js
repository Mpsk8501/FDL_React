import React from 'react'
import classes from './input.module.scss'

const Input = props => {
  return (
    <input
      className={classes.input}
      type={props.type || 'text'}
      placeholder={props.placeholder || false}
    />
  )
}

export default Input

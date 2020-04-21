import React from 'react'
import classes from './Input.module.scss'

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched
}

const AuthInput = (props) => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}_${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  cls.push(props.class)

  return (
    <div className={cls.join(' ')}>
      <label htmlFor="">{props.label}</label>
      <input
        onChange={props.onChange}
        value={props.value}
        id={htmlFor}
        type={inputType}/>
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Add correct value'}</span>
          : null
      }

    </div>
  )
}

export default AuthInput

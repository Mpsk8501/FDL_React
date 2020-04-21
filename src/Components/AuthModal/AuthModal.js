import React, { useState } from 'react'
import Modal from '../../HOC/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { auth, authClose, register } from '../../ReduxStore/actions/authAction'
import AuthInput from '../UI_Grid/AuthInput/AuthInput'
import Button from '../UI_Grid/Button/button'
import classes from './authModal.module.scss'
import { validate, validateForm } from '../../Helpers/formHelpers'

const AuthModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.auth.isOpen)
  const error = useSelector(state => state.auth.error)

  const [isLogin, setIsLogin] = useState(true)

  const form = {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите верный адрес почты',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Минимум шесть символов',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }
  const registerForm = {
    name: {
      value: '',
      type: 'text',
      label: 'Имя',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 2
      }
    },
    phone: {
      value: '',
      type: 'tel',
      label: 'Телефон',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 2
      }
    },
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите верный адрес почты',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Минимум шесть символов',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }

  const [formControl2, changeFormControl2] = useState(registerForm)
  const [formControl, changeFormControl] = useState(form)

  const [isFormValid, changeFormValid] = useState(false)
  const [isFormValid2, changeFormValid2] = useState(false)
  const onChangeHandler = (event, controlName) => {
    const form = isLogin ? formControl : formControl2
    const formControls = { ...form }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control

    const isFormValid = validateForm(formControls)

    if (isLogin) {
      changeFormControl(formControls)
      changeFormValid(isFormValid)
    } else {
      changeFormControl2(formControls)
      changeFormValid2(isFormValid)
    }
  }

  const loginHandler = () => {
    if (!isLogin) {
      setIsLogin(true)
      return
    }

    dispatch(
      auth(
        formControl.email.value,
        formControl.password.value,
        true))
  }

  const registerHandler = () => {
    if (isLogin) {
      setIsLogin(false)
      return
    }
    dispatch(
      register(
        formControl2.email.value,
        formControl2.password.value,
        formControl2.name.value,
        formControl2.phone.value))
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  const renderInputs = (form) => {
    return Object.keys(form).map((controlName, index) => {
      const control = form[controlName]
      return (
        <AuthInput
          onChange={event => onChangeHandler(event, controlName)}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          label={control.label}
          touched={control.touched}
          valid={control.valid}
          value={control.value}
          type={control.type}
          key={controlName + index}/>
      )
    })
  }

  return (
    <Modal title={isLogin ? 'Войти' : 'Зарегистрироваться'} isOpen={isOpen} onClose={authClose}>
      <form onSubmit={submitHandler}>
        <div className={classes.textInput}>
          {
            error
              ? <h2 className={classes.errorMessage}>{error}</h2>
              : renderInputs(isLogin ? formControl : formControl2)
          }
        </div>
        <div className={classes.btnBlock}>
          <Button
            type={'primary'}
            text={'Войти'}
            disabled={isLogin && !isFormValid}
            onClick={loginHandler}/>
          <Button
            type={'primary'}
            text={'Зарегистрироватся'}
            disabled={!isLogin && !isFormValid2}
            onClick={registerHandler}/>
        </div>

      </form>
    </Modal>
  )
}

export default AuthModal

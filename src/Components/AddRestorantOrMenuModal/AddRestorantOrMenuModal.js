import React, { useState } from 'react'
import classes from '../AuthModal/authModal.module.scss'
import Button from '../UI_Grid/Button/button'
import Modal from '../../HOC/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { validate, validateForm } from '../../Helpers/formHelpers'
import AuthInput from '../UI_Grid/AuthInput/AuthInput'
import { adminModalClose, putNewMenuItem, putNewRestorant } from '../../ReduxStore/actions/adminAction'

const AddRestorantOrMenuModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.admin.isOpen)
  const message = useSelector(state => state.admin.message)
  const isRestorant = useSelector(state => state.admin.modalType)
  const num = Object.keys(useSelector(state => state.restorants.restorants)).length
  const title =
      isRestorant
        ? 'Добавить ресторан'
        : 'Добавить блюдо'

  const form = {
    imgUrl: {
      value: '../../img/cards_img/1.png',
      type: 'text',
      label: 'Путь до изображения',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 1
      }
    },
    category: {
      value: 'Пицца',
      type: 'text',
      label: 'Основная специализация',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 3
      }
    },
    minPrice: {
      value: 900,
      type: 'number',
      label: 'Минимальная цена',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 3
      }
    },
    rating: {
      value: 4.5,
      type: 'number',
      label: 'Рэйтинг ресторана',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 1
      }
    },
    title: {
      value: 'Пицца плюс',
      type: 'text',
      label: 'Название ресторана',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 3
      }
    },
    time: {
      value: 50,
      type: 'number',
      label: 'Время приготовления',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 2
      }
    }
  }

  const menuForm = {
    title: {
      value: 'Ролл угорь стандарт',
      type: 'text',
      label: 'Название блюда',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 3
      }
    },
    imgUrl: {
      value: '../../img/cards_img_rest/1.png',
      type: 'text',
      label: 'Путь до изображения',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 1
      }
    },
    ingredients: {
      value: 'Рис, угорь, соус унаги, кунжут, водоросли нори',
      type: 'text',
      label: 'Ингридиенты',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 5
      }
    },
    itemPrice: {
      value: 500,
      type: 'number',
      label: 'Цена',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 3
      }
    },
    maxScore: {
      value: 5,
      type: 'number',
      label: 'Доступное количество',
      errorMessage: 'Поле не должно быть пустым',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 1
      }
    }
  }

  const [formControl, changeFormControl] = useState(form)
  const [formControl2, changeFormControl2] = useState(menuForm)
  const [isFormValid, changeFormValid] = useState(false)

  const onChangeHandler = (event, controlName) => {
    const formControlMain = isRestorant ? formControl : formControl2
    const formControls = { ...formControlMain }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    const isFormValid = validateForm(formControls)
    if (isRestorant) {
      changeFormControl(formControls)
    } else {
      changeFormControl2(formControls)
    }
    changeFormValid(isFormValid)
  }

  const loginHandler = () => {
    if (isRestorant) {
      const id = formControl.title.value.toLowerCase().trim().split(' ').join('')
      const data = { id, menuHeader: {}, menu: [] }
      for (const item in formControl) {
        if (item === 'imgUrl' || item === 'time') {
          data[item] = formControl[item].value
        } else {
          data.menuHeader[item] = formControl[item].value
        }
      }
      dispatch(putNewRestorant(data, num.toString()))
    } else {
      const data = {}
      for (const item in formControl2) {
        data[item] = formControl2[item].value
      }
      dispatch(putNewMenuItem(data))
    }
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
    <Modal title={title} isOpen={isOpen} onClose={adminModalClose}>
      <form onSubmit={submitHandler}>
        <div className={classes.textInput}>
          {
            message
              ? <h2 className={classes.errorMessage}>{message}</h2>
              : renderInputs(isRestorant ? formControl : formControl2)
          }
        </div>
        <div className={classes.btnBlock}>
          <Button
            type={'primary'}
            text={'Добавить'}
            disabled={!isFormValid}
            onClick={loginHandler}/>
        </div>

      </form>
    </Modal>
  )
}

export default AddRestorantOrMenuModal

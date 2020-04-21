import React from 'react'
import classes from './Footer.module.scss'
import { useHistory } from 'react-router-dom'

const Footer = () => {
  const history = useHistory()
  const goHome = () => {
    history.push('/')
  }
  const goAnimation = e => {
    e.preventDefault()
    history.push('/animation')
  }
  const go404 = e => {
    e.preventDefault()
    history.push('/404')
  }

  return (
    <div className="container">
      <footer className={classes.footer}>

        <div className={classes.block}>
          <img onClick={goHome} className={classes.logo} src="https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Flogo.svg?alt=media&token=c0efa3ae-4f09-4dd4-a4ce-901e99e9ab24" alt="logo"/>
          <nav className={classes.nav}>
            <a onClick={goAnimation} href="/" className={classes.link}>Ресторанам</a>
            <a onClick={go404} href="/" className={classes.link}>Курьерам</a>
            <a onClick={go404} href="/" className={classes.link}>Пресс-центр</a>
            <a onClick={go404} href="/" className={classes.link}>Контакты</a>
          </nav>
          <div className={classes.socialLinks}>
            <a href="https://www.instagram.com/"><img src="https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Fsocial%2FGroup%201.svg?alt=media&token=f2d63920-161c-4ee0-93fc-cd066df1bdd2" alt="icon"/></a>
            <a href="https://www.facebook.com/"><img src="https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Fsocial%2FGroup%202.svg?alt=media&token=0e682429-665f-42a9-b1f1-6a059fa326b2" alt="icon"/></a>
            <a href="https://www.vk.com/"><img src="https://firebasestorage.googleapis.com/v0/b/fooddelivery-305b0.appspot.com/o/img%2Fsocial%2FVector%20(1).svg?alt=media&token=d855f06b-ecef-4110-9b65-9c42f0634697" alt="icon"/></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

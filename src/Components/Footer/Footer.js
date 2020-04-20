import React from 'react';
import classes from './Footer.module.scss'
import {useHistory} from "react-router-dom";

const Footer = () => {

  const history = useHistory();
  const goHome=()=>{
    history.push('/')
  };


  return (
      <div className="container">
        <footer className={classes.footer}>

            <div className={classes.block}>
              <img onClick={goHome} className={classes.logo}  src="../../img/logo.svg" alt="logo"/>
                <nav className={classes.nav}>
                  <a href="/" className={classes.link}>Ресторанам</a>
                  <a href="/" className={classes.link}>Курьерам</a>
                  <a href="/" className={classes.link}>Пресс-центр</a>
                  <a href="/" className={classes.link}>Контакты</a>
                </nav>
                <div className={classes.socialLinks}>
                  <a href="/"><img src="../../img/social/Group%201.svg" alt="icon"/></a>
                  <a href="/"><img src="../../img/social/Group%202.svg" alt="icon"/></a>
                  <a href="/"><img src="../../img/social/Vector%20(1).svg" alt="icon"/></a>
                </div>
            </div>
        </footer>
      </div>
  );
};

export default Footer;
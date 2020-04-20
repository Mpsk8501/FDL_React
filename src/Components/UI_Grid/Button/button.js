import React from 'react';
import classes from './Button.module.scss'


const Button = props => {
  const cls=[
    classes.button
  ];

  if(props.type){
    cls.push(classes[props.type])
  }



  return (
      <button data-close={props.close||null} onClick={props.onClick} className={cls.join(' ')}>
        {props.icon ? <img style={{marginRight:3}}  src={props.icon} alt="icon"/> :null}
        <span data-close={props.close||null}>{props.text}</span>
        {props.iconAfter ? <img className={classes.after}   src={props.iconAfter} alt="icon"/> :null}
      </button>
  );
};

export default Button;
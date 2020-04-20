import React from 'react';
import classes from './loader.module.scss'

const Loader = () => {
  return (
      <div className={classes.loader}>
        <div className={classes.loading}>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
          <div className={classes.dot}></div>
        </div>

      </div>
  );
};

export default Loader;
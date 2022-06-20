import React from 'react';
import styles from './NotFound.module.css';
import image from '../../images/dogsad.png';

const NotFound = () => {
  return (
    <div className={styles.backgroundNotFound}>
      <div className={styles.bodycard}>
        <h1 className={styles.text}>BREED NOT FOUND</h1>
        <img src={image}/>
      </div>
    </div>
  );
};

export default NotFound;

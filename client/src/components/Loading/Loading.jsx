import React from 'react';
import loadingDog from '../../images/loadingdog.gif';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingDog}>
        <img src={loadingDog} alt='loadingDog' />
      </div>
      <div className={styles.loadingtext}>
        Loading ...
      </div>
    </div>
  );
};

export default Loading;

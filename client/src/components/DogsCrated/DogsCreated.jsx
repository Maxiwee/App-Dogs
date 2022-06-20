import React from 'react';
import styles from './DogsCrated.module.css';

const DogsCreated = ({ filterBy }) => {
  const handlerChange = e => {
    filterBy('check');
    setTimeout(() => {
      e.target.checked = false;
    }, 1500);
  };

  return (
    <div className={styles.bodyDogsCreated}>
      <label className={styles.textorder}>Breeds Created</label>
      <input className={styles.check} type='checkbox' onChange={e => handlerChange(e)} />
    </div>
  );
};

export default DogsCreated;

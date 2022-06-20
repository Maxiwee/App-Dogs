import React from 'react';
import styles from './WeightOrder.module.css';

const WeightOrder = ({ filterBy }) => {
  return (
    <div className={styles.bodyWeight}>
      <label className={styles.textorder}>Weight Order</label>
      <div className={styles.buttons}>
        <button value='max-weight' onClick={e => filterBy(e.target.value)}>
        &#10133; Max
        </button>
        <button value='min-weight' onClick={e => filterBy(e.target.value)}>
          &#10134; Min
        </button>
      </div>
    </div>
  );
};

export default WeightOrder;

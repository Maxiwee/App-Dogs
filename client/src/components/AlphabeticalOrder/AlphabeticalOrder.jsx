import React from 'react';
import styles from './AlphabeticalOrder.module.css'

const AlphabeticalOrder = ({ orderBy }) => {
  return (
    <div  className={styles.bodyOrder}>
      <label>Alphabetical Order</label>
      <select className={styles.select} name='Alphabetical Order' onChange={e => orderBy(e.target.value)}>
        <option>Order By</option>
        <option>a - z</option>
        <option>z - a</option>
      </select>
    </div>
  );
};

export default AlphabeticalOrder;

import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TemperamentOrder.module.css';

const TemperamentOrder = ({ filterBy }) => {
  const temperaments = useSelector(state => state.allTemperaments);

  return (
    <div>
      <label className={styles.textorder}>Temperament Order</label>
      <select
        name='Temperament Order'
        onChange={e => filterBy(e.target.value)}
        className={styles.select}
      >
        <option>Filter By</option>
        {temperaments.map(t => (
          <option key={t.id}>{t.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TemperamentOrder;

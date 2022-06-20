import React from 'react';
import styles from './SelectCard.module.css';

const SelectCard = ({ select, deleteSelection }) => {
  return (
    <div  >
      <div className={styles.bodySelect}>
        <button value={select} onClick={e => deleteSelection(e)}>
          x
        </button>
        <div>{select}</div>
      </div>
    </div>
  );
};

export default SelectCard;

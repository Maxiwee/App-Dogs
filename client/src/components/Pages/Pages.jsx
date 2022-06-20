import React from 'react';
import styles from './Pages.module.css';

const Pages = ({ pagePrev, pageNext, pageSelect, pageNum, click }) => {
  return (
    <div className={styles.pagebody}>
      <button className={styles.arrows} onClick={() => pagePrev()}>
        {' < '}
      </button>
      {pageNum.map(num => (
        <button
          className={num !== click ? styles.btnPages : styles.btnPagesOn}
          onClick={e => pageSelect(e)}
          key={num}
          value={num}
        >
          {num}
        </button>
      ))}
      <button className={styles.arrows} onClick={() => pageNext()}>
        {' > '}
      </button>
    </div>
  );
};

export default Pages;

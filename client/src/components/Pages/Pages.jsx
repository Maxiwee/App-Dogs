import React from 'react';

const Pages = ({ pagePrev, pageNext, pageSelect, pageNum }) => {
  return (
    <div>
      <button onClick={() => pagePrev()}>{' < '}</button>
      {pageNum.map(num => (
        <button onClick={e => pageSelect(e)} key={num} value={num}>
          {num}
        </button>
      ))}
      <button onClick={() => pageNext()}>{' > '}</button>
    </div>
  );
};

export default Pages;

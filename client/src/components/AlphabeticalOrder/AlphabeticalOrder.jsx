import React from 'react';

const AlphabeticalOrder = ({ orderBy }) => {
  return (
    <div>
      <label>Alphabetical Order</label>
      <br />
      <select name='Alphabetical Order' onClick={e => orderBy(e.target.value)}>
        <option>Order By</option>
        <option>a - z</option>
        <option>z - a</option>
      </select>
    </div>
  );
};

export default AlphabeticalOrder;

import React from 'react';
import { useState } from 'react';

const Search = ({ searchBreed }) => {
  const [search, setSearch] = useState('');

  const handlerChange = e => {
    setSearch(e.target.value);
  };
  
  return (
    <div>
      <input type='search' onChange={e => handlerChange(e)} />
      <button onClick={() => searchBreed(search)}>Search</button>
    </div>
  );
};

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <Link to={'/home'}>Home</Link>
      <br/>
      <Link to={'/createDog'}>Create Dog</Link>
    </div>
  );
};

export default Nav;

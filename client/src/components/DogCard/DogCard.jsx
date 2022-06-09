import React from 'react';

const DogCard = props => {
  return (
    <div>
      <h1>{props.breed}</h1>
      <img src={props.image} alt={'Image'} />
      <div>
        <h3>Temperament</h3>
        <p>{props.temperament}</p>
      </div>
    </div>
  );
};

export default DogCard;

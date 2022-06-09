import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateDog = () => {
  const [input, setInput] = useState({
    image: '',
    breed: '',
    temperaments: '',
    hight: '',
    weight: '',
    years: '',
  });

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const resp = await axios.post('http://localhost:3001/dogs', input);
      console.log(resp.data);
    } catch (error) {
      console.log(error.message);
    }

    setInput({
      image: '',
      breed: '',
      temperaments: '',
      hight: '',
      weight: '',
      years: '',
    });
  };

  return (
    <div>
      <h1>Create Breed</h1>
      <form onSubmit={e => handleSubmit(e)} autoComplete={'off'}>
        <label>Image</label>
        <input
          type='text'
          name='image'
          value={input.image}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <label>Breed</label>
        <input
          type='text'
          name='breed'
          value={input.breed}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <label>Temperaments</label>
        <input
          type='text'
          name='temperaments'
          value={input.temperaments}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <label>Hight</label>
        <input
          type='text'
          name='hight'
          value={input.hight}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <label>Weight</label>
        <input
          type='text'
          name='weight'
          value={input.weight}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <label>Years of life</label>
        <input
          type='text'
          name='years'
          value={input.years}
          onChange={e => handleChange(e)}
        ></input>
        <br />
        <button>Sumbit</button>
      </form>
      <Link to={'/home'}>{' | < | '}</Link>
    </div>
  );
};

export default CreateDog;

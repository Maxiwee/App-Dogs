import axios from 'axios';
import {
  FILTER_BY_BREED_CREATED,
  FILTER_BY_MAX_WEIGHT,
  FILTER_BY_MIN_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  GET_BREED_DETAIL,
  GET_DOGS,
  GET_DOGS_BY_BREEDS,
  GET_TEMPERAMENTS,
  ORDER_ALPHABETICALLY_AZ,
  ORDER_ALPHABETICALLY_ZA,
} from '../action-types';

export const getDogs = () => dispatch => {
  return axios.get('http://localhost:3001/dogs').then(response => {
    dispatch({ type: GET_DOGS, payload: response.data });
  });
};

export const getDogByBreed = breed => async dispatch => {
  try {
    console.log(breed)
    if (!breed) alert('The field is empty');
    let breedFound = await axios.get(
      `http://localhost:3001/dogs?name=${breed}`
    );
    return dispatch({ type: GET_DOGS_BY_BREEDS, payload: breedFound.data });
  } catch (error) {
    alert('The breed you are looking for does not exist');
  }
};

export const getBreedDetail = id => async dispatch => {
  let breedFound = await axios.get(`http://localhost:3001/dogs/${id}`);
  return dispatch({ type: GET_BREED_DETAIL, payload: breedFound.data });
};

export const getTemperaments = () => dispatch => {
  return axios.get('http://localhost:3001/temperaments').then(response => {
    dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
  });
};

export const orderAZ = () => {
  return {
    type: ORDER_ALPHABETICALLY_AZ,
  };
};

export const orderZA = () => {
  return {
    type: ORDER_ALPHABETICALLY_ZA,
  };
};

export const filterTemperament = temperament => {
  return { type: FILTER_BY_TEMPERAMENT, payload: temperament };
};

export const filterWeightMax = () => {
  return { type: FILTER_BY_MAX_WEIGHT };
};

export const filterWeightMin = () => {
  return { type: FILTER_BY_MIN_WEIGHT };
};

export const filterBreedCreated = () => {
  return { type: FILTER_BY_BREED_CREATED };
};

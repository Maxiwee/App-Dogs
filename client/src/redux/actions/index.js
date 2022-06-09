import axios from 'axios';
import {
  GET_DOGS,
  GET_DOGS_BY_BREEDS,
  ORDER_ALPHABETICALLY_AZ,
  ORDER_ALPHABETICALLY_ZA,
} from '../action-types';

export const getDogs = () => dispatch => {
  return axios.get(`http://localhost:3001/dogs`).then(response => {
    dispatch({ type: GET_DOGS, payload: response.data });
  });
};

export const getDogByBreed = breed => async dispatch => {
  let breedFound = await axios.get(`http://localhost:3001/dogs?name=${breed}`);
  return dispatch({ type: GET_DOGS_BY_BREEDS, payload: breedFound.data });
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

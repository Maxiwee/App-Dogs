import {
  GET_DOGS,
  GET_DOGS_BY_BREEDS,
  ORDER_ALPHABETICALLY_AZ,
  ORDER_ALPHABETICALLY_ZA,
} from '../action-types';

const initialState = {
  allDogs: [],
};

function OrderByAZ(x, y) {
  if (x.breed < y.breed) {
    return -1;
  }
  if (x.breed > y.breed) {
    return 1;
  }
  return 0;
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GET_DOGS_BY_BREEDS:
      return { ...state, allDogs: action.payload };
    case ORDER_ALPHABETICALLY_AZ:
      return { ...state, allDogs: state.allDogs.sort(OrderByAZ) };
    case ORDER_ALPHABETICALLY_ZA:
      return { ...state, allDogs: state.allDogs.sort(OrderByAZ).reverse() };
    default:
      return state;
  }
}

export default rootReducer;

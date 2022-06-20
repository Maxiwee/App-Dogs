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

const initialState = {
  allDogs: [],
  filtered: [],
  allTemperaments: [],
  detailBreed: {},
  ifFilter: false,
};

const orderByAZ = (o1, o2) => {
  if (o1.breed < o2.breed) {
    return -1;
  }
  if (o1.breed > o2.breed) {
    return 1;
  }
  return 0;
};

const OrderByWeight = (o1, o2) => {
  let weight1 = o1.weight.split(' - ');

  let weight2 = o2.weight.split(' - ');

  if (weight1[0]?.length !== 2) weight1[0] = '0' + weight1[0];
  if (weight1[1]?.length !== 2) weight1[1] = '0' + weight1[1];

  if (weight2[0]?.length !== 2) weight2[0] = '0' + weight2[0];
  if (weight2[1]?.length !== 2) weight2[1] = '0' + weight2[1];

  weight1 = weight1.join('');
  weight2 = weight2.join('');

  if (weight1 > weight2) {
    return -1;
  }
  if (weight1 < weight2) {
    return 1;
  }
  return 0;
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        ifFilter: false,
      };
    case GET_DOGS_BY_BREEDS:
      return { ...state, allDogs: action.payload, ifFilter: false };
    case GET_BREED_DETAIL:
      return { ...state, detailBreed: action.payload };
    case ORDER_ALPHABETICALLY_AZ:
      if (state.ifFilter) {
        return {
          ...state,
          filtered: state.filtered.sort(orderByAZ),
        };
      }
      return { ...state, allDogs: state.allDogs.sort(orderByAZ) };
    case ORDER_ALPHABETICALLY_ZA:
      if (state.ifFilter) {
        return {
          ...state,
          filtered: state.filtered.sort(orderByAZ).reverse(),
        };
      }
      return { ...state, allDogs: state.allDogs.sort(orderByAZ).reverse() };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload,
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        filtered: state.allDogs.filter(b =>
          b.temperament?.toLowerCase().includes(action.payload.toLowerCase())
        ),
        ifFilter: true,
      };
    case FILTER_BY_MAX_WEIGHT:
      if (state.ifFilter) {
        return {
          ...state,
          filtered: state.filtered.sort(OrderByWeight),
        };
      }
      return {
        ...state,
        filtered: state.allDogs.sort(OrderByWeight),
        ifFilter: true,
      };
    case FILTER_BY_MIN_WEIGHT:
      if (state.ifFilter) {
        return {
          ...state,
          filtered: state.filtered.sort(OrderByWeight).reverse(),
        };
      }
      return {
        ...state,
        filtered: state.allDogs.sort(OrderByWeight).reverse(),
        ifFilter: true,
      };
    case FILTER_BY_BREED_CREATED:
      if (state.ifFilter) {
        return {
          ...state,
          filtered: state.filtered.filter(b => b.id > 264),
        };
      }
      return {
        ...state,
        filtered: state.allDogs.filter(b => b.id > 264),
        ifFilter: true,
      };
    default:
      return state;
  }
}

export default rootReducer;

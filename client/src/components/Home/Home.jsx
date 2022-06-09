import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs, getDogByBreed, orderAZ, orderZA } from '../../redux/actions';
import Search from '../Search/Search.jsx';
import AlphabeticalOrder from '../AlphabeticalOrder/AlphabeticalOrder';
import DogCards from '../DogCards/DogCards';
import Nav from '../Nav/Nav';
const Home = () => {
  const [order, setOrder] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  useEffect(() => {}, [order]);

  const searchBreed = breed => {
    dispatch(getDogByBreed(breed));
  };

  const orderBy = OrderBy => {
    if ('a - z' === OrderBy) dispatch(orderAZ());
    if ('z - a' === OrderBy) dispatch(orderZA());
    if (order === true) setOrder(false);
    if (order === false) setOrder(true);
  };

  return (
    <div>
      <Nav />
      <Search searchBreed={searchBreed} />
      <AlphabeticalOrder orderBy={orderBy} />
      <h1>Home</h1>
      <DogCards />
    </div>
  );
};

export default Home;

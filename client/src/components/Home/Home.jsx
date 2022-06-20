import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  getDogByBreed,
  orderAZ,
  orderZA,
  getTemperaments,
  filterTemperament,
  filterWeightMax,
  filterWeightMin,
  filterBreedCreated,
} from '../../redux/actions';
import DogCards from '../DogCards/DogCards';
import Nav from '../Nav/Nav.jsx';
import styles from './Home.module.css';
import AlphabeticalOrder from '../AlphabeticalOrder/AlphabeticalOrder';
import TemperamentOrder from '../TemperamentOrder/TemperamentOrder';
import Loading from '../Loading/Loading';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import WeightOrder from '../WeightOrder/WeightOrder';
import DogsCreated from '../DogsCrated/DogsCreated';

const Home = () => {
  const [order, setOrder] = useState(true);
  const [temp, setTemp] = useState(true);
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  useEffect(() => {}, [order]);

  useEffect(() => {}, [temp]);

  const searchBreed = breed => {
    dispatch(getDogByBreed(breed));
  };

  const orderBy = OrderBy => {
    if ('a - z' === OrderBy) dispatch(orderAZ());
    if ('z - a' === OrderBy) dispatch(orderZA());
    if (order === true) setOrder(false);
    if (order === false) setOrder(true);
  };

  const filterBy = FilterBy => {
    if (FilterBy === 'Filter By') return;
    else if (FilterBy === 'max-weight') dispatch(filterWeightMax());
    else if (FilterBy === 'min-weight') dispatch(filterWeightMin());
    else if (FilterBy === 'check') dispatch(filterBreedCreated());
    else dispatch(filterTemperament(FilterBy));

    if (temp === true) setTemp(false);
    if (temp === false) setTemp(true);
  };

  const reload = () => {
    dispatch(getDogs());
  };

  return (
    <div>
      {!allDogs[0] ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.home}>
            <nav className={styles.nav}>
              <Link to={'/'}>
                <div className={styles.logohome}>
                  <img src={logo} />
                  <h1>PAWS TO THE RESCUE</h1>
                  <p>Animal shelter</p>
                </div>
              </Link>
              <section className={styles.menu}>
                <Nav searchBreed={searchBreed} />
              </section>
            </nav>
            <div className={styles.body}>
              <section className={styles.cards}>
                <DogCards />
              </section>
              <section className={styles.select}>
                <div className={styles.reload}>
                  <button onClick={() => reload()}>Reload</button>
                </div>
                <AlphabeticalOrder orderBy={orderBy} />
                <TemperamentOrder filterBy={filterBy} />
                <WeightOrder filterBy={filterBy} />
                <DogsCreated filterBy={filterBy} />
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

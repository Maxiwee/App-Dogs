import { Link } from 'react-router-dom';
import styles from './LandingMain.module.css';
import { useEffect } from 'react';
import Home from '../Home/Home';


const LandingMain = () => {
  useEffect(() => {
    <Home/>
  }, []);

  return (
    <div className={styles.background}>
      <h1>Dogs</h1>
      <Link to={'/home'}>Start</Link>
    </div>
  );
};

export default LandingMain;

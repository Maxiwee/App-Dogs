import { Link } from 'react-router-dom';
import styles from './LandingMain.module.css';
import logo from '../../images/logo.png';

const LandingMain = () => {
  return (
    <div className={styles.background}>
      <div className={styles.bodylanding}>
        <div className={styles.logomain}>
          <img src={logo} />
          <h1>PAWS TO THE RESCUE</h1>
          <p>Animal shelter</p>
        </div>
        <section className={styles.textlanding}>
          <p>
            A dog is the only thing on earth that loves you more than he loves
            himself.
          </p>
        </section>
        <div className={styles.btnmain}>
          <Link to={'/home'}>START</Link>
        </div>
      </div>
      
    </div>
  );
};

export default LandingMain;

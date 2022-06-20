import React from 'react';
import styles from './DogCard.module.css';

const DogCard = props => {
  return (
    <div className={styles.card}>
      <section className={styles.image}>
        <img
          src={
            'https://mystickermania.com/cdn/stickers/into_the_web/sticker_2020-512x512.png'
          }
          alt={'Image'}
          srcset={props.image}
        />
      </section>
      <div className={styles.texts}>
        <section className={styles.name}>
          <h1>{props.breed}</h1>
        </section>
        <section className={styles.temp}>
          <h4>Temperaments</h4>
          <p>{props.temperament || 'No Tempers'}</p>
        </section>
        <section className={styles.weight}>
          <h4>Weight</h4>
          <p>{props.weight} lb</p>
        </section>
      </div>
    </div>
  );
};

export default DogCard;

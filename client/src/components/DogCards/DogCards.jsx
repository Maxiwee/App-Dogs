import { useSelector } from 'react-redux';
import { useState } from 'react';
import DogCard from '../DogCard/DogCard';
import Pages from '../Pages/Pages';
import { Link } from 'react-router-dom';
import styles from './DogCards.module.css';
import NotFound from '../NotFound/NotFound';

const DogCards = () => {
  const allDogs = useSelector(state => state.allDogs);
  const filtered = useSelector(
    state => state.filtered
  );
  const ifFilter = useSelector(state => state.ifFilter);
  const [page, setPage] = useState({ prev: 0, next: 8 });
  const [click, setClick] = useState(1);

  const pagePrev = () => {
    if (page.prev === 0) return;
    let next = page.next - 8;
    setPage({ prev: page.prev - 8, next: page.next - 8 });
    setClick(next / 8);
  };

  const pageNext = () => {
    if (ifFilter) {
      if (
        page.next === filtered.length ||
        page.next > filtered.length
      )
        return;
    }
    if (page.next === allDogs.length || page.next > allDogs.length) return;
    let next = page.next + 8;
    setPage({ prev: page.prev + 8, next: page.next + 8 });
    setClick(next / 8);
  };

  const pageSelect = e => {
    let pageNext = e.target.value * 8;
    let pagePrev = pageNext - 8;
    setPage({ prev: pagePrev, next: pageNext });
    setClick(pageNext / 8);
  };

  let dogsPage;

  let pageNum = [];
  const pageNumFormat = typeFilter => {
    for (let i = 1; i <= Math.ceil(typeFilter.length / 8); i++) {
      pageNum.push(i);
    }
    if (page.next / pageNum.length > 8 && typeFilter[0]) {
      setPage({ prev: 0, next: 8 });
      setClick(1);
    }
  };
  
 

  if (ifFilter) {
    pageNumFormat(filtered);
    dogsPage = filtered.slice(page.prev, page.next);
  } else {
    pageNumFormat(allDogs);
    dogsPage = allDogs.slice(page.prev, page.next);
  }

  return (
    <div className={styles.cardsbody}>
      <Pages
        pagePrev={pagePrev}
        pageNext={pageNext}
        pageSelect={pageSelect}
        pageNum={pageNum}
        click={click}
      />
      <div>
        {!dogsPage[0] ? (
          <NotFound />
        ) : (
          <ul className={styles.cards}>
            {dogsPage.map(dog => (
              <li key={dog.id}>
                {
                  <Link to={`home/${dog.id}`}>
                    <DogCard
                      breed={dog.breed}
                      image={dog.image}
                      temperament={dog.temperament}
                      weight={dog.weight}
                    />
                  </Link>
                }
              </li>
            ))}
          </ul>
        )}
      </div>
      <Pages
        pagePrev={pagePrev}
        pageNext={pageNext}
        pageSelect={pageSelect}
        pageNum={pageNum}
        click={click}
      />
    </div>
  );
};

export default DogCards;

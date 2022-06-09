import { useSelector } from 'react-redux';
import { useState } from 'react';
import DogCard from '../DogCard/DogCard';
import Pages from '../Pages/Pages';

const DogCards = () => {
  
  const allDogs = useSelector(state => state.allDogs); // [BREED]

  const [page, setPage] = useState({ prev: 0, next: 8 });

  let pageNum = [];
  for (let i = 1; i <= Math.ceil(allDogs.length / 8); i++) {
    pageNum.push(i);
  }

  const pagePrev = () => {
    if (page.prev === 0) return;
    setPage({ prev: page.prev - 8, next: page.next - 8 });
  };

  const pageNext = () => {
    if (page.next === allDogs.length || page.next > allDogs.length) return;
    setPage({ prev: page.prev + 8, next: page.next + 8 });
  };

  const pageSelect = e => {
    let pageNext = e.target.value * 8;
    let pagePrev = pageNext - 8;
    setPage({ prev: pagePrev, next: pageNext });
  };

  let dogsPage = allDogs.slice(page.prev, page.next);

  return (
    <div>
      <Pages pagePrev={pagePrev} pageNext={pageNext} pageSelect={pageSelect} pageNum={pageNum}/>
      <br />
      <br />
      <ul>
        {dogsPage.map(dog => (
          <li key={dog.id}>
            {
              <DogCard
                breed={dog.breed}
                image={dog.image}
                temperament={dog.temperament}
              />
            }
          </li>
        ))}
      </ul>
      <br />
      <br />
      <Pages pagePrev={pagePrev} pageNext={pageNext} pageSelect={pageSelect} pageNum={pageNum}/>
    </div>
  );
};

export default DogCards;

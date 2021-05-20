import React, { useState } from 'react';
import './style.css';

const countShowGenres = 4;

interface Props {
  genres: string[];
  activeGenre: string;
  changeGenre: (genre: string) => void;
}

export default function GenresFilter({
  genres,
  activeGenre,
  changeGenre,
}: Props) {
  const [countGenres, setCountGenres] = useState(countShowGenres);

  const handleShowAll = () => {
    countGenres === countShowGenres
      ? setCountGenres(genres.length)
      : setCountGenres(countShowGenres);
  };

  const handleReset = () => {
    changeGenre('');
  };

  const handleSetActiveGenre = (genre: string) => () => {
    changeGenre(genre);
  };

  return (
    <div className='row sorting'>
      <div className='col-12'>
        <nav>
          <ul className='d-flex flex-wrap'>
            <li>
              <button onClick={handleShowAll}>
                {countGenres === countShowGenres ? 'Все' : 'Убрать'}
              </button>
            </li>
            {genres.slice(0, countGenres).map((genre) => (
              <li key={genre}>
                <button
                  className={genre === activeGenre ? 'active' : ''}
                  onClick={handleSetActiveGenre(genre)}
                >
                  {genre}
                </button>
              </li>
            ))}
            <li>
              <button type='reset' onClick={handleReset}>
                Сбросить
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

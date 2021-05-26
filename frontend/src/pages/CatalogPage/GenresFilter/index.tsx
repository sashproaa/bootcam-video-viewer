import React, { useState } from 'react';
import ButtonLine from '../../../components/ButtonLine';
import cls from './style.module.css';

const countShowGenres = 4;

interface Props {
  genres: [string, string][];
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
    <div className={`row ${cls.sorting}`}>
      <div className='col-12'>
        <nav>
          <ul className={`d-flex flex-wrap ${cls.wrap}`}>
            <li className={cls.item}>
              <ButtonLine onClick={handleShowAll}>
                {countGenres === countShowGenres ? 'Все' : 'Убрать'}
              </ButtonLine>
            </li>
            {genres.slice(0, countGenres).map((genre) => (
              <li key={genre[0]} className={cls.item}>
                <ButtonLine
                  active={genre[0] === activeGenre}
                  disabled={genre[0] === activeGenre}
                  onClick={handleSetActiveGenre(genre[0])}
                >
                  {genre[1]}
                </ButtonLine>
              </li>
            ))}
            <li className={cls.item}>
              <ButtonLine type='reset' onClick={handleReset}>
                Сбросить
              </ButtonLine>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

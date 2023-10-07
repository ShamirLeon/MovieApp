'use client'

import styles from '@/Styles/components/AlsoLike.module.scss';

import { IRecomResult } from '@/Interfaces/Movies.interface';
import { useState, useContext } from 'react';

import Rating from '../Rating/Rating';

import { MovieContext } from '@/Context/MoviesContext';
import MovieProvider from '@/Context/MoviesProvider';

interface Props {
    movies: IRecomResult[]
}

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default function AlsoLike({ movies }: Props) {

    const [index, setIndex] = useState<number>(0);

    const { genresMap }: any = useContext(MovieContext);

    return (
        <div className={styles.AlsoLike}>
            <MovieProvider>
                <h2>You might also like</h2>
                <div className={styles.AlsoLike_Container}>
                    <picture>
                        <img src={`${IMG_URL}original${movies[index].poster_path}`} alt="" />
                    </picture>

                    <div className={styles.AlsoLike_Texts}>
                        <h3>{movies[index].title}</h3>
                        <div>
                            <Rating rating={parseFloat(movies[index].vote_average.toFixed(1))} top={0} position='relative'></Rating>
                            <div>
                                <p>{movies[index].release_date.split('-')[0]}</p>
                                <span>{genresMap.get(movies[index].genre_ids[0])}</span>
                            </div>
                            <div className={styles.InputsContainer}>
                                {
                                    movies.map((movie, _index) => (
                                        <label className={styles.Radio_btn} key={movie.id}>
                                            <input
                                                type="radio"
                                                name="Movie"
                                                onClick={() => {
                                                    setIndex(_index);
                                                }}
                                            />
                                            <span
                                                className={`${styles.Checkmark} ${_index === index ? `${styles.Show}` : ""}`}
                                            ></span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MovieProvider>
        </div>
    )
}
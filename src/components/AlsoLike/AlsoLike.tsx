'use client'

import Link from 'next/link';
import { useState, useContext } from 'react';

import styles from '@/Styles/components/AlsoLike.module.scss';

import Rating from '../Rating/Rating';

import { MovieContext } from '@/Context/MoviesContext';
import { Axios } from '@/API_CONFIG';
import useSWR from 'node_modules/swr/core/dist';
import { IMovieRecommendations, IRecomResult, IResult } from '@/Interfaces/Movies.interface';
import AlsoLikeSkeleton from './AlsoLikeSkeleton';

interface Props {
    id: number;
}

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;


export default function AlsoLike({ id }: Props) {

    const [index, setIndex] = useState<number>(0);

    const { data, isLoading } = useSWR(`/movie/${id}/recommendations?page=1`, getMovieRecommendations);

    async function getMovieRecommendations(url: string) {
        const response = await Axios.get(url);
        const results: IMovieRecommendations = response.data;
        return results
    }

    const filteredRecoms = data?.results.filter((movie: IRecomResult) => {
        return movie.poster_path !== null;
    });

    const { genresMap }: any = useContext(MovieContext);

    return (
        <div className={styles.AlsoLike}>
            {
                data?.results?.length == 0 ?
                    (
                        <h2>No recommendations found</h2>
                    ) : (
                        <>
                            {
                                data && filteredRecoms && <>
                                    <h2>You might also like</h2>
                                    <div className={styles.AlsoLike_Container}>
                                        <picture>
                                            <Link href={`/${filteredRecoms[index].id}`}>
                                                <img src={`${IMG_URL}original${filteredRecoms[index].poster_path}`} alt={filteredRecoms[index].title} className={styles.AlsoLike_Container_Image} />
                                            </Link>
                                        </picture>

                                        <div className={styles.AlsoLike_Texts}>
                                            <h3>{filteredRecoms[index].title}</h3>
                                            <div>
                                                <Rating rating={parseFloat(filteredRecoms[index].vote_average.toFixed(1))} top={0} position='relative'></Rating>
                                                <div>
                                                    <p>{filteredRecoms[index].release_date.split('-')[0]}</p>
                                                    <span>{genresMap.get(filteredRecoms[index].genre_ids[0])}</span>
                                                </div>
                                                <div className={styles.InputsContainer}>
                                                    {
                                                        filteredRecoms.slice(0, 3).map((movie, _index: number) => (
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
                                </>
                            }
                        </>
                    )
            }
        </div>
    )
}
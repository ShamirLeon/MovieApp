'use client'

import Link from 'next/link';
import styles from '@/Styles/components/UpcomingMovies.module.scss';

import { IResult } from '@/Interfaces/Movies.interface';

import { MovieContext } from '@/Context/MoviesContext';
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

interface Props {
    movie: IResult,
    delay: number
}

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default function MovieCard({ movie, delay }: Props) {
    // const { id, backdrop_path, title, release_date, genre_ids } = movie;
    const { genresMap }: any = useContext(MovieContext);

    return (
        <Link href={`/${movie.id}`} key={movie.id} className={styles.MovieCard}>
            <img src={`${IMG_URL}original${movie.backdrop_path}`} alt={movie.title} className={styles.MovieCard__Image} />
            <h2 style={{ animationDelay: `${delay}ms` }}>{movie.title}</h2>
            <p style={{ animationDelay: `${delay}ms` }}>{`${movie.release_date.split('-')[0]}, ${genresMap.get(movie.genre_ids[0])}` || <Skeleton />}</p>
            <div className={styles.Mask} style={{ animationDelay: `${delay}ms` }}></div>
        </Link>
    )
}
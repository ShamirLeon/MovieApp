'use client'

import Link from 'next/link';
import styles from '@/Styles/components/UpcomingMovies.module.scss';

import { IResult } from '@/Interfaces/Movies.interface';

import { MovieContext } from '@/Context/MoviesContext';
import { useContext } from 'react';

interface Props {
    movie: IResult
}

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default function MovieCard(movie: Props) {
    const { id, backdrop_path, title, release_date, genre_ids } = movie.movie;

    const {genresMap}:any = useContext(MovieContext)

    return (
        <Link href={`/movie/${id}`} key={id} className={styles.MovieCard}>
            <img src={`${IMG_URL}original${backdrop_path}`} alt={title} className={styles.MovieCard__Image} />
            <Link href={'/'} >{title}</Link>
            <p>{`${release_date.split('-')[0]}, ${genresMap.get(genre_ids[0])}`}</p>
            <div className=''></div>
        </Link>
    )
}
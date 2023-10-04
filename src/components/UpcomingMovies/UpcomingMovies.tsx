import MovieCard from './MovieCard';
import styles from '@/Styles/components/UpcomingMovies.module.scss'

import { IResult } from '@/Interfaces/Movies.interface';

async function getUpcomingMovies() {
    let randomNumber;
    while (true) {
        randomNumber = Math.trunc(Math.random() * 10);
        if (randomNumber > 0) {
            break;
        }
    }

    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${randomNumber}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Upcoming Movies')
    }

    return res.json()
}

export default async function UpcomingMovies() {
    // console.log('Fetching Upcoming');
    const data = await getUpcomingMovies();
    const firstFourMovies = data.results.slice(0, 4);

    return (
        <section className={styles.UpcomingContainer}>
            <h2>Upcoming</h2>
            <div className={styles.MoviesContainer}>
                {
                    firstFourMovies.map((movie: IResult) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </section>
    )
}
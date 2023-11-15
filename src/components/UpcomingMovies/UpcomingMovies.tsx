'use client'

import MovieCard from './MovieCard';
import styles from '@/Styles/components/UpcomingMovies.module.scss'

import { IResult, IMoviesApp } from '@/Interfaces/Movies.interface';

import { Axios } from '@/API_CONFIG';
import MovieCardSkeleton from './MovieCardSkeleton';
import useSWR from 'swr';

export default function UpcomingMovies() {
    const randomNumber = getRandomNumber();
    const { data, error, isLoading } = useSWR(`/movie/upcoming?language=en-US&page=${randomNumber}`, getUpcomingMovies);

    const getMoviesContainer = () => {
        const moviesContainer = document.getElementById('MovieContainer');
        return moviesContainer
    }

    let scrollLeft = 0;

    function scrollMoviesContainer(direction: string): void {
        const moviesContainer = getMoviesContainer();
        direction == 'left' ? scrollLeft -= 300 : scrollLeft += 300;
        if (scrollLeft < 0) {
            scrollLeft = 0;
        }

        moviesContainer?.scrollTo({
            left: scrollLeft,
        })
    }

    function getRandomNumber() {
        let randomNumber;
        while (true) {
            randomNumber = Math.trunc(Math.random() * 10);
            if (randomNumber > 0) {
                break;
            }
        }
        return randomNumber
    }

    async function getUpcomingMovies(url: string) {
        const response = await Axios.get(url)

        const filteredResults = response.data.results.filter((result: any) => {
            return result.backdrop_path !== null;
        })

        return filteredResults
    };

    return (
        <section className={styles.UpcomingContainer}>
            <h2>Upcoming</h2>
            <div id='MovieContainer' className={styles.MoviesContainer}>
                {isLoading && <MovieCardSkeleton number={4} />}
                {error ? <span>Error when fetching data</span> : '' }
                {
                    data && data.map((movie: IResult, index: number) => (
                        <MovieCard key={index} movie={movie} delay={400 + (index * 80)} />
                    ))
                }
            </div>
            <button id={styles.right_button} className={styles.BtnControl} onClick={() => { scrollMoviesContainer('right') }}>
                <i className="fi fi-sr-angle-right"></i>
            </button>
            <button id='left_button' className={styles.BtnControl} onClick={() => { scrollMoviesContainer('left') }}>
                <i className="fi fi-sr-angle-left"></i>
            </button>
        </section>
    )
}
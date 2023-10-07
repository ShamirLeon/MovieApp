'use client'

import MovieCard from './MovieCard';
import styles from '@/Styles/components/UpcomingMovies.module.scss'

import { IResult, IMoviesApp } from '@/Interfaces/Movies.interface';
import { useState, useEffect } from 'react';

import { optionFecthMovieApi } from '@/API_CONFIG';

export default function UpcomingMovies() {

    const [UpcomingMovies, setUpcomingMovies] = useState<IResult[] | null>();

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

    async function getUpcomingMovies() {
        let randomNumber;
        while (true) {
            randomNumber = Math.trunc(Math.random() * 10);
            if (randomNumber > 0) {
                break;
            }
        }

        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${randomNumber}`, optionFecthMovieApi);

        if (!res.ok) {
            throw new Error('Failed to fetch Upcoming Movies')
        }

        const results = await res.json();

        const filteredResults = await results.results.filter((result:any)=>{
            return result.backdrop_path !== null;
        })

        setUpcomingMovies(filteredResults)
    };

    useEffect(() => {
        getUpcomingMovies();
    }, [])

    return (
        <section className={styles.UpcomingContainer}>
            <h2>Upcoming</h2>
            <div id='MovieContainer' className={styles.MoviesContainer}>
                {
                    UpcomingMovies && UpcomingMovies.map((movie: IResult) => (
                        <MovieCard key={movie.id} movie={movie} />
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
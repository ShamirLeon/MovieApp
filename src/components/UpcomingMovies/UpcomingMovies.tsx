'use client'

import MovieCard from './MovieCard';
import styles from '@/Styles/components/UpcomingMovies.module.scss'

import { IResult, IMoviesApp } from '@/Interfaces/Movies.interface';
import { useState, useEffect } from 'react';

import { Axios } from '@/API_CONFIG';
import MovieCardSkeleton from './MovieCardSkeleton';

export default function UpcomingMovies() {

    const [UpcomingMovies, setUpcomingMovies] = useState<IResult[] | null>();
    const [isLoading, setIsLoading] = useState(true);

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

        const response = await Axios.get(`/movie/upcoming?language=en-US&page=${randomNumber}`)

        const filteredResults = await response.data.results.filter((result: any) => {
            return result.backdrop_path !== null;
        })
        setIsLoading(false);
        setUpcomingMovies(filteredResults);

    };

    useEffect(() => {
        getUpcomingMovies();
    }, [])

    return (
        <section className={styles.UpcomingContainer}>
            <h2>Upcoming</h2>
            <div id='MovieContainer' className={styles.MoviesContainer}>
                {isLoading && <MovieCardSkeleton number={4} />}
                {
                    UpcomingMovies && UpcomingMovies.map((movie: IResult, index) => (
                        <MovieCard key={index} movie={movie} delay={400 + (index * 80)}/>
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
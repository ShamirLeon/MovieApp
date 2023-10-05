'use client'

import MovieCard from './MovieCard';
import styles from '@/Styles/components/UpcomingMovies.module.scss'

import { IResult, IMoviesApp } from '@/Interfaces/Movies.interface';
import { useState, useEffect } from 'react';


export default async function UpcomingMovies() {

    const [UpcomingMovies, setUpcomingMovies] = useState<IMoviesApp | null >()

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
        });
    
        if (!res.ok) {
            throw new Error('Failed to fetch Upcoming Movies')
        }

        const results = await res.json();
    
        setUpcomingMovies(results)
    };

    useEffect(()=>{
        getUpcomingMovies();
    },[])

    return (
        <section className={styles.UpcomingContainer}>
            <h2>Upcoming</h2>
            <div className={styles.MoviesContainer}>
                {
                   UpcomingMovies?.results && UpcomingMovies.results.map((movie: IResult) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </section>
    )
}
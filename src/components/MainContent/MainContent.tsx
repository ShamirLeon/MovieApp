'use client'

import Link from 'next/link'
import Rating from '../Rating/Rating';
import { MovieContext } from '@/Context/MoviesContext';

import { IMoviesApp, IResult, IMovieResult } from '@/Interfaces/Movies.interface';
import { useContext, useEffect, useState } from 'react';

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;


export default function MainContent() {

    const [ratedMovies, setRatedMovies] = useState<IResult[]>([]);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const { genresMap }: any = useContext(MovieContext);

    const getTopRatedMovies = async () => {

        let randomNumber: number;
        while (true) {
            randomNumber = Math.trunc(Math.random() * 10);
            if (randomNumber > 0) {
                break;
            }
        }

        try {
            fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${randomNumber}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
                },
                cache: 'no-store'
            })
                .then((response) => response.json())
                .then((result) => {
                    setLoading(false);
                    setRatedMovies(result.results);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    function getRandomNumbers() {
        const randomNumbers: number[] = [];
        while (randomNumbers.length < 3) {
            const randomNum = Math.floor(Math.random() * 20); // Generate a random number between 0 and 20
            if (!randomNumbers.includes(randomNum)) {
                randomNumbers.push(randomNum);
            }
        }
        setRandomNumbers(randomNumbers)
    }

    useEffect(() => {
        getTopRatedMovies();
        getRandomNumbers();
    }, [])

    return (
        <div className='MainContent'>
            {
                !loading ? (<>
                    <div className='MainContent__Section MainContent__Section--First' >
                        <Rating rating={ratedMovies[randomNumbers[0]].vote_average} top={40} />
                        <picture>
                            <img src={`${IMG_URL}original${ratedMovies[randomNumbers[0]].backdrop_path}`} alt={ratedMovies[randomNumbers[0]].title} className='MainContent__Image' />
                        </picture>
                        <Link href={'/'}>{ratedMovies[randomNumbers[0]].title}</Link>
                        <p>{ratedMovies[randomNumbers[0]].overview}</p>
                        <div className='MainContent__Categories'>
                            {
                                ratedMovies[randomNumbers[0]].genre_ids.map((genre) => (
                                    <span key={genre}>{genresMap.get(genre)}</span>
                                ))
                            }
                        </div>
                        <div className='superposition'></div>
                    </div>
                    <div className='MainContent__Section MainContent__Section--Second SecondSection'>
                        <Rating rating={ratedMovies[randomNumbers[1]].vote_average} top={24} />
                        <picture>
                            <img src={`${IMG_URL}original${ratedMovies[randomNumbers[1]].backdrop_path}`} alt={ratedMovies[randomNumbers[0]].title} className='MainContent__Image' />
                        </picture>
                        <Link href={'/'} >{ratedMovies[randomNumbers[1]].title}</Link>
                        <p>{`${ratedMovies[randomNumbers[1]].release_date.split('-')[0]}, ${genresMap.get(ratedMovies[randomNumbers[1]].genre_ids[0])}`}</p>
                        <div className='superposition'></div>
                    </div>
                    <div className='MainContent__Section MainContent__Section--Third SecondSection'>
                        <Rating rating={ratedMovies[randomNumbers[2]].vote_average} top={24} />
                        <picture>
                            <img src={`${IMG_URL}original${ratedMovies[randomNumbers[2]].backdrop_path}`} alt={ratedMovies[randomNumbers[0]].title} className='MainContent__Image' />
                        </picture>
                        <Link href={'/'} >{ratedMovies[randomNumbers[2]].title}</Link>
                        <p>{`${ratedMovies[randomNumbers[2]].release_date.split('-')[0]}, ${genresMap.get(ratedMovies[randomNumbers[1]].genre_ids[0])}`}</p>
                        <div className='superposition'></div>
                    </div>
                </>
                ) : (
                    <p>Está cargando</p>
                )
            }
        </div>
    )
}
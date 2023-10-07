"use client";

import Rating from "../Rating/Rating";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import styles from "@/Styles/components/MainContent.module.scss";
import { MovieContext } from "@/Context/MoviesContext";

import { optionFecthMovieApi } from "@/API_CONFIG";
import Category from "../Category/Category";

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default function MainContent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [resultsTopMovies, setResultsTopMovies] = useState<any>([]);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  let randomNumbersArray: number[] = [];
  const { results } = resultsTopMovies;
  let response: any;

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
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${randomNumber}`,
        optionFecthMovieApi
      );

      if (!res.ok) {
        throw new Error("Failed to fetch Upcoming Movies");
      }
      response = await res.json();
      setResultsTopMovies(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function getRandomNumbers() {
    randomNumbersArray = [];
    while (randomNumbersArray.length < 3) {
      const randomNum = Math.floor(Math.random() * 20); // Generate a random number between 0 and 20
      if (!randomNumbersArray.includes(randomNum)) {
        randomNumbersArray.push(randomNum);
        setRandomNumbers(randomNumbersArray);
      }
    }
  }

  useEffect(() => {
    getRandomNumbers();
    getTopRatedMovies();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && results && (
        <div className={styles.MainContent}>
          <Link href={`/${results[randomNumbers[0]]?.id}`}
            className={`${styles.MainContent__Section} ${styles.MainContent__SectionFirst}`}
          >
            <Rating
              rating={results[randomNumbers[0]]?.vote_average}
              top={40}
              position='absolute'
            />
            <picture>
              <img
                src={`${IMG_URL}original${results[randomNumbers[0]]?.backdrop_path
                  }`}
                alt={results?.title}
                className={styles.MainContent__Image}
              />
            </picture>
            <h3 className={styles.MovieTitle}>{results[randomNumbers[0]]?.title}</h3>
            <p>{results[randomNumbers[0]]?.overview}</p>
            <div className={styles.MainContent__Categories}>
              {results[randomNumbers[0]]?.genre_ids?.map(
                (genre: number) => (
                  <Category key={genre} text={genresMap.get(genre)}/>
                )
              )}
            </div>
            <div className={styles.superposition}></div>
          </Link>

          <Link href={`/${results[randomNumbers[1]]?.id}`}
            className={`${styles.MainContent__Section} ${styles.MainContent__SectionSecond} ${styles.SecondSection}`}
          >
            <Rating rating={results[randomNumbers[1]]?.vote_average} top={24} position='absolute'/>
            <picture>
              <img
                src={`${IMG_URL}original${results[randomNumbers[1]]?.backdrop_path}`}
                alt={results[randomNumbers[1]]?.title}
                className={styles.MainContent__Image}
              />
            </picture>
            <h3 className={`${styles.MovieTitle}`}>{results[randomNumbers[1]]?.title}</h3>
            <p>{`${results[randomNumbers[1]]?.release_date?.split("-")[0]}, ${genresMap.get(results[randomNumbers[1]].genre_ids[0])}`}</p>
            <div className={styles.superposition}></div>
          </Link>

          <Link href={`/${results[randomNumbers[2]]?.id}`}
            className={`${styles.MainContent__Section} ${styles.MainContent__SectionThird} ${styles.SecondSection}`}
          >
            <Rating rating={results[randomNumbers[2]]?.vote_average} top={24} position='absolute'/>
            <picture>
              <img
                src={`${IMG_URL}original${results[randomNumbers[2]]?.backdrop_path}`}
                alt={results[randomNumbers[2]]?.title}
                className={styles.MainContent__Image}
              />
            </picture>
            <h3 className={`${styles.MovieTitle}`}>{results[randomNumbers[2]]?.title}</h3>
            <p>{`${results[randomNumbers[2]]?.release_date?.split("-")[0]}, ${genresMap.get(results[randomNumbers[2]].genre_ids[0])}`}</p>
            <div className={styles.superposition}></div>
          </Link>
        </div>
      )}
    </>
  );
}
'use client';

import { IMovieDetails, IMovieCredits, IMovieImages, IMovieRecommendations } from "@/Interfaces/Movies.interface";

import Rating from "@/components/Rating/Rating";

import styles from "@/Styles/movieDetails.module.scss";

import Category from "@/components/Category/Category";
import AlsoLikeContainer from "@/components/AlsoLike/AlsoLikeContainer";
import { useEffect, useState } from "react";
import { optionFecthMovieApi } from "@/API_CONFIG";


const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default function MovieDetailsPage({ params }: any) {

    const { movieID } = params;

    const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>();
    const [movieCredits, setMovieCredits] = useState<IMovieCredits>();
    const [movieImages, setMovieImages] = useState<IMovieImages>();
    const [movieRecommendations, setMovieRecommendations] = useState<IMovieRecommendations>();
    const [loading, setLoading] = useState(true)


    async function getMovieDetails(id: number) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, optionFecthMovieApi)

        if (!res.ok) {
            throw new Error('Failed to fetch Movie Details')
        }

        const results = await res.json();
        console.log('movie details =>', results);
        setMovieDetails(results);
        setLoading(false);
    }
    async function getMovieCredits(id: number) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, optionFecthMovieApi)

            if (!res.ok) {
                throw new Error('Failed to fetch Movie Credits')
            }

            const results = await res.json();
            console.log('movie credits =>',results);
            setMovieCredits(results)
        } catch (error) {
            console.log(error);
        }
    }
    async function getMovieImages(id: number) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, optionFecthMovieApi)

            if (!res.ok) {
                throw new Error('Failed to fetch Movie Images')
            }

            const results = await res.json();
            console.log('movie images =>', results);
            setMovieImages(results)

        } catch (error) {
            console.log(error);
        }
    }
    async function getMovieRecommendations(id: number) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?page=1`, optionFecthMovieApi)

            if (!res.ok) {
                throw new Error('Failed to fetch Movies recommendations')
            }

            const results = await res.json();
            console.log('movie recommendations =>', results);

            setMovieRecommendations(results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovieDetails(movieID);
        getMovieCredits(movieID);
        getMovieImages(movieID);
        getMovieRecommendations(movieID);
    }, [])

    const filteredBackdrops = movieImages && movieImages?.backdrops.filter((backdrop) => {
        return backdrop.aspect_ratio == 1.778;
    })

    const filteredCast = movieCredits && movieCredits?.cast.filter((cast) => {
        return cast.profile_path !== null;
    });

    return (
        <>
            {!loading && movieDetails && movieCredits && movieImages && movieRecommendations && (
                <section className={styles.Details_Container}>

                    <div className={styles.Main_Section}>
                        <img className={styles.Main_Section_Img} src={`${IMG_URL}original${movieDetails?.backdrop_path}`} alt="" />
                        <div>
                            <Rating rating={parseFloat(movieDetails?.vote_average.toFixed(1))} top={40} />
                        </div>
                        <div className={styles.Texts_Container}>
                            <h1 className="">{movieDetails?.title}</h1>
                            <div className={styles.Categories}>
                                {
                                    movieDetails?.genres.map(genre => (
                                        <Category key={genre.id} text={genre.name} />
                                    ))
                                }
                            </div>
                            <p>{movieDetails?.overview}</p>
                            <div className={styles.Cast}>
                                <h2>Cast</h2>
                                <div className={styles.Cast_Images}>
                                    {
                                        filteredCast?.slice(0, 5).map((cast, index) => (
                                            <picture key={cast.id}>
                                                <img style={{ marginLeft: ` ${index == 0 ? '0px' : '-8px'}`, zIndex: `${5 - index}` }} src={`${IMG_URL}original${cast.profile_path!}`} alt={cast.name} />
                                            </picture>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.Second_Section}>
                        <div className={styles.Trailer_Section}>
                            <h2>Trailer</h2>
                            <div className={styles.Images_Container}>
                                {
                                    filteredBackdrops?.slice(1, 4).map((image, index) => (
                                        <picture key={index}>
                                            <img src={`${IMG_URL}original${image.file_path}`} alt="" />
                                        </picture>
                                    ))
                                }
                            </div>
                        </div>
                        <AlsoLikeContainer movies={movieRecommendations!} />
                    </div>
                </section>
            )}
        </>
    )
}
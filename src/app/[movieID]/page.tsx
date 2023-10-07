import { IMovieDetails, IMovieCredits, IMovieImages, IMovieRecommendations } from "@/Interfaces/Movies.interface";

import Rating from "@/components/Rating/Rating";

import styles from "@/Styles/movieDetails.module.scss";
import Category from "@/components/Category/Category";

import AlsoLikeContainer from "@/components/AlsoLike/AlsoLikeContainer";

async function getMovieDetails(id: number) {
    try {
        const movieDetails = fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
            },
            cache: 'no-store'
        }).then(res => res.json());
        return movieDetails;
    } catch (error) {
        console.log(error);
    }
}
async function getMovieCredits(id: number) {
    try {
        const movieCredits = fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
            },
            cache: 'no-store'
        }).then(res => res.json());
        return movieCredits;
    } catch (error) {
        console.log(error);
    }
}
async function getMovieImages(id: number) {
    try {
        const movieImages = fetch(`https://api.themoviedb.org/3/movie/${id}/images`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
            },
            cache: 'no-store'
        }).then(res => res.json());
        return movieImages;
    } catch (error) {
        console.log(error);
    }
}
async function getMovieRecommendations(id: number) {
    try {
        const movieRecommendations = fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?page=1`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
            },
            cache: 'no-store'
        }).then(res => res.json());
        return movieRecommendations;
    } catch (error) {
        console.log(error);
    }
}

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default async function MovieDetaisPage({ params }: any) {
    const { movieID } = params;
    const movieDetails: IMovieDetails = await getMovieDetails(movieID);
    const movieCredits: IMovieCredits = await getMovieCredits(movieID);
    const movieImages: IMovieImages = await getMovieImages(movieID);
    const movieRecommendations: IMovieRecommendations = await getMovieRecommendations(movieID);

    const { title, overview, backdrop_path, vote_average, genres } = movieDetails;

    const filteredBackdrops = movieImages.backdrops.filter((backdrop) => {
        return backdrop.aspect_ratio == 1.778;
    })

    const filteredCast = movieCredits.cast.filter((cast) => {
        return cast.profile_path !== null;
    });

    return (
        <section className={styles.Details_Container}>
            <div className={styles.Main_Section}>
                <img className={styles.Main_Section_Img} src={`${IMG_URL}original${backdrop_path}`} alt="" />
                <div>
                    <Rating rating={parseFloat(vote_average.toFixed(1))} top={40} />
                </div>
                <div className={styles.Texts_Container}>
                    <h1 className="">{title}</h1>
                    <div className={styles.Categories}>
                        {
                            genres.map(genre => (
                                <Category key={genre.id} text={genre.name} />
                            ))
                        }
                    </div>
                    <p>{overview}</p>
                    <div className={styles.Cast}>
                        <h2>Cast</h2>
                        <div className={styles.Cast_Images}>
                            {
                                filteredCast.slice(0, 5).map((cast, index) => (
                                    <picture key={cast.id}>
                                        <img style={{ marginLeft: `${index == 0 ? '0px' : '-8px'}`, zIndex: `${5 - index}` }} src={`${IMG_URL}original${cast.profile_path!}`} alt={cast.name} />
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
                            filteredBackdrops.slice(1, 4).map((image, index) => (
                                <picture key={index}>
                                    <img src={`${IMG_URL}original${image.file_path}`} alt="" />
                                </picture>
                            ))
                        }
                    </div>
                </div>
                <AlsoLikeContainer movies={movieRecommendations} />
            </div>
        </section>
    )
}
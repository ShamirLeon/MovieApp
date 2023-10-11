import { IMovieDetails, IMovieCredits, IMovieImages, IMovieRecommendations } from "@/Interfaces/Movies.interface";

import Rating from "@/components/Rating/Rating";

import styles from "@/Styles/movieDetails.module.scss";
import Category from "@/components/Category/Category";

import AlsoLikeContainer from "@/components/AlsoLike/AlsoLikeContainer";
import { Axios, CustomAxiosRequestConfig } from "@/API_CONFIG";


const options: CustomAxiosRequestConfig = {
    cache: 'no-store'
}

async function getMovieDetails(id: number) {
    try {
        const movieDetails = await Axios.get(`/movie/${id}`, options)
        return movieDetails.data;
    } catch (error) {
        console.log(error);
    }
}
async function getMovieCredits(id: number) {
    try {
        const movieCredits = await Axios.get(`/movie/${id}/credits`, options)
        return movieCredits.data;
    } catch (error) {
        console.log(error);
    }
}
async function getMovieImages(id: number) {
    try {
        const movieImages = await Axios.get(`/movie/${id}/images`, options)
        return movieImages.data;
    } catch (error) {
        console.log(error);
    }
}
async function getMovieRecommendations(id: number) {
    try {
        const movieRecommendations = await Axios.get(`/movie/${id}/recommendations?page=1`, options);
        return movieRecommendations.data;
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
                    <div className={styles.TitleContainer}>
                        <h1 className="">{title}</h1>
                    </div>
                    <div className={styles.Categories}>
                        {
                            genres.map(genre => (
                                <Category key={genre.id} text={genre.name} />
                            ))
                        }
                    </div>
                    <p>{overview}</p>
                    <div className={styles.Cast}>
                        <div className={styles.TitleContainer}>
                            <h2 style={{animationDelay:'.8s'}}>Cast</h2>
                        </div>
                        <div className={styles.Cast_Images}>
                            {
                                filteredCast.slice(0, 5).map((cast, index) => (
                                    <picture key={cast.id}>
                                        <img style={{ zIndex: `${5 - index}` }} src={`${IMG_URL}original${cast.profile_path!}`} alt={cast.name} />
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
                                    <div className={styles.Mask} style={{ animationDelay: `${400 + (index * 50)}ms` }}></div>
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
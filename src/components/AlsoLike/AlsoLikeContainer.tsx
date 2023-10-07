import MovieProvider from "@/Context/MoviesProvider";
import AlsoLike from "./AlsoLike";
import { IMovieRecommendations } from "@/Interfaces/Movies.interface";

interface Props {
    movies: IMovieRecommendations;
}

export default function AlsoLikeContainer({movies}:Props) {
    return (
        <>
            <MovieProvider>
                <AlsoLike movies={movies.results}/>
            </MovieProvider>
        </>
    )
}
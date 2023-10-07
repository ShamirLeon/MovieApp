import MovieProvider from "@/Context/MoviesProvider";
import AlsoLike from "./AlsoLike";
import { IRecomResult } from "@/Interfaces/Movies.interface";

interface Props {
    movies: IRecomResult[]
}

export default function AlsoLikeContainer({movies}:Props) {
    return (
        <>
            <MovieProvider>
                <AlsoLike movies={movies}/>
            </MovieProvider>
        </>
    )
}
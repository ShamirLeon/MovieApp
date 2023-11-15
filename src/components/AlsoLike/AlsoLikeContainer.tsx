import MovieProvider from "@/Context/MoviesProvider";
import AlsoLike from "./AlsoLike";
import { IMovieRecommendations } from "@/Interfaces/Movies.interface";

interface Props {
    id: number;
}

export default function AlsoLikeContainer({id}:Props) {
    return (
        <>
            <MovieProvider>
                <AlsoLike id={id}/>
            </MovieProvider>
        </>
    )
}
import MovieCard from './MovieCard';
import styles from './UpcomingMovies.module.scss'

interface Movie{
    id: number,
    backdrop_path: string,
    original_title: string,
    release_date:string
}

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`   
  }
}

async function getUpcomingMovies() {
    const res = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);

    if (!res.ok) {
        throw new Error('Failed to fetch Upcoming Movies')
    }
    
    return res.json()
}
export default async function UpcomingMovies() {
    const data = await getUpcomingMovies();
    const firstFourMovies = data.results.slice(0,4);

    return(
        <section className={styles.UpcomingContainer}>
            <h2>Upcoming</h2>
            <div className={styles.MoviesContainer}>
                {
                    firstFourMovies.map((movie:Movie)=>( 
                        //así me pide TS enviarlo
                        <MovieCard key={movie.id} movie={movie}/>
                    ))
                }
            </div>
        </section>
    )
}
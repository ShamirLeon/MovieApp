import Link from 'next/link';
import styles from './UpcomingMovies.module.scss';

interface Props{
    movie: {
        id: number,
        backdrop_path: string,
        original_title: string,
        release_date:string
    }
}

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_TMDB_URL;

export default function MovieCard(movie:Props) {
    const {id, backdrop_path, original_title, release_date} = movie.movie;

    return (
        <div key={id} className={styles.MovieCard}>
            <img src={`${IMG_URL}/original${backdrop_path}`} alt="" className={styles.MovieCard__Image} />
            <Link href={'/'} >{original_title}</Link>
            <p>{release_date}</p>
            <div className=''></div>
        </div>
    )
}
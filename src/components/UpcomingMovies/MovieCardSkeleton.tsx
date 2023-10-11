import Skeleton from 'react-loading-skeleton';

import styles from '@/Styles/components/UpcomingMovies.module.scss';

interface Props {
    number: number
}

function MovieCardSkeleton({ number }: Props) {
    return (
        Array(number).fill(0).map((item, id) =>
            <div key={id} className={styles.MovieCard} style={{ border: '1px solid #313131' }}>
                <div style={{ width: '60%', marginBottom: '4px' }}>
                    <Skeleton height={24}></Skeleton>
                </div>
                <div style={{ height: '16.8px', width: '30%' }}>
                    <Skeleton></Skeleton>
                </div>
            </div>
        )
    );
}

export default MovieCardSkeleton;
import Skeleton from 'react-loading-skeleton';

import styles from "@/Styles/movieDetails.module.scss";
import AlsoLikeSkeleton from '@/components/AlsoLike/AlsoLikeSkeleton';

export default function loading() {
    return (
        <>
            <section className={styles.Details_Container}>
                <div className={styles.Main_Section}>
                    <div></div>

                    <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
                        <Skeleton circle height={60} width={60}></Skeleton>
                    </div>
                    <div className={styles.Texts_Container}>
                        <div className={styles.TitleContainer}>
                            <h1 className=""><Skeleton></Skeleton></h1>
                        </div>
                        <div className={styles.Categories}>
                            {
                                ['', '', ''].map((genre, i) => (
                                    <Skeleton key={i} style={{ width: '100px', height: '36px' }}></Skeleton>
                                ))
                            }
                        </div>
                        <p><Skeleton count={4}></Skeleton></p>
                        <div className={styles.Cast}>
                            <div className={styles.TitleContainer}>
                                <h2 style={{ animationDelay: '.8s' }}>Cast</h2>
                            </div>
                            <div className={styles.Cast_Images}>
                                {
                                    ['', '', '', '', ''].map((_, index) => (
                                        <picture key={index}>
                                            <div style={{ zIndex: `${5 - index}` }}>
                                                <Skeleton circle width={50} height={50}></Skeleton>
                                            </div>
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
                                ['', '', ''].map((_, index) => (
                                    <div key={index} className={styles.MovieCard} style={{ border: '1px solid #313131' }}>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <AlsoLikeSkeleton></AlsoLikeSkeleton>
                </div>
            </section>
        </>
    )
}
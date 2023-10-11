import styles from "@/Styles/components/MainContent.module.scss";
import Skeleton from 'react-loading-skeleton';

function MainContentSkeleton() {
    return (
        <div className={styles.MainContent}>
            <div className={`${styles.MainContent__Section} ${styles.MainContent__SectionFirst}`}>
                {/* <Skeleton></Skeleton> */}
                <div style={{ position: 'absolute', top: '40px' }}>
                    <Skeleton circle height={60} width={60}></Skeleton>
                </div>
                <h3 className={styles.MovieTitle} style={{width:'70%'}}>
                    <Skeleton></Skeleton>
                </h3>
                <p style={{width:'70%'}}><Skeleton count={3}></Skeleton></p>
                <div className={styles.MainContent__Categories}>
                    {
                        ['', '', ''].map((item, i) => (
                            <Skeleton width={70} height={36} key={i}></Skeleton>
                        ))
                    }
                </div>
            </div>

            <div className={`${styles.MainContent__Section} ${styles.MainContent__SectionSecond} ${styles.SecondSection}`}>
                <div style={{ position: 'absolute', top: '24px' }}>
                    <Skeleton circle height={60} width={60}></Skeleton>
                </div>
                <h3 className={`${styles.MovieTitle}`} style={{width:'70%'}}><Skeleton></Skeleton></h3>
                <p><Skeleton width={100}></Skeleton></p>
            </div>

            <div className={`${styles.MainContent__Section} ${styles.MainContent__SectionThird} ${styles.SecondSection}`} >
                <div style={{ position: 'absolute', top: '24px' }}>
                    <Skeleton circle height={60} width={60}></Skeleton>
                </div>
                <h3 className={`${styles.MovieTitle}`} style={{width:'70%'}}><Skeleton></Skeleton></h3>
                <p><Skeleton width={100}></Skeleton></p>
            </div>
        </div>
    );
}

export default MainContentSkeleton;
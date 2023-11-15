import styles from '@/Styles/components/AlsoLike.module.scss';
import Skeleton from 'react-loading-skeleton';

export default function AlsoLikeSkeleton() {
    return (
        <>
            <div>
                <h2 style={{ marginBottom: '8px' }}>You might also like</h2>
                <div className={styles.AlsoLike_Container}>
                    <picture className={styles.AlsoLike_Container_Image} >
                        <Skeleton style={{ display: 'block', height: '217px', width: '120px' }}></Skeleton>
                    </picture>

                    <div className={styles.AlsoLike_Texts}>
                        <h3 style={{ width: '100px' }}><Skeleton></Skeleton></h3>
                        <div>
                            <Skeleton circle height={60} width={60}></Skeleton>
                            <div>
                                <h3 style={{ width: '100px' }}><Skeleton></Skeleton></h3>
                                <h3 style={{ width: '100px' }}><Skeleton></Skeleton></h3>
                            </div>
                            <div className={styles.InputsContainer}>
                                {
                                    ['', '', ''].map((_, _index: number) => (
                                        <label className={styles.Radio_btn} key={_index} style={{ borderColor: '#313131' }}>
                                            <input
                                                type="radio"
                                                name="Movie"
                                            />
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
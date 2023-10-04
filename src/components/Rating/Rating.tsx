import styles from '@/styles/components/Rating.module.scss'

interface Props {
    rating: number,
    top: number
}

export default function Rating({ rating, top }: Props) {
    //Longitud de la circunferencia
    const circumference = 2 * Math.PI * 27;
    // Multiplicamos por 10 para manejar valores decimales
    const scaledPercentage = rating * 10;
    // Calcula el valor para stroke-dasharray en función del porcentaje escalado
    const dashArray = (circumference * scaledPercentage) / 100;


    return (
        <>
            <div className={styles.Rating} style={{top: top}}> 
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="60px" height="60px">
                    <circle className={`${styles.Circle} ${styles.Circle__Back}`} cx="30" cy="30" r="27" strokeLinecap='round'/>
                    <circle className={`${styles.Circle} ${styles.Circle__Front}`} cx="30" cy="30" r="27" strokeLinecap='round' strokeDasharray={`${dashArray} ${circumference}`} strokeDashoffset="0" />
                </svg>
                <span className={styles.Number}>{`${rating}`}</span>
            </div>
        </>
    )
}
import styles from '@/styles/components/Ligth.module.scss'

interface Props{
    id:number,
}

export default function Ligth({id}:Props) {
    return(
        <div id={`Ligth${id}`} className={styles.Ligth}></div>
    )
}
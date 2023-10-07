import styles from '@/Styles/components/Ligth.module.scss'

interface Props {
    top: number,
    left: number
}

export default function Ligth({ left, top }: Props) {
    return (
        <div style={{top:`${top}px`, left:`${left}px`}} className={styles.Ligth}></div>
    )
}
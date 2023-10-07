import styles from '@/Styles/components/Category.module.scss';


interface Props{
    text: string
}

export default function Category({text}:Props) {
    return(
        <span className={styles.Category}>{text}</span>
    )
}
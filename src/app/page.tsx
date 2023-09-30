import styles from './page.module.scss'
import MainContent from '@/components/MainContent/MainContent'
import UpcomingMovies from '@/components/UpcomingMovies/UpcomingMovies'

export default function Home() {
  return (
    <main className={styles.Main}>
      <MainContent />
      <UpcomingMovies />
    </main> 
  )
}

import MainContent from '@/components/MainContent/MainContent'
import styles from '../Styles/app.module.scss'
import MovieProvider from '@/Context/MoviesProvider'
import UpcomingMovies from '@/components/UpcomingMovies/UpcomingMovies'

import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  return (
    <main className={styles.Main}>
      <MovieProvider>
        <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
          <MainContent />
          <UpcomingMovies />
        </SkeletonTheme>
      </MovieProvider>
    </main >
  )
}

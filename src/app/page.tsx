import MainContent from '@/components/MainContent/MainContent'
import styles from '../Styles/app.module.scss'
import MovieProvider from '@/Context/MoviesProvider'
import UpcomingMovies from '@/components/UpcomingMovies/UpcomingMovies'

import { SkeletonTheme } from 'react-loading-skeleton'
import PopularMovies from '@/components/PopularMovies/PopularMovies'


export default function Home() {
  return (

    <main className={styles.Main}>
      <MovieProvider>
        <MainContent />
        <UpcomingMovies />
        <PopularMovies />
      </MovieProvider>
    </main >

  )
}

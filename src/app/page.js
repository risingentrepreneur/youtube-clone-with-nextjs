import TopBar from '@/_components/header'
import VideosList from '@/_components/videosList'
import styles from '/public/assets/css/home.min.css'
import RegisterServiceWorker from './registerServiceWorker.js'



export default function Home() {
  

  return (
    <main className={styles.main}>
      <TopBar showNavigationAndTopicMenu = { true } />
      <div className='list-on-home-page'> <VideosList /> </div>
      <RegisterServiceWorker />
    </main>
  )
}
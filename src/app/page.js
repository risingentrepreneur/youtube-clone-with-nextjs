import TopBar from '@/_components/header'
import VideosList from '@/_components/videosList'
import styles from '/public/assets/css/page.module.min.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <TopBar showNavigationAndTopicMenu = { true } />
      <div className='video-list'> <VideosList /> </div>
    </main>
  )
}
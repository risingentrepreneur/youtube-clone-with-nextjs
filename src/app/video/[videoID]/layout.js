import TopBar from '@/_components/header'
import styles from '/public/assets/css/home.min.css'

import { Inter } from 'next/font/google'
import '/public/assets/css/globals.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Youtube Video Player',
  description: 'Created by Shivam Shukla',
}

export default function RootLayout({ children }) {
  return (
    <main className={styles.main}>
        <TopBar showNavigationAndTopicMenu = { false } />
        {children}
    </main>
  )
}

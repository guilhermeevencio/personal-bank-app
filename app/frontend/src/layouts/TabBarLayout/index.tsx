import styles from './styles.module.css'
import { Outlet } from 'react-router-dom'
import { ProfileSection } from '../../components/ProfileSection'

function TabBarLayout() {
  return (
    <div className={styles.tabBar}>
      <ProfileSection />
      <Outlet />
    </div>
  )
}

export default TabBarLayout

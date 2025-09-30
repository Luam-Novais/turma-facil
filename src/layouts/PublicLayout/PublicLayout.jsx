import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './PublicLayout.module.scss'
import { userContext } from '../../context/UserContext'

const PublicLayout = ({children}) => {
  return (
    <main className={styles.container}><Outlet/></main>
  )
}

export default PublicLayout
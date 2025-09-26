import React from 'react'
import styles from './Tittle.module.scss'

const Tittle = ({children}) => {
  return (
    <h1 className={styles.tittle}>{children}</h1>
  )
}

export default Tittle
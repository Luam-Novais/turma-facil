import React from 'react'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.loading} viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}

export default Loading
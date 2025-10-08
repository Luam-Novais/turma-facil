import React from 'react'
import styles from './Table.module.scss'

const Table = ({children}) => {
  return (
    <table>
             <thead>
                <tr className={styles.theader}>
                  <th>Indíce</th>
                  <th>Nome</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {children}
              </tbody>
    </table>
  )
}

export default Table
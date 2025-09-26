
import { useState } from 'react'
import styles from './Input.module.scss'

const Input = ({label, name, id, type ,value, setValue}) => {
  return (
    <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <input type={type} name={name} id={id} value={value} onChange={({target}) => setValue(target.value)}/>
    </div>
  )
}

export default Input
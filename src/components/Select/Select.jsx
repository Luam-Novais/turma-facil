import React from 'react'
import styles from './Select.module.scss'

const Select = ({children, value, name, id, setValue}) => {
  return (
    <select className={styles.containerSelect} name={name} id={id} value={value} onChange={({target}) => setValue(target.value)}>
        <option value="">Selecione uma Modalidade</option>
        {children}
    </select>
  )
}

export default Select
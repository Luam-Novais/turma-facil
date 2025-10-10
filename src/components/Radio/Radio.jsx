import React from 'react';
import styles from './Radio.module.scss';

const Radio = ({ label, name, id, value, state, setState }) => {
    
  return (
    <span className={styles.container}>
      <input className={styles.radio} type="radio" name={name} id={id} value={value} checked={state === value} onChange={({target}) => setState(target.value)} />
      <label className={styles.slider} htmlFor={value}>
        {label}
      </label>
    </span>
  );
};

export default Radio;

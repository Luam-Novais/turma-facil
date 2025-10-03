import React from 'react'
import { BsTools } from "react-icons/bs";
import styles from './Error.module.scss';

const Error = () => {
  return (
    <section className={styles.container}>
        <h1>Ops, Ocorreu um erro em nosso servidor. <i><BsTools/></i></h1>
        <p>Nos desculpe pelo transtorno, estamos trabalhando nisso</p>
    </section>
  )
}

export default Error
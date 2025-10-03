import React from 'react'
import { BsTools } from "react-icons/bs";
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className={styles.container}>
        <h1>Pagina não encontrada.</h1>
        <p>Deseja voltar a pagina principal ?</p>
        <Link to='/'>Início</Link>
    </section>
  )
}

export default NotFound
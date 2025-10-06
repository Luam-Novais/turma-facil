import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { IoIosHome } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { IoIosList } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  


  return (
    <nav className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <button onClick={() => setOpen(!open)}>
        <i>
          {!open ? <IoIosArrowForward/> : <IoIosArrowBack/>}
        </i>
      </button>
      <ul className={`${open ? styles.listVisible : ''}`}>
        <li className={styles.link}>
          <NavLink to='/dashboard' className={({isActive}) => (isActive ? `${styles.active}` : '')}>
            <i>
              <IoIosHome />
            </i>
            <span className={`${open ? styles.visible : ''}`} >Inicio</span>
          </NavLink>
        </li>
         <li className={styles.link}>
          <NavLink to='/buscar-modalidade' className={(isActive) => (isActive ? `${styles.isActive}` : '')}>
            <i>
              <IoIosSearch />
            </i>
            <span className={`${open ? styles.visible : ''}`}>Buscar</span>
          </NavLink>
        </li>
         <li className={styles.link}>
          <NavLink to='/add-aluno-modalidade' className={(isActive) => (isActive ? `${styles.isActive}` : '')}>
            <i>
              <IoAddOutline />
            </i>
            <span className={`${open ? styles.visible : ''}`}>Adicionar</span>
          </NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to='/listar-alunos' className={(isActive) => (isActive ? `${styles.isActive}` : '')}>
            <i>
              <IoIosList />
            </i>
            <span className={`${open ? styles.visible : ''}`}>Listar alunos</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

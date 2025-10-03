import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Navbar = () => {
  return (
    <aside>
      <nav>
        <Loading/>
        <NavLink>criar aluno</NavLink>
        <NavLink>editar aluno</NavLink>
        <NavLink>criar modalidade</NavLink>
        <NavLink>listar alunos</NavLink>
      </nav>
    </aside>
  );
};

export default Navbar;

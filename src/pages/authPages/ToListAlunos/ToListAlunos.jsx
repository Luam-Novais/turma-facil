import React, { useEffect, useState } from 'react';
import styles from './ToListAlunos.module.scss';
import Table from '../../../components/Table/Table';
import useFetch from '../../../hooks/useFetch';
import formaterToken from '../../../utils/formaterToken';
import Loading from '../../../components/Loading/Loading';
const API_URL = import.meta.env.VITE_API_URL;

const ToListAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const { request, loading } = useFetch();
  const token = formaterToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const responseAlunos = await request('http://localhost:3000/aluno/get-all-alunos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(responseAlunos.response.ok) setAlunos(responseAlunos.json)
      } catch (error) {console.log(error)}
    }
    fetchData();
  }, []);

  console.log(alunos)

  if(loading){
    return <Loading/>
  }
  if(alunos){
    return (
      <section className={styles.container}>
        <h1>Todos Alunos</h1>
        <Table>
          <thead>
            <tr>
              <th>Indíce</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Modalidades</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => {
              return (
                <tr className={`${aluno.status == 'inativo' ? styles.inactive : ''}`}>
                  <td>{index + 1}</td>
                  <td>{aluno.name}</td>
                  <td>{aluno.status}</td>
                  { aluno.modalidades instanceof Array &&
                    <td>
                      {aluno.modalidades.slice(0, 2).map((mod) => mod.name).join(', ')}
                      {aluno.modalidades.length > 2 && `+${aluno.modalidades.length - 2}`}
                    </td>
                  }
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>
    );
  }
};

export default ToListAlunos;

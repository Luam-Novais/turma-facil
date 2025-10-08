import React, { useEffect, useState } from 'react';
import styles from './SearchModalidade.module.scss';
import Loading from '../../../components/Loading/Loading';
import Table from '../../../components/Table/Table';
import formaterToken from '../../../utils/formaterToken';
import { jwtDecode } from 'jwt-decode';
import useFetch from '../../../hooks/useFetch';
const API_URL = import.meta.env.VITE_API_URL;

const SearchModalidade = () => {
  const [modalidades, setModalidades] = useState(null);
  const [selectedModalidade, setSelectedModalidade] = useState('');
  const [alunos, setAlunos] = useState([]);
  const { request, loading } = useFetch();
  const token = formaterToken();
  const decode = jwtDecode(token);

  function handleChange(e) {
    setSelectedModalidade(e.target.value);
  }

  useEffect(() => {
    async function fetchModalidade() {
      const responseModalidade = await request(`${API_URL}modalidade/get-all-modalidades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profId: decode.profId }),
      });
      setModalidades(responseModalidade.json);
    }
    fetchModalidade();
  }, []);

  useEffect(() => {
    async function fetchAlunos() {
      const responseAlunos = await request(`${API_URL}modalidade/get-alunos-by-modalidade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ modalidadeId: selectedModalidade }),
      });
      console.log(responseAlunos.json);
      if (responseAlunos.json instanceof Array) setAlunos(responseAlunos.json);
    }
    fetchAlunos();
  }, [selectedModalidade]);
  if (loading) {
    return <Loading />;
  }
  if (modalidades) {
    return (
      <section className={styles.container}>
        <select name="modalidades" id="modalidades" onChange={handleChange} value={selectedModalidade}>
          <option value="">Selecione uma modalidade</option>
          {modalidades.map((modalidade) => {
            return (
              <option key={modalidade.id} value={modalidade.id}>
                {modalidade.name}
              </option>
            );
          })}
        </select>
        {selectedModalidade ? (
          <div className={styles.listContainer}>
            <span>
              <h3>Lista de alunos</h3>
              <p>total de alunos: {alunos.length}</p>
            </span>

            <Table>
              {alunos &&
                alunos.map((aluno, index) => {
                  return (
                    <tr className={`${aluno.status == 'inativo' ? styles.inactive : ''}`}>
                      <td>{index + 1}</td>
                      <td>{aluno.name}</td>
                      <td >{aluno.status}</td>
                    </tr>
                  );
                })}
            </Table>
          </div>
        ) : (
          <p>Por favor selecione qual modalidade você deseja buscar.</p>
        )}
      </section>
    );
  }
};

export default SearchModalidade;

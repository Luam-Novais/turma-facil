import React, { useContext, useEffect, useState } from 'react';
import styles from './AddAlunosOrModalidade.module.scss';
import Radio from '../../../components/Radio/Radio';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Loading from '../../../components/Loading/Loading';
import Select from '../../../components/Select/Select';
import useFetch from '../../../hooks/useFetch';
import formaterToken from '../../../utils/formaterToken';
import { jwtDecode } from 'jwt-decode';
import { userContext } from '../../../context/UserContext';
import { data } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const AddAlunosOrModalidade = () => {
  const [modalidades, setModalidades] = useState([]);
  const [radio, setRadio] = useState('aluno');
  const [nameAluno, setNameAluno] = useState('');
  const [nameModalidade, setNameModalidade] = useState('');
  const [selectedModalidade, setSelectedModalidade] = useState('');
  const { request, loading } = useFetch();
  const { createALuno, createModalidade } = useContext(userContext);
  const token = formaterToken();
  const decode = jwtDecode(token);

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
      if (responseModalidade.response.ok) setModalidades(responseModalidade.json);
    }
    fetchModalidade();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
   if(radio === 'aluno'){
     if (nameAluno && selectedModalidade) {
      console.log(selectedModalidade)
       const data = { name: nameAluno, modalidadeId: selectedModalidade };
       createALuno(data);
     } else {
       alert('preencha corretamente os dados.');
     }
   }else if(radio === 'modalidade'){
    if(nameModalidade){
       const data = { name: nameModalidade};
       createModalidade(data)
    }
   }
  }
  if(loading){
    return <Loading/>
  }
  return (
    <section className={styles.container}>
      <h3>Oque você deseja criar ?</h3>
      <div className={styles.containerInputs}>
        <Radio label="Aluno" setState={setRadio} state={radio} id="aluno" checked={radio === 'aluno'} name="selectOption" value="aluno" />
        <Radio label="Modalidade" setState={setRadio} state={radio} id="modalidade" checked={radio === 'modalidade'} name="selectOption" value="modalidade" />
      </div>
      {radio === 'aluno' && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Criar Aluno</h3>
          <span>
            <Input label="Nome" id="nameAluno" type="text" name="nameAluno" value={nameAluno} setValue={setNameAluno} />
            <Select id="modalidades" name="modalidades" value={selectedModalidade} setValue={setSelectedModalidade}>
              {modalidades.map((modalidade) => {
                return (
                  <option key={modalidade.id} value={modalidade.id}>
                    {modalidade.name}
                  </option>
                );
              })}
            </Select>
          </span>
          <Button>Criar Aluno</Button>
        </form>
      )}
      {radio === 'modalidade' && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Criar Modalidade</h3>
            <Input label="Nome" id="nameModalidade" type="text" name="nameModalidade" value={nameModalidade} setValue={setNameModalidade} />
          <Button>Criar Modalidade</Button>
        </form>
      )}
    </section>
  );
};

export default AddAlunosOrModalidade;

//       <span>
//

import React, { useContext, useState } from 'react';
import styles from './CreateAccount.module.scss';
import Tittle from '../../../components/Tittle/Tittle';
import Input from '../../../components/Input/Input';
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { userContext } from '../../../context/UserContext';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, userCreate } = useContext(userContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && username && password) {
      const data = {
        name,
        username,
        password,
      };
      userCreate(data);
    }
  }
  if(loading){
    return <Loading/>
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <img src="../../public/logo.svg" alt="" />
      <Tittle>Criar conta</Tittle>
      <Input name="name" id="name" label="Nome do professor" type="text" value={name} setValue={setName} />
      <Input name="username" id="username" label="Nome de usuário" type="text" value={username} setValue={setUsername} />
      <Input name="password" id="password" label="Senha" type="password" value={password} setValue={setPassword} />
      <Button>Criar conta</Button>
      <p>Ja possui uma conta ?</p>
      <Link to="/login"> Efetue o login agora</Link>
    </form>
  );
};

export default CreateAccount;

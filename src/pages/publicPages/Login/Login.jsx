import { useContext, useState } from 'react'
import styles from './Login.module.scss'
import Input from '../../../components/Input/Input'
import Tittle from '../../../components/Tittle/Tittle'
import Button from '../../../components/Button/Button'
import { userContext } from '../../../context/UserContext'
import Loading from '../../../components/Loading/Loading'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {userLogin, loading, userAuthorized }= useContext(userContext)


  const handleSubmit = (e)=>{
    e.preventDefault()
    if(username.length <= 0 || typeof username !== 'string' || username.length <= 0 || typeof password !== 'string'){
      return alert('Ocorreu um erro, verifique os dados enviados.')
    }
    const data = {username, password}
    userLogin(data)
  }

  if(loading) {
    return <Loading/>
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <img src="../../public/logo.svg" alt="" />
      <Tittle>Entrar</Tittle>
        <Input name='username' id='username' label='Nome de usuário' type='text' value={username} setValue={setUsername}/>
        <Input name='password' id='password' label='Senha' type='password' value={password} setValue={setPassword}/>
        <Button>Entrar</Button>
        <p>Ainda não possui uma conta ?</p>
        <Link to='/criar-conta'> Crie agora</Link>
    </form>
  )
}

export default Login
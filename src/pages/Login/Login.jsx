import { useContext, useState } from 'react'
import styles from './Login.module.scss'
import Input from '../../components/Input/Input'
import Tittle from '../../components/Tittle/Tittle'
import Button from '../../components/Button/Button'
import { userContext } from '../../context/UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {userLogin, loading }= useContext(userContext)

  const handleSubmit = (e)=>{
    e.preventDefault()
    userLogin()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <img src="../../public/logo.svg" alt="" />
      <Tittle>Entrar</Tittle>
        <Input name='username' id='username' label='Nome de usuário' type='text' value={username} setValue={setUsername}/>
        <Input name='password' id='password' label='Senha' type='password' value={password} setValue={setPassword}/>
        <Button>Entrar</Button>
    </form>
  )
}

export default Login
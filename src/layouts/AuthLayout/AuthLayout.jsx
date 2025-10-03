import  { useContext} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './AuthLayout.module.scss'
import { userContext } from '../../context/UserContext'
import Navbar from '../../components/Navbar/Navbar'

const AuthLayout = () => {
    const {userAuthorized} = useContext(userContext)
    const navigate = useNavigate() 
    if(userAuthorized){
        return(
            <main>
               <Navbar/>
                <Outlet/>
            </main>
        )
    }
}

export default AuthLayout
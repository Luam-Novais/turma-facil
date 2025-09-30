import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './AuthLayout.module.scss'
import { userContext } from '../../context/UserContext'


const AuthLayout = () => {
    const {userAuthorized} = useContext(userContext)
    const navigate = useNavigate() 
    if(userAuthorized){
        return(
            <main><Outlet/></main>
        )
    }
}

export default AuthLayout
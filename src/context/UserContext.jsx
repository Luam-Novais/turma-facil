import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const userContext = createContext()
const UserStorage = ({children}) => {
    const [userAuthorized, setUserAuthorized] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function userLogin(data){
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/login-prof', {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await response.json()
            if(response.ok){
                setUserAuthorized(true)
                const token = json.token
                if(token) localStorage.setItem('token', JSON.stringify(token))   
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    async function verifyToken(token){
        const response = await fetch('http://localhost:3000/validate-token',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            setUserAuthorized(true)
            navigate('/dashboard')
            console.log(userAuthorized)
        }else{
            navigate('/login')
        }
    }
    useEffect(()=>{
        
        const tokenLocal = localStorage.getItem('token')
        if(tokenLocal){
            const token = tokenLocal.slice(1, tokenLocal.length - 1)
            verifyToken(token)
        }
        else navigate('/login')
    }, [])
    return (
        <userContext.Provider 
            value={{
                userLogin, loading, userAuthorized
            }}>
           {children}
        </userContext.Provider>
    )
}

export default UserStorage
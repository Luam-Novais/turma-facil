import React, { createContext, useState } from 'react'

export const userContext = createContext()
const UserStorage = ({children}) => {
    const [loading, setLoading] = useState(false)
    async function userLogin(){
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/login-prof`, {
                method: 'POST'
            })
            const json = await response.json()
            console.log(json)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return (
        <userContext.Provider 
            value={{
                userLogin, loading
            }}>
           {children}
        </userContext.Provider>
    )
}

export default UserStorage
import React from 'react'
import UserStorage from './UserContext'

const GlobalContext = ({children}) => {
  return (
    <UserStorage>
        {children}
    </UserStorage>
  )
}

export default GlobalContext
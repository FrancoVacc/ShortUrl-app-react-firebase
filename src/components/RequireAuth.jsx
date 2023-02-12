import React from 'react'
import { useUserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({children}) => {

    const {user} = useUserContext()
    const navigate = useNavigate()
    
    if(!user) return navigate("/login");

    return children
}

export default RequireAuth
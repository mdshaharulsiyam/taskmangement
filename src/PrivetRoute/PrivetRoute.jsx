import React, { useContext } from 'react'
import { FrankStoreData } from '../Context/FrankStoreContext'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({children}) => {
    const {loading,currentUser}=useContext(FrankStoreData)
    if (loading) {
        return <span className="loading loading-ring absolute w-36 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  block "></span>
    }
    if (!currentUser?.useremail) {
        return <Navigate to={'/login'}></Navigate>
    }
  return children
  
}

export default PrivetRoute

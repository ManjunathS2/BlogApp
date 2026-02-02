import React, { useContext, createContext, useEffect, useState } from 'react'
import axios from "axios"

const AuthContext = createContext();

function AuthProvider({children}) {
    
    const [blog,setBlog]=useState()

    useEffect( ()=>{
        const fetchBlog=async()=>{
            try {
              const { data } = await axios.get(
                "http://localhost:4000/api/blog/all-blog",
              );
              console.log(data);
              setBlog(data);
            } catch (error) {
              console.log(error);
            }
        }
        fetchBlog()
    },[])
  return (
    <div>
        <AuthContext.Provider value={{blog}}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}

export const useAuth=()=>useContext(AuthContext)

export default AuthProvider
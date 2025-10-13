import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import formaterToken from '../utils/formaterToken';

const API_URL = import.meta.env.VITE_API_URL

export const userContext = createContext();
const UserStorage = ({ children }) => {
  const {request} = useFetch()
  const token = formaterToken()
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function userCreate(data) {
    setLoading(true);
    try {
      const responseCreate = await request(`${API_URL}create-prof`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (responseCreate.response.ok) {
            setUserAuthorized(true);
            const token = responseCreate.json.token;
            if (token) localStorage.setItem('token', JSON.stringify(token));
            navigate('/dashboard');
      }
    } catch (error) {
        console.log(error)
        navigate('/error-servidor')
    } finally {
      setLoading(false);
    }
  }
  async function userLogin(data) {
    setLoading(true);
    try {
      const responseLogin = await request(`${API_URL}login-prof`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      alert(responseLogin.json.message);
      if (responseLogin.response.ok) {
        setUserAuthorized(true);
        const token = responseLogin.json.token;
        if (token) localStorage.setItem('token', JSON.stringify(token));
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      navigate('/error-servidor')
    } finally {
      setLoading(false);
    }
  }
  async function createALuno(data) {
    try {
        const responseAluno = await request(`${API_URL}aluno/create-aluno`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        console.log(responseAluno)
        if(responseAluno.response.ok) alert(responseAluno.json.message)
    } catch (error) {
      console.log(error)
    }
  }
   async function createModalidade(data) {
    try{
      const responseModalidade = await request(`${API_URL}modalidade/create-modalidade`, {
       method: 'POST',
       headers:{
         'Content-Type' : 'application/json',
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify(data)
      });
      if(responseModalidade.response.ok){
         alert(responseModalidade.json.message)
      }
      
    }catch(error){
      console.log(error)
    }

   }
  async function verifyToken(token) {
    try {
      const response = await fetch(`${API_URL}validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUserAuthorized(true);
        navigate('/dashboard');
      } else {
        setUserAuthorized(false);
        navigate('/login');
      }
    } catch (error) {
      console.log('oi', error);
      navigate('/error-servidor');
    }
  }
  useEffect(() => {
    if(token){
      verifyToken(token);
    }else navigate('/login');
  }, []);
  return (
    <userContext.Provider
      value={{
        userLogin,
        loading,
        userCreate,
        userAuthorized,
        createALuno,
        createModalidade
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserStorage;

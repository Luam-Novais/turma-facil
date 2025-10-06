
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/publicPages/Login/Login';
import CreateAccount from './pages/publicPages/CreateAccount/CreateAccount';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import GlobalContext from './context/GlobalContext';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Dashboard from './pages/authPages/Dashboard/Dashboard'
import Error from './pages/publicPages/Error/Error';
import NotFound from './pages/publicPages/NotFound/NotFound'




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route path='/' element={<AuthLayout/>}/>
          <Route element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="criar-conta" element={<CreateAccount />} />
          </Route>
          <Route  element={<AuthLayout/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/buscar-modalidade' element={<SearchModalidade/>}/>
              <Route path='/add-aluno-modalidade' element={<AddALunoOrModalidade/>}/>
              <Route path='/listar-alunos' element={<ToListALunos/>}/>
          </Route>
          <Route path='/error-servidor' element={<Error/>}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
};

export default AppRoutes;

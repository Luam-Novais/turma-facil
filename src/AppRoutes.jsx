
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import GlobalContext from './context/GlobalContext';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Dashboard from './pages/Dashboard/Dashboard'
import { useContext} from 'react';
import { userContext } from './context/UserContext';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route path='/' element={<AuthLayout/>}/>
          <Route element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route  element={<AuthLayout/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
};

export default AppRoutes;

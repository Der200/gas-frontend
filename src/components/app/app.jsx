import { Routes, Route } from 'react-router-dom';

import Login from '../../pages/login';
import Register from '../../pages/register';
import Profile from '../../pages/profile';
import Company from '../../pages/company';
import AppHeader from '../app-header/app-header';
import Features from '../../pages/features';
import Statement from '../../pages/statement';

import ProtectedRoute from '../protected-route/protected-route';


function App() {

  return (
    <>
      <AppHeader/>
      <Routes>
        <Route exact path="/profile" element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>        
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/statement" element={<Statement />} />
        <Route exact path="/" element={<Company />} />
      </Routes>
    </>
  );
}

export default App;

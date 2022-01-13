
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const auth = true ? localStorage.getItem('accessToken') : false;

  return auth ? <Outlet /> : <Navigate to="/login" />;
} 

export default ProtectedRoute;
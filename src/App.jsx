import { Routes, Route } from 'react-router-dom';
import './i18n';
import Users from './pages/dashboard/users';
import Orders from './pages/dashboard/orders';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ProtectedRoute from './protect/protectedRoute';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

function App() {
   return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={
 
          <DashboardLayout />
   
      }>
        <Route index element={<div>Welcome'</div>} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;

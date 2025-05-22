import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './i18n';
import Users from './pages/dashboard/users';
import Orders from './pages/dashboard/orders';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ProtectedRoute from './protect/protectedRoute';
import Login from './pages/auth/login';


function App() {
  const { t, i18n } = useTranslation();

  return (


        <Routes>
                    <Route path="login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<div>{t('Welcome')}</div>} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>


  );
}

export default App;

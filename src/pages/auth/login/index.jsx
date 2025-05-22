
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import Input from 'antd/es/input/Input';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (credentials) => {
    try {
      // Perform login request
      await axios.post('/login', credentials);
      // On success, navigate to the original destination
      navigate(from, { replace: true });
    } catch (error) {
      // Handle login errors
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
     <form>
      <Input type="password" name="" id="" />
      <Input type="text" name="" id="" />
      <Button>Login</Button>
     </form>
    </div>
  );
};

export default Login;

import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import Input from 'antd/es/input/Input';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value
    };

    try {
      await axios.post('/login', credentials);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <Input className="login-input" name="username" placeholder="Username" />
        <Input.Password className="login-input" name="password" placeholder="Password" />
        <Button className="login-button" type="primary" htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import Input from 'antd/es/input/Input';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post('/register', newUser);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Create Account</h2>
        <Input className="register-input" name="username" placeholder="Username" />
        <Input className="register-input" name="email" type="email" placeholder="Email" />
        <Input.Password className="register-input" name="password" placeholder="Password" />
        <Button className="register-button" type="primary" htmlType="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;

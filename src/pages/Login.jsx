import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
  
    const [authStatus, setAuthStatus] = useState('');

    const navigate = useNavigate();
  
    const auth = (event) => {
      event.preventDefault();
      setAuthStatus('');
  
      axios.post('/api/login?username=' + loginInput + '&password=' + password).then((data) => {
        setAuthStatus('Успешных вход');
        localStorage.setItem('jwt', data.data.access_token);
        navigate('/');
      }).catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            setAuthStatus('Проверьте логин или пароль');
          }
        }
      });
    }

    return (
        <div className="login">
            <h1 className="logo">Сила Кошелька</h1>
            <span className="green__line"></span>
            <h2 className="title">Вход</h2>
            <form onSubmit={ auth } action="" className="form">
                <input className="input_login" type="text" placeholder="Логин или идентификатор" name="userLogin"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}/>
                <input className="input_password" type="password" placeholder="Пароль" name="userPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button className="button_submit">Войти</button>
                <a href="#" className="forgot_password">Забыли пароль?</a>
                <a href="#" className="register">Регистрация</a>
            </form>
        </div>
    )
}
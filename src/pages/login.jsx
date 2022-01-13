import { Stack, Button, Container, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData, login, authorizationStatus, otherRequestsStatus } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';
import { replaceRequestData } from '../utils/functions';
import Reaptcha from 'reaptcha';

const Login = () => {
  const [showPasswordFlag, setShowPasswordFlag] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStatus = useSelector(authorizationStatus);
  const userDataStatus = useSelector(otherRequestsStatus);
  const [getDataStatus, setGetDataStatus] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (userStatus === 'succeeded' && getDataStatus === false) {
      const accessToken = localStorage.getItem('accessToken');
      dispatch(getUserData(accessToken));
      setGetDataStatus(true);
    }
    if(userDataStatus === 'succeeded') {
      navigate('/profile', {replace: true});
    }
  }, [userStatus, userDataStatus])
 
  const handleClickShowPassword = () => {
    setShowPasswordFlag(!showPasswordFlag);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onVerify = (recaptchaResponse) => {
    setVerified(true);
  }

  const [loginData, setLoginData] = useState({username: "", password: ""});

  const loginDataHandler = (event) => {
    setLoginData({...loginData, [event.target.name]: event.target.value});
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(replaceRequestData(loginData)));
  }

  if (localStorage.getItem('currentUser') !== null) {
    return <Navigate to='/profile'/>
  }

  return (
    <>
      <Container maxWidth="sm" component="main">
        <Stack 
          component="form"
          spacing={2}
          onSubmit={submitHandler}
        >
          <h1  style={{margin: "25px auto"}}>Вход в личный кабинет</h1>
          <label htmlFor="email">Email</label>
          <TextField 
            id="email"
            label="Поле ввода почты" 
            variant="outlined"
            type="email"
            required
            name="username"
            onChange={loginDataHandler}
            value={loginData.username || ''}
          />
          <label htmlFor="password">Пароль</label>
          <TextField 
            id="password"
            label="Введите пароль" 
            variant="outlined"
            name="password"
            type={showPasswordFlag ? "text" : "password"} 
            required 
            onChange={loginDataHandler}
            value={loginData.password || ''}
            InputProps={{endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPasswordFlag ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>}} 
          />
          <Typography>Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Typography>
          {/* work with actual sitekey */}
          <Reaptcha sitekey="undefined" onVerify={onVerify}/>
          <Button size="large" type="submit" disabled={!verified}>Войти</Button>
        </Stack>
      </Container>
    </>
  )
}

export default Login;
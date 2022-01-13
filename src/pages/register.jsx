import React, { useEffect, useState } from 'react';
import {
  Button, 
  Container, 
  TextField, 
  Box, 
  IconButton, 
  InputAdornment,
  Checkbox, 
  FormControlLabel } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, register, registerStatus } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch, useSelector } from 'react-redux';
import { replaceRequestData } from '../utils/functions';

import styles from './pages-styles.module.css';
import PersonalPaper from '../components/personal-paper/personal-paper';
import Reaptcha from 'reaptcha';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    surname: "",
    name: "",
    patronymic: "",
    address: "",
    offer: "",
    password: "",
    tel: "",
    contract: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const successRegister = useSelector(registerStatus);
  const [verified, setVerified] = useState(false);


  useEffect(() => {
    if (successRegister === 'succeeded') {
      dispatch(login(replaceRequestData({
        "username": registerData.email,
        "password": registerData.password
      })))
      navigate('/', {replace: true});
    }
  }, [successRegister])

  const registerDataHandler = (event) => {
    setRegisterData({...registerData, [event.target.name]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onVerify = (recaptchaResponse) => {
    setVerified(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(register({
      'email': registerData.email,
      'is_active': true,
      'is_superuser': false,
      'person': {
        'first_name': registerData.name,
        'last_name': registerData.surname,
        'second_name': registerData.patronymic,
        'address': registerData.address,
        'offer_id': registerData.contract,
        'phone': registerData.tel
      },
      'password': registerData.password
    }));
    dispatch(login(replaceRequestData({
      "username": registerData.email,
      "password": registerData.password
    })))
  }

  if (localStorage.getItem('currentUser') !== null) {
    return <Navigate to='/profile'/>
  }

  return (
    <>
      <Container maxWidth="md" component="main" sx={{marginBottom: "50px"}}>
        <h1 style={{margin: "25px auto", textAlign: "center"}}>Регистрация аккаунта</h1>
        <form 
          onSubmit={submitHandler}
          className={styles.profile__box}          
        >
          <Box className={styles.profile__name_block}>
            <div>
              <label htmlFor="surname">Фамилия</label>
              <TextField 
                id="surname"
                label="Введите вашу фамилию" 
                variant="outlined"
                type="text"
                required
                name="surname"
                value={registerData.surname || ""}
                onChange={registerDataHandler}
                className={styles.profile__field}
              />
            </div>
            <div style={{marginTop: "15px"}}>
              <label htmlFor="name">Имя</label>
              <TextField 
                id="name"
                label="Введите ваше имя" 
                variant="outlined"
                type="text"
                required
                name="name"
                value={registerData.name || ""}
                onChange={registerDataHandler}
                className={styles.profile__field}
              />
            </div>
            <div style={{marginTop: "15px"}}>
              <label htmlFor="patronymic">Отчество (при наличии)</label>
              <TextField 
                id="patronymic"
                label="Введите ваше отчество" 
                variant="outlined"
                type="text"
                name="patronymic"
                value={registerData.patronymic || ""}
                onChange={registerDataHandler}
                className={styles.profile__field}
              />
            </div>
          </Box>
          <div className={styles.profile__user_block}>
            <div className={styles.profile__contact}>
              <label htmlFor="tel">Контактный телефон</label>
              <TextField 
                id="tel"
                label="Ваш контактный номер" 
                variant="outlined"
                type="tel"
                required
                name="tel"
                value={registerData.tel || ""}
                onChange={registerDataHandler}
                className={styles.profile__field}
              />
            </div>
            <div className={styles.profile__contact}>
              <label htmlFor="email">Email</label>
              <TextField 
                id="email"
                label="Поле ввода почты" 
                variant="outlined"
                type="email"
                required
                name="email"
                value={registerData.email || ""}
                onChange={registerDataHandler}
                className={styles.profile__field}
              />
            </div>
            <div className={styles.profile__address}>
              <label htmlFor="email">Адрес</label>
              <TextField 
                id="address"
                label="Ваш адрес в свободной форме (без индекса)" 
                variant="outlined"
                type="text"
                required
                multiline
                rows={2}
                maxRows={2}
                name="address"
                value={registerData.address || ""}
                onChange={registerDataHandler}
                className={styles.profile__field}
              />
              <div className={styles.profile__offer}>
                <label htmlFor="contract">Номер договора</label>
                <TextField 
                  id="contract"
                  label="Введите номер договора" 
                  variant="outlined"
                  type="number"
                  required
                  name="contract"
                  value={registerData.contract || ""}
                  onChange={registerDataHandler}
                  className={styles.profile__field}
                />
              </div>
            </div>
          </div>
          <div className={styles.profile__password}>
            <label htmlFor="password">Пароль</label>
            <Box className={styles.profile__password_box}>
              <TextField
                className={styles.profile__password_field}
                id="password"
                label="Введите пароль" 
                variant="outlined"
                name="password"
                value={registerData.password || ""}
                type={!passwordVisible ? "password" : "text"} 
                required 
                onChange={registerDataHandler}
                InputProps={{endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>}} 
              />
            </Box>
            <PersonalPaper>
              <Box>
                <FormControlLabel 
                  control={<Checkbox required />} 
                  label="Согласие на обработку персональных данных"
                  sx={{marginTop: "20px", width: "100%"}}
                />
                <FormControlLabel 
                  control={<Checkbox required />} 
                  label="Согласие на получение рекламных материалов" 
                />
              </Box>
            </PersonalPaper>
          </div>
          {/* work with actual sitekey */}
          <Reaptcha sitekey="undefined" onVerify={onVerify}/>
          <Button size="large" type="submit" sx={{width: "100%"}}  disabled={!verified}>Зарегистрироваться</Button>
        </form>
      </Container>
    </>
  )
}

export default Register;
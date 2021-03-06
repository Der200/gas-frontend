import React,  { useState } from 'react';
import {
  Button, 
  Container, 
  TextField, 
  Box, 
  IconButton, 
  InputAdornment, 
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, updateUserData } from '../services/redux/authorization-slice/authorization-slice';

import styles from './pages-styles.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log()
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const initialKabinetData = {
    surname: user.last_name,
    name: user.first_name,
    patronymic: user.second_name,
    tel: user.phone,
    address: user.address,
    email: user.email,
    password: null,
    contract: user.offer_id
  }

  const [changeStatus, setChangeStatus] = useState(false);
  const [kabinetData, setKabinetData] = useState(initialKabinetData);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeDataHandler = (event) => {
    setChangeStatus(!changeStatus);
  }

  const cancelDataHandler = (event) => {
    setKabinetData(initialKabinetData);
    setChangeStatus(!changeStatus);
  }

  const submitDataHandler = (event) => {
    const token = localStorage.getItem('accessToken');
    setChangeStatus(!changeStatus);
    dispatch(updateUserData({
      'user': {
      'email': kabinetData.email,
      'is_active': true,
      'is_superuser': false,
      'person': {
        'first_name': kabinetData.name,
        'last_name': kabinetData.surname,
        'second_name': kabinetData.patronymic,
        'address': kabinetData.address,
        'offer_id': kabinetData.contract,
        'phone': kabinetData.tel
      },
      'password': kabinetData.password
      }, 
      'token': token}));
  }

  const kabinetDataHandler = (event) => {
    setKabinetData({...kabinetData, [event.target.name]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const logoutHandler = (event) => {
    dispatch(logout());
    navigate('/', {replace: true})
  }

  return (
    <>
      <Container maxWidth="md" component="main" sx={{marginBottom: "50px", marginTop: "70px"}}>
        <h1 style={{margin: "25px auto", textAlign: "center"}}>???????????? ?????????????? <Button onClick={logoutHandler}>??????????</Button></h1>
        <form 
          className={styles.profile__box}          
        >
          <Box className={styles.profile__name_block}>
            <div>
              <label htmlFor="surname">??????????????</label>
              <TextField 
                id="surname"
                label="?????????????? ???????? ??????????????" 
                variant="outlined"
                type="text"
                required
                name="surname"
                value={kabinetData.surname || ""}
                onChange={kabinetDataHandler}
                disabled={!changeStatus ? true : false}
                className={styles.profile__field}
              />
            </div>
            <div style={{marginTop: "15px"}}>
              <label htmlFor="name">??????</label>
              <TextField 
                id="name"
                label="?????????????? ???????? ??????" 
                variant="outlined"
                type="text"
                required
                name="name"
                value={kabinetData.name || ""}
                onChange={kabinetDataHandler}
                disabled={!changeStatus ? true : false}
                className={styles.profile__field}
              />
            </div>
            <div style={{marginTop: "15px"}}>
              <label htmlFor="patronymic">???????????????? (?????? ??????????????)</label>
              <TextField 
                id="patronymic"
                label="?????????????? ???????? ????????????????" 
                variant="outlined"
                type="text"
                name="patronymic"
                value={kabinetData.patronymic || ""}
                onChange={kabinetDataHandler}
                disabled={!changeStatus ? true : false}
                className={styles.profile__field}
              />
            </div>
          </Box>
          <div className={styles.profile__user_block}>
            <div className={styles.profile__contact}>
              <label htmlFor="tel">???????????????????? ??????????????</label>
              <TextField 
                id="tel"
                label="?????? ???????????????????? ??????????" 
                variant="outlined"
                type="tel"
                required
                name="tel"
                value={kabinetData.tel || ""}
                onChange={kabinetDataHandler}
                disabled={!changeStatus ? true : false}
                className={styles.profile__field}
              />
            </div>
            <div className={styles.profile__contact}>
              <label htmlFor="email">Email</label>
              <TextField 
                id="email"
                label="???????? ?????????? ??????????" 
                variant="outlined"
                type="email"
                required
                name="email"
                value={kabinetData.email || ""}
                onChange={kabinetDataHandler}
                disabled={!changeStatus ? true : false}
                className={styles.profile__field}
              />
            </div>
            <div className={styles.profile__address}>
              <label htmlFor="address">??????????</label>
                <TextField 
                  id="address"
                  label="?????? ?????????? ?? ?????????????????? ?????????? (?????? ??????????????)" 
                  variant="outlined"
                  type="text"
                  required
                  multiline
                  minRows={2}
                  maxRows={2}
                  name="address"
                  value={kabinetData.address || ""}
                  onChange={kabinetDataHandler}
                  disabled={!changeStatus ? true : false}
                  className={styles.profile__field}
                />
              <div className={styles.profile__offer}>
                <label htmlFor="contract">?????????? ????????????????</label>
                <TextField 
                  id="contract"
                  label="?????????????? ?????????? ????????????????" 
                  variant="outlined"
                  type="number"
                  required
                  name="contract"
                  value={kabinetData.contract || ""}
                  onChange={kabinetDataHandler}
                  disabled={!changeStatus ? true : false}
                  className={styles.profile__field}
                />
              </div>
            </div>
          </div>
          <div className={styles.profile__password}>
            <label htmlFor="password">????????????</label>
            <Box className={styles.profile__password_box}>
              <TextField
                className={styles.profile__password_field}
                id="password"
                label="?????????????? ????????????" 
                variant="outlined"
                name="password"
                value={kabinetData.password || ""}
                type={!passwordVisible ? "password" : "text"} 
                required 
                onChange={kabinetDataHandler}
                disabled={!changeStatus ? true : false}
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
          </div>
          {!changeStatus && <Button size="large" type="submit" sx={{width: "100%", marginTop: "20px"}} onClick={changeDataHandler}>?????????????????????????? ????????????</Button>}
          {changeStatus && 
            <>
              <Button variant="contained" size="large" color="success" type="submit" sx={{width: "48%", marginTop: "20px"}} onClick={submitDataHandler}>?????????????????? ??????????????????</Button>
              <Button size="large" color="error" type="button" sx={{width: "48%", marginTop: "20px"}} onClick={cancelDataHandler}>????????????????</Button>
            </>
          }
        </form>
      </Container>
    </>
  )
}

export default Profile;
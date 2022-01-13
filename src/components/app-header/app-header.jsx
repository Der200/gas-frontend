import React from 'react';
import { Box, Stack, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../icons/logo-icon.png';
import { Phone, Home, AccessTime } from '@mui/icons-material';
import styles from './app-header.module.css';

const AppHeader = () => {

  return (
    <Box 
      maxWidth="100%" 
      component="header"
      sx={{
        height: "140px",
        borderBottom: "1px solid #e7e7e7"
      }} 
    >
      <Stack
        component="nav"
        justifyContent="space-between"
        direction="row"
        sx={{height: "80px", maxWidth: "1200px", margin: "0 auto"}}
      >
        <div className={styles.logo__wrapper}>
          <NavLink
            to={"/"}
            className={styles.header__link}
          >
            <div className={styles.header__logo}>
              <img src={logo} alt="логотип" width="80px" height="80px" style={{top: "10px", paddingRight: "10px"}}/>
              <span className={styles.logo__text}>НИЖНОВГАЗ</span>
            </div>
          </NavLink>
          <Stack
            className={styles.address}
            direction="column"
            justifyContent="center"
            component="div"
          >
            <div className={styles.address__item}>
              <Home/>
              <span>Нижний Новгород, ул.Ванеева ...</span>
            </div>
            <div className={styles.address__item}>
              <AccessTime/>
              <span>Ежедневно с 9:00 до 18:00</span>
            </div>
          </Stack>
        </div>
        <Link href="tel:#" className={styles.phone__container} sx={{textDecoration: "none"}}>
          <Phone sx={{width: "42px", height: "42px", color: "#0099CC"}}/>
          <div className={styles.header__phone}>
            <p> 8 (831) 000-00-00</p>
            <span className={styles.phone__description}>Звонок бесплатный</span>
          </div>
        </Link>
      </Stack>
      <Box className={styles.navigation__container}>
        <Stack
          component="nav"
          justifyContent="center"
          direction="row"
          sx={{height: "100%", color: "white"}}
        >
          <NavLink to={"/"} className={styles.navigation__link}>
            <span className={styles.navigation__text}>Главная</span>
          </NavLink>
          <NavLink to={"/features"} className={styles.navigation__link}>
            <span className={styles.navigation__text}>Услуги</span>
          </NavLink>
          <NavLink to={"/profile"} className={styles.navigation__link}>
            <span className={styles.navigation__text}>Кабинет</span>
          </NavLink>
        </Stack>
      </Box>
    </Box>
  )
}

export default AppHeader;
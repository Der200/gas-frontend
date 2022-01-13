import React,  { useState } from 'react';
import { Stack, 
  Button, 
  Container, 
  TextField, 
  Box, 
  Checkbox, 
  FormControlLabel} from '@mui/material';
import { useDispatch } from 'react-redux';

import styles from './pages-styles.module.css'
import PersonalPaper from '../components/personal-paper/personal-paper';
import { sendMessage } from '../services/redux/order-slice/order-slice';
import Reaptcha from 'reaptcha';

const Statement = () => {
  const dispatch = useDispatch();

  const initialStatementData = {
    name: null,
    address: null,
    phone: null,
    message: null
  }

  const [changeStatus, setChangeStatus] = useState(false);
  const [statementData, setStatementData] = useState(initialStatementData);
  const [sendStatus, setSendStatus] = useState(false)
  const [verified, setVerified] = useState(false);


  const changeDataHandler = (event) => {
    setChangeStatus(!changeStatus);
  }

  const getNextMessage = (event) => {
    setSendStatus(false);
  }

  const feedbackDataHandler = (event) => {
    setStatementData({...statementData, [event.target.name]: event.target.value})
  }

  const onVerify = (recaptchaResponse) => {
    setVerified(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(sendMessage({'first_name': statementData.name, 'address': statementData.address, 'phone': statementData.tel, 'message': statementData.message}));
    setStatementData(initialStatementData);
    setSendStatus(true);
  }

  if (sendStatus === true) {
    return (
      <div>
        <p style={{fontSize: "40px", textAlign: "center"}}>Ваша заявка отправлена!</p>
        <Button size="large" type="button" sx={{width: "100%"}} onClick={getNextMessage}>Отправить новую заявку</Button>
      </div>
    )
  }

  return (
    <>
      <Container maxWidth="md" component="main" sx={{marginBottom: "50px", height: "100%"}}>
        <h1 style={{margin: "25px auto", textAlign: "center"}}>Заявка на услуги</h1>
        <Stack 
          component="form"
          spacing={2}
          onSubmit={submitHandler}
          sx={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}
        >
          <Box sx={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap"}}>
            <div className={styles.statement__block}>
              <label htmlFor="name">Имя</label>
              <TextField 
                id="name"
                label="Поле ввода имени" 
                variant="outlined"
                type="text"
                required
                name="name"
                value={statementData.name || ""}
                onChange={feedbackDataHandler}
                sx={{width: "100%", marginTop: "10px"}}
              />
            </div>
            <div className={styles.statement__block}>
              <label htmlFor="tel">Контактный телефон</label>
              <TextField 
                id="tel"
                label="Поле ввода номера" 
                variant="outlined"
                type="tel"
                required
                name="tel"
                value={statementData.tel || ""}
                onChange={feedbackDataHandler}
                sx={{width: "100%", marginTop: "10px"}}
              />
            </div>
          </Box>
          <div style={{width: "100%", 
            marginTop: 0,
            display: "flex", 
            justifyContent: "space-between", 
            flexWrap: "wrap"}}
          >
            <div style={{width: "100%", marginBottom: "15px"}}>
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
                value={statementData.address || ""}
                onChange={feedbackDataHandler}
                sx={{width: "100%", marginTop: "10px"}}
              />
            </div>
            <div style={{width: "100%", height: "100%", marginTop: "15px"}}>
              <label htmlFor="address">Содержание заявки</label>
              <TextField 
                id="address"
                label="Поле для выбранных услуг" 
                variant="outlined"
                type="text"
                required
                multiline
                rows={5}
                maxRows={5}
                name="message"
                value={statementData.message || ""}
                onChange={feedbackDataHandler}
                sx={{width: "100%", marginTop: "10px"}}
              />
            </div>
          </div>
          <PersonalPaper>
            <FormControlLabel 
              control={<Checkbox required />} 
              label="Согласие на обработку персональных данных"
              sx={{marginTop: "20px", width: "100%"}}
            />
          </PersonalPaper>
          {/* work with actual sitekey */}
          <Reaptcha sitekey="undefined" onVerify={onVerify}/>
          <Button size="large" type="submit" sx={{width: "100%"}} onClick={changeDataHandler}  disabled={!verified}>Отправить заявку</Button>
        </Stack>
      </Container>
    </>
  )
}

export default Statement;
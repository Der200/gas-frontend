import React from 'react';
import { Stack, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import { Phone, Home, MailOutline, Instagram } from '@mui/icons-material';

import styles from './app-footer.module.css';

const AppFooter = () => {

  // Links work with actual information

  return (
    <div style={{width: "100%", backgroundColor: "#4a4a4a"}}>
      <footer
        className={styles.footer__box}
      >
        <div className={styles.content__block}>
          <p style={{color: "white", fontSize: "28px", marginBottom: "10px"}}>ООО "НИЖНОВГАЗ"</p>
          <p style={{color: "white", textAlign: "justify", fontSize: "18px", marginTop: 0}}>
            Заключаем договоры на обслуживание ВДГО и ВКГО, 
            а также на его техническое диагностирование в 
            Нижнем Новгороде и Нижегородской области. 
            Все виды работ с газовым оборудованием: установка, замена, ремонт
          </p>
        </div>
        <Stack
          component="ul"
          justifyContent="space-between"
          direction="row"
          className={styles.content__block}

        >
          <ListItem  sx={{color: "white", width: "48%"}} className={styles.footer__phone}>
            <ListItemIcon>
              <Phone sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText
              primary={<Link underline="hover" href="tel:#" sx={{color: "white"}}>8 (831) 000-00-00</Link>}
            />
          </ListItem>
          <ListItem  sx={{color: "white", width: "49%"}} className={styles.footer__email}>
            <ListItemIcon>
              <MailOutline sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText
              primary={<Link underline="hover" href="mailto:info@mail.ru" sx={{color: "white"}}>mail@mail.ru</Link>}
            />
          </ListItem>
          <ListItem  sx={{color: "white"}}>
            <ListItemIcon>
              <Home sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText
              primary="г.Нижний Новгород, ул.Ванеева ..."
            />
          </ListItem>
          <ListItem  sx={{color: "white"}}>
            <ListItemIcon>
              <Instagram sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText
              primary={<Link underline="hover" href="#" target="_blank" sx={{color: "white"}}>Наш Instagram</Link>}
            />
          </ListItem>
        </Stack>
      </footer>
    </div> 
  )
}

export default AppFooter;
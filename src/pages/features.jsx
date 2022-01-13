import { Stack, Box, Paper } from '@mui/material';
import styles from './pages-styles.module.css';
import AppFooter from '../components/app-footer/app-footer';
import { NavLink } from 'react-router-dom';

import backgroundImage from '../images/bg7.jpg'

const Features = () => {
  const boxView = {
    maxWidth: "1200px", 
    margin: "0 auto",
    marginBottom: "50px"
  }

  return (
    <>
      <main width="100%">
        <Box sx={boxView}>
          <h2 align="center" id="features">УСЛУГИ</h2>
          <section style={{marginBottom: "15px"}}  className={styles.feature__description_block}>
            <div>
              {/* !Link work with document (href) */}
              <p className={styles.feature__description}>
                ООО «НИЖНОВГАЗ» оказывает полный спектр услуг 
                по работе с газовым оборудованием. Полный перечень 
                и стоимость наших услуг Вы можете изучить
                скачав <a className={styles.feature__link} rel = 'noreferrer' target="_blank" href="#">прайс-лист</a>. 
              </p>
              <p className={styles.feature__description}>
                Оставить заявку вы можете по телефону 8(831)000-00-00
                или по почте mail@mail.ru
              </p>
              <p className={styles.feature__description}>
                Помните, только специализированная организация 
                имеет право обслуживать Ваше газовое оборудование!
              </p>
            </div>
            <img className={styles.feature__background_image} src={backgroundImage} alt="Газовая конфорка"/>
          </section>
          <NavLink 
              className={styles.feedback__btn } 
              to="/statement"
            >
              Оставить заявку
            </NavLink>
          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{flexWrap: "wrap"}}
          >
            <div>
              <h3 className={styles.feature__header}>
                Замена и ремонт газового оборудования
              </h3>
              <p className={styles.feature__description}>
                Мы специализированная 
                организация, которая имеет всю разрешающую документацию 
                на осуществление данного вида деятельности. Наши 
                специалисты ежегодно проходят переаттестацию на проф 
                пригодность и устанавливают газовое оборудование согласно 
                гостам и снипам. Все наше оборудование имеет сертификаты соответствия.
              </p>
              <p className={styles.feature__description}>
                Вызов аварийной службы (при запахе газа) осуществляется по номерам 04 и 104.
              </p>
              <p className={styles.feature__description}>
                Выезд мастера для ремонта газового котла/колонки/плиты – бесплатно 
                (при наличии договора на техническое обслуживание газового котла).
              </p>
              <p className={styles.feature__description}>
              Оплата услуг по ремонту и замене газового оборудования производится 
              согласно прейскуранту (не зависимо от наличия договоров).
              </p>
            </div>
            <Paper>

            </Paper>
          </Stack>
          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{flexWrap: "wrap"}}
          >
            <div>
              <h3 className={styles.feature__header}>
                Обслуживание и диагностика
              </h3>
              <p className={styles.feature__description}>
                Согласно постановлению правительства РФ №410 
                собственники жилого помещения обязаны содержать 
                в исправном состоянии свое внутриквартирное газовое 
                оборудование. Для этого они должны заключить договор 
                со специализированной организацией, как ООО «НИЖНОВГАЗ» 
                на обслуживание ВКГО (внутриквартирного газового оборудования). 
                За неисполнение данного постановления предусмотрены штрафы. 
                Каждый человек должен понимать важность этого договора, ведь 
                собственник несёт ответственность не только за себя и свою квартиру, 
                но и за весь дом в целом. Очень печально, что люди иногда относятся 
                к этому легкомысленно и сами стараются следить за своим оборудованием, 
                что является грубым нарушением.
              </p>
            </div>
          </Stack>

        </Box>
        <AppFooter />
      </main>
    </>
  )
}

export default Features;
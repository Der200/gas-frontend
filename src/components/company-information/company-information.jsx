import { Stack, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './company-information.module.css';
import { v4 as uuid } from 'uuid';

import bg1 from '../../images/bg1.jpg';
import bg2 from '../../images/bg2.jpg';

import ContractIcon from './../../icons/contract-icon'
import RepairIcon from './../../icons/repair-icon'
import DiagnosisIcon from './../../icons/diagnosis-icon'
import GoodIcon from './../../icons/good-icon'
import PeoplesIcon from './../../icons/peoples-icon'
import SpeedIcon from './../../icons/speed-icon'

const CompanyInformation = (props) => {
  const { view, content, title, name, position } = props;
  const boxView = {
    maxWidth: "1200px", 
    margin: "0 auto",
    paddingBottom: "30px"
  }

  const containerView = {
    height: "224px", 
    width: "100%", 
    color: "white", 
    position: "relative",
    backgroundColor:  "rgba(0,115,188,0.9)"
  }

  return (
    <Box 
      sx={ view === "boxView" ? boxView : containerView } 
      component="section"
      className={view === "containerView" ? styles.feedback : ""}
    >
      {title && <h2 align="center" className={styles.section__header}>{title}</h2>}
      <Stack
        direction="row"
        sx={view === "boxView" ? {flexWrap: "wrap", margin: "0 20px"} : ""}
        className={name === "feedback" ? styles.feedback__content : styles.box__content}
      > 
        {view === "containerView" && <img className={styles.feedback_bg} src={position === "1" ? bg1 : bg2}
          alt="Фоновое изображение"
        />}
        {content.map((item, index) => (
          <div key={uuid()} className={name === "features" ? styles.feature : name === "privileges" ? styles.privilege : ""}>
            
            {index === 0 ? name === "features" ? <ContractIcon /> : null: null}
            {index === 0 ? name === "privileges" ? <GoodIcon /> : null: null}
            {index === 1 ? name === "features" ? <RepairIcon /> : null: null}
            {index === 1 ? name === "privileges" ? <PeoplesIcon /> : null: null}
            {index === 2 ? name === "features" ? <DiagnosisIcon /> : null: null}
            {index === 2 ? name === "privileges" ? <SpeedIcon /> : null: null}
            <h3 className={ view === "boxView" ? styles.header__box : styles.header__container }>
              {item[0]}
            </h3>
            <p className={ view === "boxView" ? styles.text__box : styles.text__container }>
              {item[1]}
            </p>
          </div>
        ))}
        {view === "containerView" && 
          <NavLink 
            className={styles.feedback__btn } 
            to={name === "feedback" ? "/statement" : "/register"}
          >
            {position === "1" ? "ОБРАТИТЬСЯ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}
          </NavLink>}
      </Stack>
    </Box>
  )
}

export default CompanyInformation;
import { 
  Paper,  
} from '@mui/material';

import styles from './personal-paper.module.css';

// !Links work with documents (href)

const PersonalPaper = ({children}) => {
  return (
    <Paper className={styles.container} sx={{backgroundColor: "rgba(147, 184, 253, 0.705)"}}>
      <h3 className={styles.header}>О работе с персональными данными</h3>
      <p className={styles.text}>
        После вашего согласия мы начнем обрабатывать 
        оставленные в форме персональные данные. Подробнее 
        об этом вы можете узнать из документов 
        о <a target="_blank" rel="noreferrer" href="#">политике обработки</a>
        , <a target="_blank" rel="noreferrer" href="#">рекламе</a> 
        , <a target="_blank" rel="noreferrer" href="#">персональных данных</a>.
      </p>
      {children}
    </Paper>
  )
}

export default PersonalPaper;
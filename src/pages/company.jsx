import styles from './pages-styles.module.css';
import AppFooter from '../components/app-footer/app-footer';

// background images
import bg5 from '../images/bg5.png';

import DocumentsCarousel from '../components/documents-carousel/documents-carousel';
import CompanyInformation from '../components/company-information/company-information';


const Company = () => {

  const features = [["Обслуживание газового оборудования", "Заключаем договоры на ВДГО и ВКГО не только с управляющими компаниями, но и с частными лицами"], 
    ["Замена и установка газового оборудования", "Газовые плиты, колонки, котлы, шланги, краны и счетчики газа - справимся со всем"],
    ["Диагностика газового оборудования", "Вычислим текущее состояние, найдем неисправности и определим возможность дальнейшего использования"]
  ];

  const privilege = [["Надежная компания", "Вся информация о нас находится в открытом доступе"], 
    ["Опытные сотрудники", "Все мастера имеют допуск к газоопасным работам"],
    ["Удобство и скорость", "Выполняем все работы быстро и в удобное для вас время"]
  ];

  const feedback = [["Ценим ваше время", "Оставьте заявку на подключение услуг прямо сейчас"]];

  const speed = [["Будьте в курсе", "Создайте личный кабинет для отслеживания договора"]]

  return (
    <>
      <main width="100%">
        <section
          style={{
            width: "100%",
            height: "350px",
            background: `url(${bg5}) 100% 100% no-repeat`, 
            backgroundSize: "cover",
          }}
        >
          <p className={styles.slogan__header}>НИЖЕГОРОДСКАЯ ГАЗОВАЯ КОМПАНИЯ</p>
          <p className={styles.slogan__description}>Ваша безопасность для нас превыше всего</p>
        </section>
        <CompanyInformation view="boxView" content={features} title="Услуги" name="features"/>
        <CompanyInformation view="containerView" content={feedback} name="feedback" position="1" />
        <CompanyInformation view="boxView" content={privilege} title="Наши преимущества"  name="privileges"/>
        <CompanyInformation view="containerView" content={speed} name="feedback" position="2" />

        <DocumentsCarousel />
      </main>
      <AppFooter />
    </>
  )
}

export default Company;
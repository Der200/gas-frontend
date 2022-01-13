import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, {
  Navigation
} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

// Images for documents carousel
import pp410Image from '../../images/pp410.jpg';

const DocumentsCarousel = (props) => {
  SwiperCore.use([Navigation]);
  
  return (
    <section style={{maxWidth: "1200px", margin: "0 auto", marginBottom: "70px"}}>
      <h2 align="center" id="documents" style={{ fontSize: '40px', fontWeight: 400 }}>Документы</h2>
      <Swiper
        slidesPerView={4}
        pagination={{
          type: 'fraction',
        }}
        navigation
      >
        {/* Documents open with actual links (href) */}
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
        <SwiperSlide><a rel = 'noreferrer' href="#" target="_blank"><img src={pp410Image} alt="Постановление Правительства РФ 410"/></a></SwiperSlide>
      </Swiper>
    </section>
  )
}

export default DocumentsCarousel;
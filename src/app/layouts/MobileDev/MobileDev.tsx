import React, { useEffect, useState } from 'react'
import mobile from "app/assets/images/mobile.png"
import "./MobileDev.scss";
import { Box } from '@mui/material';

const MobileDev = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".md-container");
    if (target) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      });

      observer.observe(target);

      return () => {
        observer.disconnect();
      };
    }
  }, []);
  return (
    <Box className="md w-screen">
    <Box className="md-container">
      <Box className={`md-image fade-in-vertical ${isVisible ? " visible" : "" }`}>
          <img src={mobile} alt="Mobile" />
      </Box>
      <Box className={`md-text fade-in-vertical ${isVisible ? " visible" : "" }`}>
        <h3 className="title">Desarrollo de aplicaciones móviles</h3>
        <p>Creamos <strong>aplicaciones móviles fluidas y personalizadas</strong> para Android y iOS que reflejan la esencia de tu marca y sobresalen en el mercado.</p><br/><br/>
        <p>Desde <strong>tiendas virtuales hasta plataformas de servicio inteligente al cliente</strong>, nuestras aplicaciones están diseñadas para impulsar tu negocio.</p>
      </Box>
    </Box>
  </Box>
  )
}

export { MobileDev  };
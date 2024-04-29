import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import laptop from "app/assets/images/bi.png";
import "./WebDev.scss";

const WebDev = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".wd-container");
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
    <Box className="wd w-screen">
      <Box className="wd-container">
        <Box className={`wd-image fade-in-vertical ${isVisible ? " visible" : "" }`}>
            <img src={laptop} alt="Laptop" />
        </Box>
        <Box className={`wd-text fade-in-vertical ${isVisible ? " visible" : "" }`}>
          <h3 className="title">Automatización y Desarrollo Web</h3>
          <p>Impulsamos tu empresa con soluciones ágiles. Desde automatización de procesos hasta desarrollo web moderno, <strong>transformamos tu visión en realidad</strong>.</p> <br/><br/>
          <p>Toma decisiones informadas con nuestros <strong>dashboards personalizados</strong> y herramientas analíticas.</p>
        </Box>
      </Box>
    </Box>
  )
}

export default WebDev
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
        <Box
          className={`wd-image fade-in-vertical ${isVisible ? " visible" : ""}`}
        >
          <img src={laptop} alt="Laptop" />
        </Box>
        <Box
          className={`wd-text fade-in-vertical ${isVisible ? " visible" : ""}`}
        >
          <h3 className="title">Automatización y Desarrollo Web</h3>
          <p>
            Automatizamos tus procesos operativos
            <strong> reduciendo hasta un 100% su ejecución manual</strong>.
            <br />
            <br /> Digitalizamos tu imagen comercial con
            <strong> soluciones web modernas</strong>. <br /> <br /> Nuestros
            desarrollos incluyen{" "}
            <strong>
              {" "}
              dashboards personalizados y herramientas analíticas
            </strong>{" "}
            para que tomes decisiones mejor informadas.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default WebDev;

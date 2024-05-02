import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Carousel } from "app/components/Carousel/Carousel";
import p1m from "app/assets/images/p1m2.png";
import p2m from "app/assets/images/p2m2.png";
import p3m from "app/assets/images/p3m2.png";
import "./Portfolio.scss";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".portfolio-container");
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
    <Box className="portfolio">
      <Box className="portfolio-container">
        <Box className={`portfolio-header fade-in-vertical ${isVisible ? " visible" : "" }`}>
          <h3 className="title">Proyectos recientes</h3>
        </Box>
        <Box className={`portfolio-projects fade-in-vertical ${isVisible ? " visible" : "" }`}>
          <Carousel p1m={p1m} p2m={p2m} p3m={p3m}/>
        </Box>
      </Box>
    </Box>
  );
};

export { Portfolio };

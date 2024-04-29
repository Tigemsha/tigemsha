import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import logo from "app/assets/images/logo.png";
import heroimg from "app/assets/images/tablet.png";
import "./Hero.scss";
import { KeyboardArrowDown } from "@mui/icons-material";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".hero");
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

  const scrollToNextSection = () => {
    const nextSection = document.querySelector(".wd");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className="hero w-screen">
      <Box className="hero-container">
        <Box className="hero-c2a">
          <Box className={`hero-c2a-content fade-in-vertical ${isVisible ? " visible" : "" }`}>
            <Box className="hero-logo">
              <img src={logo} alt="Tigemsha logo" />
              <h1 className="uppercase text-3xl ml-3">Tigemsha</h1>
            </Box>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Automatización y Desarrollo de <span>Software a Medida</span>
            </h2>
          </Box>
          <Box className={`hero-image fade-in-vertical ${isVisible ? " visible" : "" }`}>
            <img src={heroimg} alt="tablet" />
          </Box>
        </Box>
        <Box className="hero-c2a-btns">
          <Button onClick={scrollToNextSection}>
            <KeyboardArrowDown />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Hero };

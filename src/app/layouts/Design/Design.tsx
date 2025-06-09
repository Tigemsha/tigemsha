import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import design from "app/assets/images/dsgn.png";
import "./Design.scss";
import {
  Brush,
  DomainVerification,
  Draw,
} from "@mui/icons-material";

const Design = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".design-container");
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
    <Box className="design w-screen">
      <Box className="design-container ">
        <Box
          className={`design-image fade-in-vertical ${isVisible ? " visible" : ""}`}
        >
          <img src={design} alt="Design" />
        </Box>
        <Box
          className={`design-text fade-in-vertical ${isVisible ? " visible" : ""}`}
        >
          <h3 className="title">Diseño e Identidad Visual</h3>
          <p>
            <Draw sx={{ fontSize: "2.5rem", marginRight: ".4rem" }} />{" "}
            Creamos
            <strong> identidades visuales sólidas y memorables</strong> que
            comunican con claridad quién eres.
            <br />
            <br /> <Brush
              sx={{ fontSize: "2.5rem", marginRight: ".4rem" }}
            />{" "}
            Diseñamos logotipos, paletas de colores, tipografías y piezas
            gráficas
            <strong> alineadas con la esencia de tu marca</strong>. <br />{" "}
            <br />{" "}
            <DomainVerification
              sx={{ fontSize: "2.5rem", marginRight: ".4rem" }}
            />{" "}
            Transformamos tu imagen en una herramienta estratégica que{" "}
            <strong> conecta y genera confianza.</strong>{" "}
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Design;

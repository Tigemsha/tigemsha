import { carouselProps } from "app/interfaces";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import "./Carousel.scss";

const Carousel: React.FC<carouselProps> = ({ p1m, p2m, p3m }) => {
  const items = [
    <ProjectCard urlImg={p1m} title="Mares de papel" text="Desarrollamos una plataforma para el Ayuntamiento de Mazarrón en España, que permite la gestión de eventos mediante tickets QR, optimizando el control de la asistencia." projectUrl="http://maresdepapel.com" />,
    <ProjectCard urlImg={p2m} title="Fixing Broken Houses" text="Transformamos la imagen comercial de una empresa constructora y de remodelación con sede en Texas." projectUrl="https://fixingbrokenhouses.com" />,
    <ProjectCard urlImg={p3m} title="Grupo Gran Alianza Mexicana" text="Plataforma diseñada y desarrollada para una asociación política mexicana." projectUrl="https://ggam-76598.web.app/" />,
  ];
  return <AliceCarousel items={items} autoPlay autoPlayInterval={1500} infinite />;
};

export { Carousel };

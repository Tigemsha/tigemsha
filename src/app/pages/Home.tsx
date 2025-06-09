import { Hero } from "app/layouts/Hero/Hero";
import WebDev from "app/layouts/WebDev/WebDev";
import { MobileDev } from "app/layouts/MobileDev/MobileDev";
import { BusinessManagement } from "app/layouts/BusinessManagement/BusinessManagement";
import { Portfolio } from "app/layouts/Portfolio/Portfolio";
import { ClientCarousel } from "app/layouts/ClientCarousel/ClientCarousel";
import Design from "app/layouts/Design/Design";

const Home = () => {
  return(
    <>
      <Hero />
      <WebDev />
      <MobileDev />
      <Design />
      <BusinessManagement />
      <ClientCarousel />
      <Portfolio />
    </>
  )
};

export { Home };

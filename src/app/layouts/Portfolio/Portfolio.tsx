import React, { useEffect, useState } from "react";
import p1m from "app/assets/images/p1m.png";
import p2m from "app/assets/images/p2m.png";
import p3m from "app/assets/images/p3m.png";
import p4m from "app/assets/images/p4m.png";
import { ProjectCard } from "app/components/ProjectCardV2/ProjectCardV2";

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

  const projects = [
    {
      title: "Fixing Broken Houses",
      desc: "Professional website for a company specializing in home remodeling and construction in Texas.",
      img: p2m,
      urls: ["https://fixingbrokenhouses.com"],
    },
    {
      title: "Soluciones Integrales Silva",
      desc: "Corporate site for a company providing professional industrial and technical solutions.",
      img: p4m,
      urls: ["https://ggam-76598.web.app/"],
    },
    {
      title: "Grupo Gran Alianza Mexicana",
      desc: "Institutional website created for an active political association in Mexico.",
      img: p3m,
      urls: ["https://ggam-76598.web.app/"],
    },
    {
      title: "Mares de papel",
      desc: "Official portal developed for the Department of Culture of the Mazarrón City Council, Spain.",
      img: p1m,
      urls: ["https://lavozdemazarron.com/index.php/noticias/4730-codigos-qr-para-las-entradas-de-mares-de-papel"],
    },
  ];

  return (
    <div className="py-14 px-10">
      <div className="portfolio-container">
        <div
          className={`portfolio-projects fade-in-vertical
                grid grid-cols-1
                lg:grid-cols-2
             ${isVisible ? " visible" : ""}`}
        >
          {projects.map((proj) => (
            <div key={proj.title} className="w-full" style={{ minWidth: 0 }}>
              <ProjectCard
                title={proj.title}
                desc={proj.desc}
                img={proj.img}
                urls={proj.urls}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Portfolio };

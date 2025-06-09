import { ArrowForward } from "@mui/icons-material";
import React from "react";

export interface ProjectCardProps {
  title: string;
  desc: string;
  img: string;
  urls: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  desc,
  img,
  urls,
}) => {
  return (
    <div
      className="relative group bg-cover bg-center transition-all duration-300 overflow-hidden min-h-[350px]"
      style={{ backgroundImage: `url('${img}')`, }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10 hover:bg-opacity-70 w-full h-full">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out">
          <h2 className="text-white text-3xl font-extrabold">{title}</h2>
          <p className="text-white text-2xl font-thin">{desc}</p>
          <div className="flex gap-4 mt-12">
            {urls?.map((url, idx) => (
              <a href={url} key={idx} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-white text-2xl underline flex gap-3 items-center justify-center">
                 Visit  now<ArrowForward className="text-white !text-3xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

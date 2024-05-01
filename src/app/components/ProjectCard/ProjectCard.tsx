import * as React from 'react';
import { projectCardProps } from 'app/interfaces';
import { Box, Button } from '@mui/material';
import "./ProjectCard.scss";
import { Link, LiveTv, Newspaper } from '@mui/icons-material';

const ProjectCard : React.FC<projectCardProps> = ({ urlImg, title, text, projectUrl }) => {
  return (
    <Box className="pc">
        <Box className="pc-container">
            <figure className="pc-img">
                <img src={urlImg} alt={title}/>
            </figure>
            <Box className= "pc-text">
                <p className='small'>{text}</p>
            </Box>
            <Box className="pc-actions">
            {title === "Mares de papel" ? (
                <>
                {/* <Button><a href={projectUrl}><Link /></a></Button> */}
                <Button ><a href="https://www.mazarronhoy.com/noticias/2021/07/10/mares-papel-incorpora-codigo-qr.asp"><Newspaper /></a></Button>
                <Button ><a href="https://lavozdemazarron.com/index.php/noticias/4730-codigos-qr-para-las-entradas-de-mares-de-papel"><LiveTv /></a></Button>
                </>
            ) : 
            <Button><a href={projectUrl}><Link /></a></Button>
            }
            </Box>
        </Box>
    </Box>
  );
}

export { ProjectCard }
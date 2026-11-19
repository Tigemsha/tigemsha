#!/usr/bin/env node
/**
 * Vitrina de prueba: escribe .prueba/landings.json con las landings reales más
 * 60 ficticias (30 giros × 2 modelos), para probar que /landings y el buscador
 * aguantan cientos de landings. No se sube al repo ni se publica (.gitignore).
 *
 *   npm run build:prueba     genera los datos y construye en .prueba/dist
 *   npm run preview:prueba   sirve .prueba/dist en http://localhost:4330
 *
 * Las ficticias reusan las capturas y los temas de la primera landing real.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const salida = path.join(raiz, '.prueba/landings.json');
const reales = JSON.parse(await readFile(path.join(raiz, 'src/data/landings.json'), 'utf8'));
const base = reales[0];

/** [slug, giro, giro en inglés, familia, sinónimos es, sinónimos en] */
const GIROS = [
  ['dentistas', 'Clínicas dentales', 'Dental clinics', 'salud', ['dentista', 'dental', 'ortodoncia'], ['dentist', 'dental']],
  ['estetica', 'Medicina estética', 'Medical aesthetics', 'belleza', ['botox', 'facial', 'laser'], ['aesthetics', 'botox']],
  ['veterinarias', 'Veterinarias', 'Veterinary clinics', 'salud', ['veterinario', 'mascotas', 'perros'], ['vet', 'pets']],
  ['colegios', 'Colegios privados', 'Private schools', 'educacion', ['escuela', 'primaria', 'kinder'], ['school']],
  ['inmobiliarias', 'Inmobiliarias', 'Real estate agencies', 'hogar', ['casas', 'renta', 'bienes raices'], ['real estate', 'realtor']],
  ['pilates', 'Estudios de pilates', 'Pilates studios', 'fitness', ['pilates', 'yoga', 'barre'], ['pilates', 'yoga']],
  ['salones', 'Salones de eventos', 'Event halls', 'eventos', ['bodas', 'xv anos', 'fiestas'], ['venue', 'weddings']],
  ['fisioterapia', 'Fisioterapia', 'Physical therapy', 'salud', ['fisio', 'rehabilitacion'], ['physio', 'rehab']],
  ['nutriologos', 'Nutriólogos', 'Nutritionists', 'salud', ['nutricion', 'dieta'], ['nutritionist', 'diet']],
  ['cirugia', 'Cirugía plástica', 'Plastic surgery', 'salud', ['cirujano', 'lipo'], ['plastic surgeon']],
  ['solares', 'Paneles solares', 'Solar panels', 'hogar', ['solar', 'energia'], ['solar']],
  ['talleres', 'Talleres mecánicos', 'Auto repair shops', 'servicios', ['mecanico', 'autos', 'taller'], ['mechanic', 'garage']],
  ['medicos', 'Médicos especialistas', 'Medical specialists', 'salud', ['doctor', 'consultorio'], ['doctor', 'physician']],
  ['ingles', 'Escuelas de inglés', 'English schools', 'educacion', ['idiomas', 'clases de ingles'], ['language school']],
  ['guarderias', 'Guarderías', 'Daycares', 'educacion', ['estancia infantil', 'maternal'], ['daycare', 'childcare']],
  ['hoteles', 'Hoteles boutique', 'Boutique hotels', 'hospedaje', ['hotel', 'hospedaje'], ['hotel', 'inn']],
  ['contadores', 'Despachos contables', 'Accounting firms', 'servicios', ['contador', 'impuestos'], ['accountant', 'tax']],
  ['abogados', 'Despachos de abogados', 'Law firms', 'servicios', ['abogado', 'legal'], ['lawyer', 'attorney']],
  ['psicologos', 'Psicólogos', 'Psychologists', 'salud', ['terapia', 'salud mental'], ['therapist', 'counseling']],
  ['artes-marciales', 'Artes marciales', 'Martial arts', 'fitness', ['karate', 'box', 'mma'], ['martial arts', 'boxing']],
  ['spas', 'Spas', 'Spas', 'belleza', ['masajes', 'relajacion'], ['spa', 'massage']],
  ['minisplits', 'Climatización', 'Air conditioning', 'hogar', ['minisplit', 'aire acondicionado'], ['hvac', 'mini split']],
  ['cocinas', 'Cocinas integrales', 'Kitchen remodeling', 'hogar', ['remodelacion', 'cocinas'], ['remodeling', 'kitchens']],
  ['barberias', 'Barberías', 'Barbershops', 'belleza', ['barbero', 'corte de pelo'], ['barber', 'haircut']],
  ['admision', 'Cursos de admisión', 'Exam prep', 'educacion', ['examen', 'unam', 'ipn'], ['exam prep', 'tutoring']],
  ['natacion', 'Escuelas de natación', 'Swimming schools', 'fitness', ['alberca', 'nadar'], ['swimming', 'pool']],
  ['plagas', 'Control de plagas', 'Pest control', 'hogar', ['fumigacion', 'cucarachas'], ['exterminator']],
  ['unas', 'Estudios de uñas', 'Nail studios', 'belleza', ['unas', 'pestanas', 'manicure'], ['nails', 'lashes']],
  ['opticas', 'Ópticas', 'Optical stores', 'salud', ['lentes', 'anteojos'], ['glasses', 'optician']],
  ['banquetes', 'Banquetes', 'Catering', 'eventos', ['comida', 'eventos', 'meseros'], ['catering', 'food']],
];
const MODELOS = [
  ['Mostrador', 'The counter'],
  ['Escaparate', 'The shop window'],
];

const dia = (n) => {
  const fecha = new Date(Date.UTC(2026, 10, 17));
  fecha.setUTCDate(fecha.getUTCDate() - n);
  return fecha.toISOString().slice(0, 10);
};

const ficticias = [];
let n = 0;
for (const [m, [modelo, modeloEn]] of MODELOS.entries()) {
  for (const [slug, giro, giroEn, familia, claves, clavesEn] of GIROS) {
    n += 1;
    ficticias.push({
      ...base,
      codigo: `TGM-${String(100 + n).padStart(3, '0')}`,
      slug: `${slug}-${m + 1}`,
      giro,
      nombre: modelo,
      familia,
      fecha: dia(n),
      precio_desde: 2500 + (n % 5) * 500,
      resumen: `Landing de prueba para ${giro.toLowerCase()}.`,
      para: `${giro} (prueba).`,
      palabras_clave: claves,
      en: {
        ...base.en,
        giro: giroEn,
        nombre: modeloEn,
        resumen: `Test landing page for ${giroEn.toLowerCase()}.`,
        para: `${giroEn} (test).`,
        palabras_clave: clavesEn,
      },
    });
  }
}

await mkdir(path.dirname(salida), { recursive: true });
await writeFile(salida, `${JSON.stringify([...reales, ...ficticias], null, 2)}\n`);
console.log(`✓ .prueba/landings.json: ${reales.length} reales + ${ficticias.length} ficticias`);

#!/usr/bin/env node
/**
 * Genera src/data/proximas.json: los siguientes 5 giros de la fila de
 * ../investigacion/segmentos.json que todavía no están en src/data/landings.json.
 * La home los muestra en "Próximas" y el buscador los usa en el estado vacío
 * ("Clínicas dentales ya está en la fila").
 *
 * La investigación vive fuera de este repo (que es público), así que este
 * script corre en la Mac de Tigemsha y su resultado se sube al repo:
 *
 *   npm run sync-proximas
 *
 * Los nombres en inglés, la familia y los sinónimos de cada giro van a mano en
 * GIROS (abajo). Si segmentos.json trae un giro que no está en GIROS, el script
 * falla para que nadie publique un giro sin traducir.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SEGMENTOS = path.resolve(process.env.SEGMENTOS ?? path.join(raiz, '../investigacion/segmentos.json'));
const LANDINGS = path.join(raiz, 'src/data/landings.json');
const SALIDA = path.join(raiz, 'src/data/proximas.json');
const CUANTAS = 5;

/** slug → nombre en inglés, familia y sinónimos (es / en) para el buscador. */
const GIROS = {
  gimnasios: { en: 'Gyms', familia: 'fitness', es_k: ['gym', 'crossfit', 'box'], en_k: ['gym', 'fitness'] },
  'clinicas-dentales': { en: 'Dental clinics', familia: 'salud', es_k: ['dentista', 'dental', 'ortodoncia', 'muelas'], en_k: ['dentist', 'dental', 'orthodontics'] },
  'medicina-estetica': { en: 'Medical aesthetics clinics', familia: 'belleza', es_k: ['estetica', 'botox', 'facial', 'laser'], en_k: ['aesthetics', 'botox', 'med spa'] },
  veterinarias: { en: 'Veterinary clinics', familia: 'salud', es_k: ['veterinario', 'mascotas', 'perros', 'gatos'], en_k: ['vet', 'pets', 'animal hospital'] },
  colegios: { en: 'Private schools', familia: 'educacion', es_k: ['escuela', 'primaria', 'secundaria', 'kinder'], en_k: ['school', 'academy'] },
  inmobiliarias: { en: 'Real estate agencies', familia: 'hogar', es_k: ['inmobiliaria', 'bienes raices', 'casas', 'departamentos', 'renta'], en_k: ['real estate', 'realtor', 'homes'] },
  'pilates-yoga': { en: 'Pilates, yoga and barre studios', familia: 'fitness', es_k: ['pilates', 'yoga', 'barre', 'reformer'], en_k: ['pilates', 'yoga', 'barre'] },
  'salones-eventos': { en: 'Event halls and gardens', familia: 'eventos', es_k: ['salon', 'jardin', 'bodas', 'xv anos', 'fiestas'], en_k: ['venue', 'weddings', 'party hall'] },
  fisioterapia: { en: 'Physical therapy and rehab', familia: 'salud', es_k: ['fisio', 'rehabilitacion', 'terapia fisica'], en_k: ['physio', 'physical therapy', 'rehab'] },
  nutriologos: { en: 'Nutritionists and weight control', familia: 'salud', es_k: ['nutriologo', 'nutricion', 'dieta', 'bajar de peso'], en_k: ['nutritionist', 'diet', 'weight loss'] },
  'cirugia-plastica': { en: 'Plastic surgery', familia: 'salud', es_k: ['cirujano plastico', 'cirugia estetica', 'lipo'], en_k: ['plastic surgeon', 'cosmetic surgery'] },
  'paneles-solares': { en: 'Solar panel installers', familia: 'hogar', es_k: ['solar', 'paneles', 'energia solar'], en_k: ['solar', 'solar panels'] },
  'talleres-mecanicos': { en: 'Auto repair shops', familia: 'servicios', es_k: ['taller', 'mecanico', 'autos', 'servicio automotriz'], en_k: ['mechanic', 'auto repair', 'garage'] },
  'medicos-especialistas': { en: 'Medical specialists', familia: 'salud', es_k: ['medico', 'doctor', 'consultorio', 'especialista'], en_k: ['doctor', 'physician', 'specialist'] },
  'escuelas-ingles': { en: 'English schools', familia: 'educacion', es_k: ['ingles', 'idiomas', 'clases de ingles'], en_k: ['english school', 'language school'] },
  guarderias: { en: 'Daycares', familia: 'educacion', es_k: ['guarderia', 'estancia infantil', 'maternal'], en_k: ['daycare', 'childcare', 'nursery'] },
  'hoteles-boutique': { en: 'Boutique hotels', familia: 'hospedaje', es_k: ['hotel', 'hospedaje', 'posada'], en_k: ['hotel', 'inn', 'lodging'] },
  contadores: { en: 'Accounting firms', familia: 'servicios', es_k: ['contador', 'contabilidad', 'despacho contable', 'impuestos'], en_k: ['accountant', 'accounting', 'tax'] },
  abogados: { en: 'Law firms', familia: 'servicios', es_k: ['abogado', 'despacho', 'legal'], en_k: ['lawyer', 'attorney', 'legal'] },
  psicologos: { en: 'Psychologists and therapy centers', familia: 'salud', es_k: ['psicologo', 'terapia', 'salud mental'], en_k: ['psychologist', 'therapist', 'counseling'] },
  'artes-marciales': { en: 'Martial arts and boxing academies', familia: 'fitness', es_k: ['karate', 'box', 'taekwondo', 'jiu jitsu', 'mma'], en_k: ['martial arts', 'boxing', 'karate'] },
  spas: { en: 'Spas and massage centers', familia: 'belleza', es_k: ['spa', 'masajes', 'relajacion'], en_k: ['spa', 'massage'] },
  climatizacion: { en: 'Air conditioning installers', familia: 'hogar', es_k: ['minisplit', 'aire acondicionado', 'clima'], en_k: ['air conditioning', 'hvac', 'mini split'] },
  remodelacion: { en: 'Remodeling and kitchens', familia: 'hogar', es_k: ['remodelacion', 'cocinas integrales', 'construccion'], en_k: ['remodeling', 'kitchens', 'contractor'] },
  barberias: { en: 'Barbershops', familia: 'belleza', es_k: ['barberia', 'barbero', 'corte de pelo'], en_k: ['barbershop', 'barber', 'haircut'] },
  'cursos-admision': { en: 'Admission exam prep', familia: 'educacion', es_k: ['examen de admision', 'curso', 'unam', 'ipn', 'prepa'], en_k: ['exam prep', 'tutoring'] },
  'escuelas-natacion': { en: 'Swimming schools', familia: 'fitness', es_k: ['natacion', 'alberca', 'clases de natacion'], en_k: ['swimming', 'swim school', 'pool'] },
  'control-plagas': { en: 'Pest control', familia: 'hogar', es_k: ['fumigacion', 'plagas', 'cucarachas', 'termitas'], en_k: ['pest control', 'exterminator', 'fumigation'] },
  'cejas-pestanas-unas': { en: 'Brow, lash and nail studios', familia: 'belleza', es_k: ['unas', 'pestanas', 'cejas', 'manicure'], en_k: ['nails', 'lashes', 'brows', 'manicure'] },
  opticas: { en: 'Optical stores', familia: 'salud', es_k: ['optica', 'lentes', 'examen de la vista', 'anteojos'], en_k: ['optician', 'glasses', 'eye exam'] },
};

const leer = async (ruta) => JSON.parse(await readFile(ruta, 'utf8'));

const segmentos = await leer(SEGMENTOS);
const landings = await leer(LANDINGS);
const publicados = new Set(landings.map((l) => l.slug));

const sinTraducir = segmentos.filter((s) => !GIROS[s.slug]).map((s) => s.slug);
if (sinTraducir.length > 0) {
  console.error(`✗ Agrega a GIROS (scripts/sync-proximas.mjs): ${sinTraducir.join(', ')}`);
  process.exit(1);
}

const proximas = segmentos
  .filter((s) => !publicados.has(s.slug))
  .sort((a, b) => a.orden - b.orden)
  .slice(0, CUANTAS)
  .map((s) => {
    const g = GIROS[s.slug];
    return {
      orden: s.orden,
      slug: s.slug,
      nombre: s.nombre,
      nombre_en: g.en,
      familia: g.familia,
      palabras_clave: g.es_k,
      palabras_clave_en: g.en_k,
    };
  });

await writeFile(SALIDA, `${JSON.stringify(proximas, null, 2)}\n`);
console.log(`✓ src/data/proximas.json: ${proximas.map((p) => p.nombre).join(', ')}`);

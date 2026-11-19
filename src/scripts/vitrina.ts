/**
 * Vitrina con buscador (Vitrina.astro), en la home (carrusel) y en /landings
 * (rejilla con familias, orden y "Mostrar más").
 *
 * - Busca sin acentos ni mayúsculas y con sinónimos (src/lib/busqueda.ts).
 * - Si el HTML ya trae todas las landings, filtra esas y no baja nada. Si hay
 *   más, baja el índice compacto la primera vez que alguien busca o filtra, y
 *   pinta las tarjetas que faltan con el molde <template> de la página.
 * - Sin resultados: "¿No está tu giro? Te la hacemos", con el WhatsApp
 *   prellenado con lo que se buscó (y aviso si ese giro ya está en la fila).
 */
import { normalizar, puntaje, terminos } from '../lib/busqueda';
import type { EntradaIndice, Indice, ProximaIndice } from '../lib/indice';
import { type Carrusel, iniciarCarrusel } from './carrusel';

interface Textos {
  resultados1: string;
  resultadosN: string;
  sinResultados: string;
  resumen: string;
  contador1: string;
  contadorN: string;
  contadorParcial: string;
  proxima: string;
  modelo: string;
  tarjetaAria: string;
  waBusqueda: string;
  waBase: string;
  proximas: ProximaIndice[];
}

/** Lo mínimo para buscar y ordenar; `e` existe cuando viene del índice. */
interface Item {
  s: string;
  q: string;
  k: string;
  f: string;
  m: string;
  g: string;
  e?: EntradaIndice;
}

type Orden = 'nuevas' | 'az';

const llenar = (plantilla: string, valores: Record<string, string | number>) =>
  plantilla.replace(/\{(\w+)\}/g, (_, clave: string) => String(valores[clave] ?? ''));

function iniciar(raiz: HTMLElement): void {
  const $ = <T extends Element>(selector: string) => raiz.querySelector<T>(selector);
  const modo = raiz.dataset.modo === 'rejilla' ? 'rejilla' : 'carrusel';
  const limiteBase = Number(raiz.dataset.limite) || 12;
  const total = Number(raiz.dataset.total) || 0;
  const urlIndice = raiz.dataset.indice ?? '';
  const form = $<HTMLFormElement>('[data-vitrina-form]');
  const campo = $<HTMLInputElement>('[data-vitrina-q]');
  const estado = $<HTMLElement>('[data-vitrina-estado]');
  const lista = $<HTMLUListElement>('[data-vitrina-lista]');
  const resultados = $<HTMLElement>('[data-vitrina-resultados]');
  const vacio = $<HTMLElement>('[data-vitrina-vacio]');
  const avisoProxima = $<HTMLElement>('[data-vitrina-proxima]');
  const pedir = $<HTMLAnchorElement>('[data-vitrina-pedir]');
  const mas = $<HTMLButtonElement>('[data-vitrina-mas]');
  const orden = $<HTMLSelectElement>('[data-vitrina-orden]');
  const plantilla = $<HTMLTemplateElement>('[data-vitrina-plantilla]');
  const datosTextos = $<HTMLScriptElement>('[data-vitrina-textos]');
  if (!form || !campo || !estado || !lista || !resultados || !vacio || !plantilla || !datosTextos) return;

  const textos = JSON.parse(datosTextos.textContent ?? '{}') as Textos;
  const chips = Array.from(raiz.querySelectorAll<HTMLButtonElement>('button[data-familia]'));
  const pide = lista.querySelector<HTMLLIElement>('[data-vitrina-pide]');
  const enCamino = Array.from(lista.querySelectorAll<HTMLLIElement>('[data-vitrina-en-camino]'));
  const pedirOriginal = pedir?.href ?? '';
  const idioma = document.documentElement.lang;
  const carrusel: Carrusel | null = modo === 'carrusel' ? iniciarCarrusel(raiz) : null;

  // Las tarjetas que ya trae el HTML, por slug.
  const nodos = new Map<string, HTMLLIElement>();
  const delHtml: Item[] = [];
  for (const li of lista.querySelectorAll<HTMLLIElement>('li[data-slug]')) {
    const { slug = '', q = '', k = '', f = '', m = '', g = '' } = li.dataset;
    nodos.set(slug, li);
    delHtml.push({ s: slug, q, k, f, m, g });
  }

  let todos: Item[] | null = delHtml.length >= total ? delHtml : null;
  let carga: Promise<void> | null = null;
  const cargarIndice = (): Promise<void> => {
    if (todos) return Promise.resolve();
    carga ??= fetch(urlIndice)
      .then((r) => (r.ok ? (r.json() as Promise<Indice>) : Promise.reject(new Error(String(r.status)))))
      .then((indice) => {
        todos = indice.l.map((e) => ({ s: e.s, q: e.q, k: e.k, f: e.f, m: e.m, g: e.g, e }));
      })
      .catch(() => {
        // Sin índice se busca entre las del HTML: menos resultados, nunca una vitrina rota.
        todos = delHtml;
      });
    return carga;
  };

  const consulta = { q: '', familia: '', orden: 'nuevas' as Orden, limite: limiteBase };

  const crear = (e: EntradaIndice): HTMLLIElement | null => {
    const molde = plantilla.content.firstElementChild;
    if (!(molde instanceof HTMLLIElement)) return null;
    const li = molde.cloneNode(true) as HTMLLIElement;
    const poner = (selector: string, texto: string) => {
      const el = li.querySelector(selector);
      if (el) el.textContent = texto;
    };
    li.dataset.slug = e.s;
    li.querySelector<HTMLAnchorElement>('[data-t-enlace]')?.setAttribute('href', e.h);
    poner('[data-t-giro]', e.g);
    poner('[data-t-aria]', llenar(textos.tarjetaAria, { c: e.c }));
    poner('[data-t-codigo]', e.c);
    poner('[data-t-modelo]', `${textos.modelo} ${e.n}`);
    poner('[data-t-precio]', e.p);
    poner('[data-sello-codigo]', e.c);
    li.querySelector('[data-captura-molde] source')?.setAttribute('srcset', e.i.a);
    const img = li.querySelector<HTMLImageElement>('[data-captura-molde] img');
    if (img) {
      img.width = e.i.an;
      img.height = e.i.al;
      img.alt = e.i.alt;
      img.srcset = e.i.w;
      img.src = e.i.s;
    }
    const temas = li.querySelector('[data-t-temas]');
    const ficha = temas?.firstElementChild;
    if (temas && ficha) {
      temas.replaceChildren(
        ...e.t.map((colores) => {
          const copia = ficha.cloneNode(true) as Element;
          copia.querySelectorAll('rect').forEach((rect, i) => rect.setAttribute('fill', colores[i] ?? 'none'));
          return copia;
        }),
      );
    }
    nodos.set(e.s, li);
    return li;
  };

  const nodoDe = (item: Item) => nodos.get(item.s) ?? (item.e ? crear(item.e) : null);

  const comparar = {
    nuevas: (a: Item, b: Item) => b.f.localeCompare(a.f),
    az: (a: Item, b: Item) => a.g.localeCompare(b.g, idioma),
  };

  const escribirEstado = (n: number, filtrado: boolean) => {
    const q = consulta.q.trim();
    if (n === 0 && q) {
      estado.textContent = llenar(textos.sinResultados, { q });
    } else if (modo === 'carrusel') {
      estado.textContent = q ? llenar(n === 1 ? textos.resultados1 : textos.resultadosN, { n, q }) : textos.resumen;
    } else if (filtrado) {
      estado.textContent = llenar(textos.contadorParcial, { n, total });
    } else {
      estado.textContent = total === 1 ? textos.contador1 : llenar(textos.contadorN, { n: total });
    }
  };

  const escribirVacio = (sinResultados: boolean, terminosBusqueda: string[]) => {
    vacio.hidden = !sinResultados;
    resultados.hidden = sinResultados;
    if (!sinResultados) return;
    const q = consulta.q.trim();
    const proxima = q ? textos.proximas.find((p) => puntaje(terminosBusqueda, normalizar(p.g), p.k) > 0) : undefined;
    if (avisoProxima) {
      avisoProxima.hidden = !proxima;
      avisoProxima.textContent = proxima ? llenar(textos.proxima, { g: proxima.g }) : '';
    }
    if (pedir) {
      pedir.href = q ? `${textos.waBase}${encodeURIComponent(llenar(textos.waBusqueda, { q }))}` : pedirOriginal;
    }
  };

  const sincronizarUrl = () => {
    if (modo !== 'rejilla') return;
    const url = new URL(location.href);
    const params: [string, string, string][] = [
      ['q', consulta.q.trim(), ''],
      ['familia', consulta.familia, ''],
      ['orden', consulta.orden, 'nuevas'],
    ];
    for (const [clave, valor, porDefecto] of params) {
      if (valor && valor !== porDefecto) url.searchParams.set(clave, valor);
      else url.searchParams.delete(clave);
    }
    history.replaceState(history.state, '', url);
  };

  let ultimaFirma = '';

  /** Filtra, ordena y pinta. Devuelve los nodos que entraron con "Mostrar más". */
  const aplicar = (): HTMLLIElement[] => {
    const fuente = todos ?? delHtml;
    const terminosBusqueda = terminos(consulta.q);
    const encontrados: { item: Item; p: number }[] = [];
    for (const item of fuente) {
      if (consulta.familia && item.m !== consulta.familia) continue;
      const p = puntaje(terminosBusqueda, item.q, item.k);
      if (p > 0) encontrados.push({ item, p });
    }
    const porOrden = comparar[consulta.orden];
    encontrados.sort((a, b) => (terminosBusqueda.length > 0 ? b.p - a.p : 0) || porOrden(a.item, b.item));

    const visibles = encontrados
      .slice(0, consulta.limite)
      .map(({ item }) => nodoDe(item))
      .filter((n): n is HTMLLIElement => n !== null);

    const antes = new Set(lista.children);
    const firma = visibles.map((n) => n.dataset.slug).join('|');
    if (firma !== ultimaFirma) {
      lista.replaceChildren(...visibles, ...enCamino, ...(pide ? [pide] : []));
      ultimaFirma = firma;
    }

    const filtrado = consulta.q.trim() !== '' || consulta.familia !== '';
    // Las próximas acompañan a la vitrina completa; mientras se busca, solo estorban.
    for (const item of enCamino) item.hidden = filtrado;
    escribirEstado(encontrados.length, filtrado);
    escribirVacio(encontrados.length === 0, terminosBusqueda);
    if (mas) mas.hidden = encontrados.length <= consulta.limite;
    sincronizarUrl();
    carrusel?.actualizar();
    return visibles.filter((n) => !antes.has(n));
  };

  /** Aplica en cuanto haya datos suficientes (baja el índice si hace falta). */
  const buscar = () => {
    if (todos) {
      aplicar();
      return;
    }
    void cargarIndice().then(() => aplicar());
  };

  campo.addEventListener('input', () => {
    consulta.q = campo.value;
    consulta.limite = limiteBase;
    carrusel?.alInicio();
    buscar();
  });
  // Bajar el índice antes de que se escriba la primera letra.
  campo.addEventListener('focus', () => void cargarIndice(), { once: true });

  form.addEventListener('submit', (e) => {
    // En /landings ya se filtró en vivo; en la home, Enter lleva a /landings/?q=…
    if (modo !== 'rejilla') return;
    e.preventDefault();
    campo.blur();
  });

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      consulta.familia = chip.dataset.familia ?? '';
      consulta.limite = limiteBase;
      for (const otro of chips) otro.setAttribute('aria-pressed', String(otro === chip));
      buscar();
    });
  }

  orden?.addEventListener('change', () => {
    consulta.orden = orden.value === 'az' ? 'az' : 'nuevas';
    buscar();
  });

  mas?.addEventListener('click', () => {
    consulta.limite += limiteBase;
    void cargarIndice().then(() => {
      const nuevos = aplicar();
      // El foco sigue al contenido: la primera tarjeta que entró.
      nuevos[0]?.querySelector<HTMLAnchorElement>('a')?.focus();
    });
  });

  lista.dataset.activa = '';
  ultimaFirma = Array.from(nodos.keys()).join('|');

  // /landings/?q=gym&familia=fitness&orden=az (desde la home o un enlace compartido).
  if (modo === 'rejilla') {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') ?? '';
    const familia = params.get('familia') ?? '';
    const ordenUrl = params.get('orden') === 'az' ? 'az' : 'nuevas';
    if (q || familia || ordenUrl !== 'nuevas') {
      consulta.q = q;
      campo.value = q;
      const chip = chips.find((c) => c.dataset.familia === familia);
      if (chip) {
        consulta.familia = familia;
        for (const otro of chips) otro.setAttribute('aria-pressed', String(otro === chip));
      }
      consulta.orden = ordenUrl;
      if (orden) orden.value = ordenUrl;
      buscar();
    }
  }
}

export function iniciarVitrinas(): void {
  for (const raiz of document.querySelectorAll<HTMLElement>('[data-vitrina]')) iniciar(raiz);
}

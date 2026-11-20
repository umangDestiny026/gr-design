"use client";

// Inputs to configure on the component: none
// Output to configure on the component: modelSelected
// Desktop header + mega menu + mobile hamburger panel for GAZOO Racing.
import { useCallback, useEffect, useRef, useState } from "react";

interface Model {
  name: string;
  isNew: boolean;
  img: string;
  alt: string;
  detail: string;
  quote: string;
}

interface ApiVehicle {
  category: string | null;
  cotizarurl: string | null;
  detailurl: string | null;
  isactive: boolean | null;
  isnovedad: boolean | null;
  vehicleimage: string | null;
  vehiclename: string | null;
  deportivostgrorder: string | null;
}

const API_URL = "https://api.toyota.com.co/graphql";
const API_KEY = "da2-ha2r4f6f2rddzegupiwaasohvi";
const IMAGE_HOST = "https://content.toyota.com.co";
const QUOTE_HOST = "https://gazooracing.com.co";
const CATEGORY = "Deportivos TGR";

const QUERY = `query GetVehiclesHighlights {
  VehicleHighlightsResolver(operation: list, limit: 200) {
    items {
      category
      cotizarurl
      detailurl
      isactive
      isnovedad
      vehicleimage
      vehiclename
      deportivostgrorder
    }
  }
}`;

const toAbsolute = (url: string | null, host: string) =>
  !url ? "#" : /^https?:\/\//.test(url) ? url : `${host}${url.startsWith("/") ? "" : "/"}${url}`;

// `category` comes as a JSON-encoded array string, e.g. '["Autos","Deportivos TGR"]'.
const hasCategory = (raw: string | null, wanted: string) => {
  try {
    const list = JSON.parse(raw ?? "[]");
    return Array.isArray(list) && list.includes(wanted);
  } catch {
    return false;
  }
};

const orderOf = (v: ApiVehicle) => {
  const n = Number(v.deportivostgrorder);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
};

function toModels(items: ApiVehicle[]): Model[] {
  return items
    .filter((v) => v.isactive !== false && v.vehiclename && hasCategory(v.category, CATEGORY))
    .sort((x, y) => orderOf(x) - orderOf(y))
    .map((v) => ({
      name: v.vehiclename as string,
      isNew: Boolean(v.isnovedad),
      img: toAbsolute(v.vehicleimage, IMAGE_HOST),
      alt: `Toyota ${v.vehiclename}`,
      detail: toAbsolute(v.detailurl, QUOTE_HOST),
      quote: toAbsolute(v.cotizarurl, QUOTE_HOST),
    }));
}

interface HeaderProps {
  onOutput?: (key: string, value: unknown) => void;
}

function ModelCard({ m }: { m: Model }) {
  return (
    <li className="t-mega-card">
      <p className="t-mega-name">
        {m.name}
        {m.isNew && (
          <>
            {" "}
            <span className="t-mega-tag"><span>Novedad</span></span>
          </>
        )}
      </p>
      <img className="t-mega-shot" src={m.img} alt={m.alt} loading="lazy" />
      <p className="t-mega-links">
        <a href={m.detail}>Ver detalles</a>
        <a href={m.quote}>Cotizar</a>
      </p>
    </li>
  );
}

export default function Header({ onOutput }: HeaderProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [megaOpen, setMegaOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Load the GR vehicles (category "Deportivos TGR", sorted by deportivostgrorder).
  useEffect(() => {
    let cancelled = false;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`The API answered ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const items: ApiVehicle[] = json?.data?.VehicleHighlightsResolver?.items ?? [];
        setModels(toModels(items));
      })
      .catch(() => {
        if (!cancelled) setModels([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const closePanel = useCallback(() => {
    setSubOpen(false);
    setPanelOpen(false);
  }, []);

  const onLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;
    const card = link.closest(".t-mega-card, .t-msub-list li");
    const name = card?.querySelector(".t-mega-name")?.firstChild?.textContent?.trim();
    if (name) onOutput?.("modelSelected", name);
  };

  const onSubListClick = (e: React.MouseEvent<HTMLElement>) => {
    onLinkClick(e);
    if ((e.target as HTMLElement).closest("a")) closePanel();
  };

  // Click outside closes the mega menu; Escape closes mega / sub-panel / panel.
  useEffect(() => {
    const onDocClick = () => setMegaOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) { setMegaOpen(false); megaBtnRef.current?.focus(); }
      if (subOpen) setSubOpen(false);
      else if (panelOpen) setPanelOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen, subOpen, panelOpen]);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = panelOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen]);

  // Reset sub-panel scroll when opened.
  useEffect(() => {
    if (subOpen && subRef.current) subRef.current.scrollTop = 0;
  }, [subOpen]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://content.toyota.com.co/toyota-images/tgr/css/homapage.css"
        precedence="default"
      />
      <header className="t-header" id="t-header">
          <div className="t-header-inner">

            <a className="t-logo" href="https://www.toyota.com.co/deportivos-tgr/inicio"
              aria-label="GAZOO Racing Colombia — Inicio">
              <img src="/assets/icons/brand/gazoo-racing-lockup-white-bg.svg" alt="GAZOO Racing" width="964" height="112" />
            </a>

            <nav className="t-nav" aria-label="Principal">
              <button className="t-nav-link is-current" id="t-mega-btn" type="button" aria-expanded={megaOpen}
              onClick={(e) => { e.stopPropagation(); setMegaOpen((o) => !o); }}
              ref={megaBtnRef} aria-controls="t-mega"
                aria-current="page">Garaje GR<i className="t-nav-caret" aria-hidden="true"></i></button>
              <a className="t-nav-link" href="https://toyota.com.co/deportivos-tgr/historia">Historia</a>
              <a className="t-nav-link" href="https://toyota.com.co/noticias">Noticias</a>
              <a className="t-nav-link" href="https://www.toyota.com.co/cotiza-tu-toyota/vehiculos-nuevos">Cotizador</a>
              <a className="t-nav-link" href="https://www.toyota.com.co/concesionarios">Concesionarios Toyota</a>
              <a className="t-wa"
                href="https://api.whatsapp.com/send/?phone=573114810880&amp;text=Hola.+Quiero+m%C3%A1s+informaci%C3%B3n+sobre...&amp;type=phone_number&amp;app_absent=0"
                aria-label="Escríbenos por WhatsApp">
                <img src="/assets/toyota/whatsapp.svg" alt="" width="20" height="20" />
              </a>
              <a className="t-region" href="https://toyotagazooracing.com" target="_blank" rel="noopener"
                aria-label="Sitio global de GAZOO Racing — Colombia"><svg viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
                </svg>Colombia</a>
            </nav>

            <button className="t-burger" id="t-burger" aria-label="Abrir menú" aria-expanded={panelOpen}
              onClick={() => setPanelOpen(true)} aria-controls="t-mobile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>

          <div
          className={`t-mega${megaOpen ? " is-open" : ""}`}
          id="t-mega"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) { onLinkClick(e); setMegaOpen(false); }
            else e.stopPropagation();
          }}
        >
            <div className="wrap is-10col">
              <p className="t-mega-tab">Deportivos GR</p>

              <ul className="t-mega-grid">
                {models.map((m) => (
                  <ModelCard key={m.name} m={m} />
                ))}
              </ul>
            </div>
          </div>
        </header>

      <div
        className={`t-mobile${panelOpen ? " is-open" : ""}`}
        id="t-mobile"
        aria-hidden={!panelOpen}
        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) closePanel(); }}
      >
          <div className="t-mobile-head">
            <img src="/assets/icons/brand/gazoo-racing-lockup.svg" alt="GAZOO Racing" width="964" height="112" />
            <button className="t-mobile-close" id="t-mobile-close" aria-label="Cerrar menú" onClick={closePanel}>&#10005;</button>
          </div>
          <nav aria-label="Menú móvil">
            <button className="t-mobile-flat t-mobile-flat--sub is-current" id="t-msub-open" type="button" aria-expanded={subOpen}
              onClick={() => setSubOpen(true)}
              aria-controls="t-msub" aria-current="page">Garaje GR</button>
            <a className="t-mobile-flat" href="https://toyota.com.co/deportivos-tgr/historia">Historia</a>
            <a className="t-mobile-flat" href="https://toyota.com.co/noticias">Noticias</a>

            <div className="t-mobile-util">
              <a href="https://www.toyota.com.co/cotiza-tu-toyota/vehiculos-nuevos">Cotizador</a>
              <a href="https://www.toyota.com.co/concesionarios">Concesionarios Toyota</a>
              <a className="t-mobile-wa"
                href="https://api.whatsapp.com/send/?phone=573114810880&amp;text=Hola.+Quiero+m%C3%A1s+informaci%C3%B3n+sobre...&amp;type=phone_number&amp;app_absent=0"
                aria-label="Escríbenos por WhatsApp">
                <img src="/assets/toyota/whatsapp.svg" alt="" width="20" height="20" />
              </a>
              <a className="t-mobile-region" href="https://toyotagazooracing.com" target="_blank" rel="noopener"><svg
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
                </svg>GR Global · Colombia</a>
            </div>
          </nav>

          <div
            className={`t-msub${subOpen ? " is-open" : ""}`}
            id="t-msub"
            aria-hidden={!subOpen}
            ref={subRef}
          >
            <div className="t-msub-head">
              <button className="t-msub-back" id="t-msub-back" type="button" onClick={() => setSubOpen(false)} aria-label="Volver al menú">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <span className="t-msub-title">Garaje GR</span>
              <button className="t-msub-close" id="t-msub-close" type="button" aria-label="Cerrar menú" onClick={closePanel}>&#10005;</button>
            </div>

            <p className="t-msub-tab">Deportivos GR</p>
            <ul className="t-msub-list" id="t-msub-list" onClick={onSubListClick}>
              {models.map((m) => (
                <ModelCard key={m.name} m={m} />
              ))}
            </ul>
          </div>
        </div>
    </>
  );
}

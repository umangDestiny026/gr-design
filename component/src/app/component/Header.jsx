"use client"
// Generated from the configuration of "component".
// Props mirror its Inputs; onOutput sends its Outputs.
// Keep one default export and import only allowed packages.
import { useEffect } from "react";

export default function Component() {
 useEffect(() => {
    // 1. Load external CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href =
      "https://content.toyota.com.co/toyota-images/tgr/css/homapage.css";

    document.head.appendChild(css);

    // 2. Load external JavaScript
    const script = document.createElement("script");
    script.src =
      "https://content.toyota.com.co/toyota-images/tgr/js/homepage.js";
    script.async = true;

    document.body.appendChild(script);

    // 3. Cleanup
    return () => {
      document.head.removeChild(css);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <header className="t-header" id="t-header">
        <div className="t-header-inner">
          <a className="t-logo" href="https://www.toyota.com.co/deportivos-tgr/inicio" aria-label="GAZOO Racing Colombia — Inicio">
            <img src="assets/icons/brand/gazoo-racing-lockup-white-bg.svg" alt="GAZOO Racing" width={964} height={112} />
          </a>
          {/* Mismo orden que gazooracing.com.co: Garaje GR · Historia · Alquila ·
   Noticias · Cotizador · Concesionarios Toyota · WhatsApp.
   Garaje GR es ancla interna porque esa sección vive en la propia
   página; el resto sale del dominio.
   El galón de Garaje GR es un <button> aparte y no parte del enlace:
   el texto lleva a la sección y la flecha abre el mega-menú. */}
          <nav className="t-nav" aria-label="Principal">
            <button className="t-nav-link is-current" id="t-mega-btn" type="button" aria-expanded="false" aria-controls="t-mega" aria-current="page">Garaje GR<i className="t-nav-caret" aria-hidden="true" /></button>
            <a className="t-nav-link" href="https://toyota.com.co/deportivos-tgr/historia">Historia</a>
            <a className="t-nav-link" href="https://toyota.com.co/noticias">Noticias</a>
            <a className="t-nav-link" href="https://www.toyota.com.co/cotiza-tu-toyota/vehiculos-nuevos">Cotizador</a>
            <a className="t-nav-link" href="https://www.toyota.com.co/concesionarios">Concesionarios Toyota</a>
            <a className="t-wa" href="https://api.whatsapp.com/send/?phone=573114810880&text=Hola.+Quiero+m%C3%A1s+informaci%C3%B3n+sobre...&type=phone_number&app_absent=0" aria-label="Escríbenos por WhatsApp">
              <img src="assets/toyota/whatsapp.svg" alt width={20} height={20} />
            </a>
            <a className="t-region" href="https://toyotagazooracing.com" target="_blank" rel="noopener" aria-label="Sitio global de GAZOO Racing — Colombia"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx={12} cy={12} r={9} />
              <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
            </svg>Colombia</a>
          </nav>
          <button className="t-burger" id="t-burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="t-mobile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
        {/* ═══════════════════════════════════════════════════════════
 MEGA-MENÚ DE GARAJE GR
 Los seis modelos, sus fotos y sus enlaces salen del menú de
 gazooracing.com.co (API pública GetVehiclesHighlights, campos
 vehiclename / vehicleimage / detailurl / cotizarurl / isnovedad).
 Las fotos están descargadas en assets/menu/, no enlazadas al CDN.
  ═══════════════════════════════════════════════════════════ */}
        <div className="t-mega" id="t-mega">
          <div className="wrap is-10col">
            <p className="t-mega-tab">Deportivos GR</p>
            <ul className="t-mega-grid">
              <li className="t-mega-card">
                <p className="t-mega-name">Corolla GR-S</p>
                <img className="t-mega-shot" src="assets/menu/corolla-gr-s.png" alt="Toyota Corolla GR-S" width={290} height={133} loading="lazy" />
                <p className="t-mega-links">
                  <a href="https://gazooracing.com.co/vehiculos/deportivos-tgr/corolla-gr-s">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/corolla">Cotizar</a>
                </p>
              </li>
              <li className="t-mega-card">
                <p className="t-mega-name">Corolla Cross GR-S</p>
                <img className="t-mega-shot" src="assets/menu/corolla-cross-gr-s.png" alt="Toyota Corolla Cross GR-S" width={290} height={133} loading="lazy" />
                <p className="t-mega-links">
                  <a href="https://gazooracing.com.co/vehiculos/deportivos-tgr/corolla-cross-gr-s">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/corolla-cross">Cotizar</a>
                </p>
              </li>
              <li className="t-mega-card">
                <p className="t-mega-name">GR Yaris <span className="t-mega-tag"><span>Novedad</span></span></p>
                <img className="t-mega-shot" src="assets/menu/gr-yaris.webp" alt="Toyota GR Yaris" width={611} height={291} loading="lazy" />
                <p className="t-mega-links">
                  <a href="interna-general.html">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/yaris-gr">Cotizar</a>
                </p>
              </li>
              <li className="t-mega-card">
                <p className="t-mega-name">RAV4 PHEV GR-S <span className="t-mega-tag"><span>Novedad</span></span></p>
                <img className="t-mega-shot" src="assets/menu/rav4-phev-gr-s.png" alt="Toyota RAV4 PHEV GR-S" width={1160} height={532} loading="lazy" />
                <p className="t-mega-links">
                  <a href="https://gazooracing.com.co/vehiculos/deportivos-tgr/rav4-phev-gr-s">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/rav4">Cotizar</a>
                </p>
              </li>
              <li className="t-mega-card">
                <p className="t-mega-name">Hilux GR-S</p>
                <img className="t-mega-shot" src="assets/menu/hilux-gr-s.png" alt="Toyota Hilux GR-S" width={290} height={133} loading="lazy" />
                <p className="t-mega-links">
                  <a href="https://gazooracing.com.co/vehiculos/deportivos-tgr/hilux-gr-s-iv">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/hilux">Cotizar</a>
                </p>
              </li>
              <li className="t-mega-card">
                <p className="t-mega-name">Fortuner GR-S</p>
                <img className="t-mega-shot" src="assets/menu/fortuner-gr-s.png" alt="Toyota Fortuner GR-S" width={290} height={133} loading="lazy" />
                <p className="t-mega-links">
                  <a href="https://gazooracing.com.co/vehiculos/deportivos-tgr/fortuner-gr-s">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/fortuner">Cotizar</a>
                </p>
              </li>
              <li className="t-mega-card">
                <p className="t-mega-name">Land Cruiser 300 GR-S HEV <span className="t-mega-tag"><span>Novedad</span></span></p>
                <img className="t-mega-shot" src="assets/menu/lc300-hev-gr-s.png" alt="Toyota Land Cruiser 300 GR-S HEV" width={1160} height={532} loading="lazy" />
                <p className="t-mega-links">
                  <a href="https://gazooracing.com.co/vehiculos/deportivos-tgr/lc300-hev-gr-s">Ver detalles</a>
                  <a href="https://gazooracing.com.co/cotizador/lc300-hev-gr-s">Cotizar</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* Panel del header en móvil (≤900px) */}
      <div className="t-mobile" id="t-mobile" aria-hidden="true">
        <div className="t-mobile-head">
          <img src="assets/icons/brand/gazoo-racing-lockup.svg" alt="GAZOO Racing" width={964} height={112} />
          <button className="t-mobile-close" id="t-mobile-close" aria-label="Cerrar menú">✕</button>
        </div>
        <nav aria-label="Menú móvil">
          <button className="t-mobile-flat t-mobile-flat--sub is-current" id="t-msub-open" type="button" aria-expanded="false" aria-controls="t-msub" aria-current="page">Garaje GR</button>
          <a className="t-mobile-flat" href="https://toyota.com.co/deportivos-tgr/historia">Historia</a>
          <a className="t-mobile-flat" href="https://toyota.com.co/noticias">Noticias</a>
          <div className="t-mobile-util">
            <a href="https://www.toyota.com.co/cotiza-tu-toyota/vehiculos-nuevos">Cotizador</a>
            <a href="https://www.toyota.com.co/concesionarios">Concesionarios Toyota</a>
            <a className="t-mobile-wa" href="https://api.whatsapp.com/send/?phone=573114810880&text=Hola.+Quiero+m%C3%A1s+informaci%C3%B3n+sobre...&type=phone_number&app_absent=0" aria-label="Escríbenos por WhatsApp">
              <img src="assets/toyota/whatsapp.svg" alt width={20} height={20} />
            </a>
            <a className="t-mobile-region" href="https://toyotagazooracing.com" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx={12} cy={12} r={9} />
              <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
            </svg>GR Global · Colombia</a>
          </div>
        </nav>
        {/* Sub-panel de Garaje GR. Las tarjetas NO están escritas acá: el JS las
 clona del mega-menú del desktop para no tener los siete modelos
 duplicados en el HTML. */}
        <div className="t-msub" id="t-msub" aria-hidden="true">
          <div className="t-msub-head">
            <button className="t-msub-back" id="t-msub-back" type="button" aria-label="Volver al menú">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <span className="t-msub-title">Garaje GR</span>
            <button className="t-msub-close" id="t-msub-close" type="button" aria-label="Cerrar menú">✕</button>
          </div>
          <p className="t-msub-tab">Deportivos GR</p>
          <ul className="t-msub-list" id="t-msub-list" />
        </div>
      </div>
    </div>

  );
}

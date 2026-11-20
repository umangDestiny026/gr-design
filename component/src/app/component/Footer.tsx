"use client";

// Inputs to configure on the component: none
// Outputs to configure on the component: none
// GAZOO Racing footer with the mobile accordion columns.
import { useState } from "react";

export default function Footer() {
  const [open, setOpen] = useState<boolean[]>([false, false, false, false]);
  const toggle = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));

  return (
    <>
      <link
        rel="stylesheet"
        href="https://content.toyota.com.co/toyota-images/tgr/css/homapage.css"
        precedence="default"
      />
    <footer className="t-footer">

        <div className="wrap is-10col t-footer-top">

          <a className="t-footer-brand" href="https://www.toyota.com.co/deportivos-tgr/inicio"
            aria-label="GAZOO Racing Colombia — Inicio">
            <img className="t-footer-logo" src="/assets/icons/brand/gazoo-racing-lockup.svg" alt="GAZOO Racing" width="964" height="112" loading="lazy" />
          </a>

          <div className="t-footer-cols">

            <div className="t-footer-col">
              <button className="t-footer-acc-btn" type="button" aria-expanded={open[0]} onClick={() => toggle(0)}>Vehículos <span className="t-footer-acc-icon"
                  aria-hidden="true">+</span></button>
              <span className="t-footer-title">Vehículos</span>
              <div className="t-footer-body">
                <div>
                  <div className="t-footer-list">
                    <a href="https://www.toyota.com.co/cotiza-tu-toyota/vehiculos-nuevos">Toyota</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="t-footer-col">
              <button className="t-footer-acc-btn" type="button" aria-expanded={open[1]} onClick={() => toggle(1)}>Acerca de GR <span
                  className="t-footer-acc-icon" aria-hidden="true">+</span></button>
              <span className="t-footer-title">Acerca de GR</span>
              <div className="t-footer-body">
                <div>
                  <div className="t-footer-list">
                    <a href="https://www.toyota.com.co/mi-toyota/campanas-de-seguridad-y-servicios">Campañas de
                      seguridad</a>
                    <a href="https://www.toyota.com.co/mi-toyota/mantenimiento">Mantenimiento Toyota</a>
                    <a href="https://www.toyota.com.co/cotiza-tu-toyota/financiacion-toyota">Financia tu Toyota</a>
                    <a href="https://www.toyota.com.co/noticias">Noticias</a>
                    <a href="https://www.toyota.com.co/deportivos-tgr/inicio">GAZOO Racing</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="t-footer-col">
              <button className="t-footer-acc-btn" type="button" aria-expanded={open[2]} onClick={() => toggle(2)}>Enlaces Útiles <span
                  className="t-footer-acc-icon" aria-hidden="true">+</span></button>
              <span className="t-footer-title">Enlaces Útiles</span>
              <div className="t-footer-body">
                <div>
                  <div className="t-footer-list">
                    <a href="https://www.kinto-mobility.com.co/kinto-share#no-back">Alquila tu Toyota</a>
                    <a href="https://www.canaldeintegridadtoyotacolombia.com/">Canal de Integridad</a>
                    <a href="https://www.toyota.com.co/pqrs">PQR</a>
                    <a
                      href="https://www.supersociedades.gov.co/es/web/asuntos-economicos-societarios/denuncias-soborno-transnacional">Denuncias
                      sobre soborno transnacional</a>
                    <a href="https://portal.paco.gov.co/index.php?pagina=denuncie">Denuncias sobre Actos de corrupción</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="t-footer-col">
              <button className="t-footer-acc-btn" type="button" aria-expanded={open[3]} onClick={() => toggle(3)}>Contáctanos <span
                  className="t-footer-acc-icon" aria-hidden="true">+</span></button>
              <span className="t-footer-title">Contáctanos</span>
              <div className="t-footer-body">
                <div>
                  <div className="t-footer-list">
                    <a href="https://www.toyota.com.co/cotiza-tu-toyota/vehiculos-nuevos">Cotizador</a>
                    <a href="https://www.toyota.com.co/contacto">Contacto</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="wrap is-10col">

          <div className="t-footer-brands">
            <a href="https://global.toyota/" target="_blank" rel="noopener" aria-label="Toyota — sitio global"><img src="/assets/toyota/logo.svg" alt="Toyota" width="170" height="29" loading="lazy" /></a>
            <a href="https://toyotagazooracing.com" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
              </svg>GR Global · Colombia</a>
          </div>

          <div className="t-footer-mid">
            <div className="t-footer-links">
              <a href="#">Política de seguridad SGCS</a>
              <a href="#">Términos y Condiciones</a>
              <a href="#">Políticas y Privacidad</a>
              <a href="https://www.toyota.com.co/pqrs">PQR</a>
              <a href="#">Accesibilidad</a>
              <a href="#">Opciones de Privacidad</a>
              <a href="#">Consentimiento de Cookies</a>
            </div>

            <div className="t-footer-social">
              <a href="https://www.instagram.com/toyotacolombia/" target="_blank" rel="noopener" aria-label="Instagram">
                <img src="/assets/toyota/instagram.png" alt="" loading="lazy" /></a>
            </div>
          </div>

          <div className="t-footer-legal">
            <span>&copy; 2026 Automotores Toyota Colombia S.A.S.</span>
            <span>Todos los derechos reservados.</span>
            <span>La información aquí presente se aplica solo a vehículos en Colombia.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

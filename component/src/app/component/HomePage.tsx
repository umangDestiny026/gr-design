"use client";

// Inputs to configure on the component: none
// Output to configure on the component: vehicleSelected
// GAZOO Racing home page content (hero, GR Garage, poster, history, gallery, boutique, social, outro + lightbox).
// Header and Footer are separate components.
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject, TouchEvent } from "react";

interface HomePageProps {
  onOutput?: (key: string, value: unknown) => void;
}

/* ───────────────────────────── DATA ───────────────────────────── */

type IconKey = "turbo" | "power" | "gear" | "engine" | "seats" | "awd" | "hybrid";

const ICONS: Record<IconKey, ReactNode> = {
  turbo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="7.2" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 4.8v2.8M19.2 12h-2.8M12 19.2v-2.8M4.8 12h2.8" />
    </svg>
  ),
  power: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.2 2 4.6 13.4h6.1L9.4 22l8.9-11.7h-6.2z" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M7 5.5v13M17 5.5v13M7 12h10" />
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  engine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V8.5A2.5 2.5 0 0 1 6.5 6h5A2.5 2.5 0 0 1 14 8.5V20" />
      <path d="M3 20h12M14 11.5h2.6a2 2 0 0 1 2 2v3.4a1.45 1.45 0 0 0 2.9 0v-6.6l-2.4-2.4" />
    </svg>
  ),
  seats: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="8" r="3.1" />
      <path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" />
    </svg>
  ),
  awd: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.3" />
      <circle cx="17" cy="7" r="2.3" />
      <circle cx="7" cy="17" r="2.3" />
      <circle cx="17" cy="17" r="2.3" />
      <path d="M9.3 7h5.4M9.3 17h5.4M7 9.3v5.4M17 9.3v5.4" />
    </svg>
  ),
  hybrid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.6" y="7.2" width="15.4" height="9.6" rx="2.2" />
      <path d="M20.6 10.6v2.8" />
      <path d="M10.9 9.9 8.4 13.1h3.2l-1 2.6" />
    </svg>
  ),
};

const TOYOTA = "https://www.toyota.com.co";
const GAZOO_RACING = "https://gazooracing.com.co";
const API_URL = "https://api.toyota.com.co/graphql";
const API_KEY = "da2-ha2r4f6f2rddzegupiwaasohvi";
const IMAGE_HOST = "https://content.toyota.com.co";

interface Vehicle {
  name: string;
  variant: string;
  img: string;
  url: string;
  chips: [IconKey, string][];
  desc: string;
}

// Every vehicle of the catalog is scanned: `showroomgazooisgrgarage` can be set on any model.
const GARAGE_QUERY = `query {
  VehicleResolver(operation: list, limit: 100) {
    items {
      models {
        slug
        contentTypeId
        showroomgazoomodelname
        showroomgazooenginedescription
        showroomgazoopowerhp
        showroomgazootransmission
        showroomgazootransmissionspeeds
        showroomgazoodrivetrain
        showroomgazoovariant
        showroomgazoogrgaragedescription
        showroomgazooisgrgarage
        showroomgazoogrgaragesortorder
        showroomgazoogimage
      }
    }
  }
}`;

interface ApiModel {
  slug: string | null;
  showroomgazoomodelname: string | null;
  showroomgazooenginedescription: string | null;
  showroomgazoopowerhp: string | null;
  showroomgazootransmission: string | null;
  showroomgazootransmissionspeeds: string | null;
  showroomgazoodrivetrain: string | null;
  showroomgazoovariant: string | null;
  showroomgazoogrgaragedescription: string | null;
  showroomgazooisgrgarage: string | null;
  showroomgazoogrgaragesortorder: string | null;
  showroomgazoogimage: string | null;
}

interface ApiVehicleItem {
  models: ApiModel[] | null;
}

const clean = (v: string | null | undefined) => (v ?? "").trim();

// The CMS paths mix encoded and raw characters: decode first, then encode once.
const imageUrl = (path: string) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  let decoded = path;
  try {
    decoded = decodeURI(path);
  } catch {
    /* keep the raw path */
  }
  return `${IMAGE_HOST}${encodeURI(decoded)}`;
};

// The four chips go in this order: engine · power · transmission · drive or capacity.
function toVehicle(m: ApiModel): Vehicle {
  const engine = clean(m.showroomgazooenginedescription);
  const engineIcon: IconKey = /h[ií]brid/i.test(engine)
    ? "hybrid"
    : /turbo/i.test(engine) && !/di[eé]sel/i.test(engine)
      ? "turbo"
      : "engine";
  const hp = clean(m.showroomgazoopowerhp);
  const gearbox = clean(m.showroomgazootransmission);
  const speeds = clean(m.showroomgazootransmissionspeeds);
  const drive = clean(m.showroomgazoodrivetrain);
  const name = clean(m.showroomgazoomodelname);
  const variant = clean(m.showroomgazoovariant);

  const chips: [IconKey, string][] = [];
  if (engine) chips.push([engineIcon, engine]);
  if (hp) chips.push(["power", `${hp} CV`]);
  if (gearbox) chips.push(["gear", speeds ? `${gearbox} ${speeds} vel.` : gearbox]);
  if (drive) chips.push([/pasajeros/i.test(drive) ? "seats" : "awd", drive]);

  return {
    name,
    // Most model names already say "GR-S" / "GR": the variant is only shown when the name does not.
    variant: /\bGR\b|GR-/i.test(name) ? "" : variant,
    img: imageUrl(clean(m.showroomgazoogimage)),
    url: `${GAZOO_RACING}/vehiculos/deportivos-tgr/${clean(m.slug)}`,
    chips,
    desc: clean(m.showroomgazoogrgaragedescription),
  };
}

function toGarage(items: ApiVehicleItem[]): Vehicle[] {
  const rows: { order: number; vehicle: Vehicle }[] = [];
  items.forEach((item) =>
    (item.models ?? []).forEach((m) => {
      // `showroomgazooisgrgarage` is free text in the CMS ("true" / "True" / "false"), not a Boolean.
      if (clean(m.showroomgazooisgrgarage).toLowerCase() !== "true") return;
      const order = parseInt(clean(m.showroomgazoogrgaragesortorder), 10);
      rows.push({ order: Number.isFinite(order) ? order : 999, vehicle: toVehicle(m) });
    }),
  );
  console.log("vehicles",rows )
  return rows.sort((x, y) => x.order - y.order).map((r) => r.vehicle);
}

interface Milestone {
  img: string;
  from: string;
  to: string;
  title: string;
  text: string;
  now?: boolean;
}

const MILESTONES: Milestone[] = [
  { img: "/assets/historia/1957.jpg", from: "1957", to: "1986", title: "El primer rally", text: "La historia del automovilismo para Toyota comienza en un rally." },
  { img: "/assets/historia/1994.jpg", from: "1990", to: "1999", title: "En la cima del WRC", text: "En los 90, Toyota alcanzó una gran racha ganadora." },
  { img: "/assets/historia/2018.jpg", from: "2000", to: "2018", title: "El regreso", text: "Toyota regresa al campeonato mundial de rally." },
  { img: "/assets/historia/2022.jpg", from: "2018", to: "Hoy", title: "Corona y nombre", text: "Tres coronas seguidas del FIA WEC. En 2026 suelta el prefijo y vuelve a llamarse GAZOO Racing.", now: true },
];

interface GalleryItem {
  src: string;
  alt: string;
  cap: string;
}

const GALLERY: GalleryItem[] = [
  { src: "/assets/imgs/gr86-tunnel.jpg", alt: "Toyota GR86 en carretera de montaña", cap: "GR86" },
  { src: "/assets/imgs/gr86-road-rear.jpg", alt: "Toyota GR86 de perfil trasero en ruta", cap: "En ruta" },
  { src: "/assets/imgs/gr86-interior.jpg", alt: "Interior del Toyota GR86", cap: "Interior" },
  { src: "/assets/imgs/gr86-snow.jpg", alt: "Toyota GR86 sobre nieve", cap: "Nieve" },
  { src: "/assets/imgs/gr86-front-duo.jpg", alt: "Dos Toyota GR86 de frente en pista", cap: "En pista" },
  { src: "/assets/imgs/gr86-red-profile.jpg", alt: "Toyota GR86 rojo de perfil", cap: "GR86 · Perfil" },
];

/* ───────────────────────────── HOOKS ───────────────────────────── */

// Native scroll-snap carousel driven by prev/next buttons (GR Garage and history timeline).
function useCarousel(trackRef: RefObject<HTMLElement | null>, itemCount: number) {
  const [state, setState] = useState({ idx: 0, total: 0, atStart: true, atEnd: false });

  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }, [trackRef]);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const total = track.children.length;
    const s = step();
    const idx = s ? Math.round(track.scrollLeft / s) : 0;
    setState({
      idx: Math.min(idx, total - 1),
      total,
      atStart: track.scrollLeft <= 1,
      atEnd: track.scrollLeft >= track.scrollWidth - track.clientWidth - 1,
    });
  }, [trackRef, step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(sync, 120);
    };
    sync();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      clearTimeout(t);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, [trackRef, sync]);

  // Items can arrive after mount (API data): measure again when their number changes.
  useEffect(() => {
    sync();
  }, [itemCount, sync]);

  // With smooth scrolling the final scrollLeft is not ready immediately: sync now and again after the animation.
  const nudge = useCallback(
    (dir: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollLeft += dir * step();
      setTimeout(sync, 60);
      setTimeout(sync, 450);
    },
    [trackRef, step, sync],
  );

  return { ...state, nudge };
}

/* ───────────────────────────── SMALL PIECES ───────────────────────────── */

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ArrowRight({ strokeWidth = 2.2 }: { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ───────────────────────────── COMPONENT ───────────────────────────── */

export default function HomePage({ onOutput }: HomePageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const vehiclesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const touchX0 = useRef<number | null>(null);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const garage = useCarousel(vehiclesRef, vehicles.length);
  const timeline = useCarousel(timelineRef, MILESTONES.length);

  // GR Garage models come from the API, sorted by `showroomgazoogrgaragesortorder`.
  useEffect(() => {
    let cancelled = false;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify({ query: GARAGE_QUERY }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`The API answered ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const items: ApiVehicleItem[] = json?.data?.VehicleResolver?.items ?? [];
        setVehicles(toGarage(items));
      })
      .catch(() => {
        if (!cancelled) setVehicles([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Lightbox: index of the open image, or null when closed. `shown` is the image painted (it lags
  // behind `lbIndex` by 130 ms so the fade-out can finish), `fading` drives the opacity.
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const lbOpen = lbIndex !== null;

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const openLightbox = (i: number) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setShown(i);
    setLbIndex(i);
  };

  const closeLightbox = useCallback(() => {
    setLbIndex(null);
    lastFocusRef.current?.focus();
  }, []);

  const moveLightbox = useCallback(
    (d: number) => {
      if (lbIndex === null) return;
      const next = (lbIndex + d + GALLERY.length) % GALLERY.length;
      setLbIndex(next);
      if (reduceMotion()) {
        setShown(next);
        return;
      }
      setFading(true);
      setTimeout(() => {
        setShown(next);
        setFading(false);
      }, 130);
    },
    [lbIndex],
  );

  // Body class (page scroll lock in CSS) + focus the close button when the lightbox opens.
  useEffect(() => {
    document.body.classList.toggle("gr-lb-open", lbOpen);
    if (lbOpen) closeBtnRef.current?.focus();
    return () => document.body.classList.remove("gr-lb-open");
  }, [lbOpen]);

  // Lightbox keyboard: Escape / arrows.
  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lbOpen, closeLightbox, moveLightbox]);

  const onTouchStart = (e: TouchEvent) => {
    touchX0.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX0.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX0.current;
    if (Math.abs(dx) > 50) moveLightbox(dx > 0 ? -1 : 1);
    touchX0.current = null;
  };

  // Reveal on scroll: adds `is-in` to every `.reveal` element once it enters the viewport.
  useEffect(() => {
    const els = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".reveal") ?? []);
    if (!els.length) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const current = GALLERY[shown];

  return (
    <div ref={rootRef}>
      <link
        rel="stylesheet"
        href="https://content.toyota.com.co/toyota-images/tgr/css/homapage.css"
        precedence="default"
      />

      <a className="sr-only" href="#gr-main">Saltar al contenido</a>

      <main className="gr" id="gr-main">
        {/* HERO */}
        <section className="gr-hero">
          <picture>
            <source media="(max-width:760px)" srcSet="/assets/video/Yaris-Gif-Cel.gif" />
            <img className="gr-hero-media" src="/assets/video/Yaris-Gif-DeskF.gif" alt="" aria-hidden="true" fetchPriority="high" />
          </picture>
          <div className="gr-hero-scrim" aria-hidden="true"></div>
          <div className="gr-hero-inner">
            <h1>
              <img className="gr-hero-logo" src="/assets/icons/brand/gazoo-racing-lockup.svg" alt="GAZOO Racing" width={964} height={112} />
            </h1>
            <p className="gr-hero-sub">
              El equipo de automovilismo y los vehículos ganadores de las competencias más retadoras del mundo.
            </p>
            <div className="gr-hero-ctas">
              <a className="gr-btn" href="#modelos"><span>Ver modelos GR</span></a>
              <a className="gr-btn gr-btn--ghost" href="#historia"><span>Conoce la historia</span></a>
            </div>
          </div>
          <a className="gr-hero-scroll" href="#modelos" aria-label="Bajar a los modelos">
            <span>Desliza</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
        </section>

        {/* GR GARAGE */}
        <section className="gr-section" id="modelos">
          <div className="wrap is-10col gr-models">
            <header className="gr-models-head reveal">
              <span className="gr-eyebrow">La gama</span>
              <h2 className="gr-title">GR Garage</h2>
              <p className="gr-lead">
                <b>GR</b>: deportivos puros de pista. <b>GR SPORT</b>: ese aprendizaje llevado a modelos de calle.
              </p>
            </header>
            <div className="gr-vgrid" id="gr-vehicles" role="list" ref={vehiclesRef}>
              {vehicles.map((v) => (
                <article className="gr-vcard" role="listitem" key={`${v.name}-${v.variant}`}>
                  <div className="gr-vcard-body">
                    <div className="gr-vcard-photo">
                      <img src={v.img} alt={`Toyota ${v.name} ${v.variant}`.trim()} loading="lazy" decoding="async" />
                    </div>
                    <div className="gr-vcard-info">
                      <div className="gr-chips">
                        {v.chips.map(([icon, label]) => (
                          <span className="gr-chip" key={label}>
                            <span>
                              {ICONS[icon]}
                              {label}
                            </span>
                          </span>
                        ))}
                      </div>
                      <h3 className="gr-vcard-name">
                        {v.name}
                        {v.variant && <span className="gr-vcard-variant">{v.variant}</span>}
                      </h3>
                      <p className="gr-vcard-desc">{v.desc}</p>
                      <a
                        className="gr-btn gr-vcard-cta"
                        href={v.url}
                        onClick={() => onOutput?.("vehicleSelected", `${v.name} ${v.variant}`.trim())}
                      >
                        <span>
                          Conocer detalles
                          <ArrowRight />
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="gr-vnav">
              <button className="gr-vnav-btn" id="gr-veh-prev" type="button" aria-label="Modelo anterior" disabled={garage.atStart} onClick={() => garage.nudge(-1)}>
                <ChevronLeft />
              </button>
              <button className="gr-vnav-btn" id="gr-veh-next" type="button" aria-label="Modelo siguiente" disabled={garage.atEnd} onClick={() => garage.nudge(1)}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>

        {/* POSTER */}
        <section className="gr-poster">
          <img className="gr-poster-stripes" src="/assets/elements/gr-stripes.png" alt="" aria-hidden="true" loading="lazy" />
          <div className="wrap">
            <blockquote className="gr-poster-quote reveal">
              <p>
                Nos inspiramos compitiendo en todo tipo de caminos.{" "}
                <em>Nos inspiramos a construir vehículos cada vez mejores.</em>
              </p>
            </blockquote>
            <div className="gr-poster-stage">
              <div className="gr-poster-band">
                <img src="/assets/poster/franja.jpg" alt="" aria-hidden="true" width={2000} height={677} loading="lazy" />
              </div>
              <div className="gr-poster-carwrap">
                <img className="gr-poster-car" src="/assets/poster/carro.png" alt="Toyota GR Yaris" width={2000} height={831} loading="lazy" />
              </div>
            </div>
            <div className="gr-poster-foot">
              <img className="gr-poster-logo" src="/assets/icons/brand/gazoo-racing-lockup-red-bg.svg" alt="GAZOO Racing" width={96} height={11} loading="lazy" />
              <img className="gr-poster-chevrons" src="/assets/elements/gr-chevrons.png" alt="" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </section>

        {/* LOS INICIOS */}
        <section className="gr-section" id="historia">
          <div className="wrap is-10col">
            <header className="gr-head reveal">
              <span className="gr-eyebrow">1957 — Hoy</span>
              <h2 className="gr-title">Los inicios</h2>
              <p className="gr-lead">Cuatro etapas, del primer rally en 1957 a las coronas de resistencia.</p>
            </header>
            <ol className="gr-timeline" id="gr-timeline" ref={timelineRef}>
              {MILESTONES.map((m, i) => (
                <li
                  className={`gr-tl-card${m.now ? " gr-tl-card--now" : ""} reveal`}
                  data-d={i > 0 ? i : undefined}
                  key={m.title}
                >
                  <img className="gr-tl-photo" src={m.img} alt="" loading="lazy" decoding="async" />
                  <span className="gr-tl-scrim" aria-hidden="true"></span>
                  <div className="gr-tl-body">
                    <div className="gr-tl-top">
                      <span className="gr-tl-year">{m.from} <em>{"//"}</em> {m.to}</span>
                    </div>
                    <div className="gr-tl-main">
                      <h3 className="gr-tl-title">{m.title}</h3>
                      <p className="gr-tl-text">{m.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="gr-vnav gr-tl-nav">
              <button className="gr-vnav-btn" id="gr-tl-prev" type="button" aria-label="Etapa anterior" disabled={timeline.atStart} onClick={() => timeline.nudge(-1)}>
                <ChevronLeft />
              </button>
              <span className="gr-vnav-count" id="gr-tl-count" aria-live="polite">
                {Math.min(timeline.idx + 1, timeline.total || MILESTONES.length)} de {timeline.total || MILESTONES.length}
              </span>
              <button className="gr-vnav-btn" id="gr-tl-next" type="button" aria-label="Etapa siguiente" disabled={timeline.atEnd} onClick={() => timeline.nudge(1)}>
                <ChevronRight />
              </button>
            </div>
            <a className="gr-btn gr-btn--red gr-tl-more" href="https://toyota.com.co/deportivos-tgr/historia">
              <span>Conoce más</span>
            </a>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="gr-gallery" id="galeria">
          <div className="wrap is-10col">
            <header className="gr-head reveal">
              <span className="gr-eyebrow">Galería</span>
              <h2 className="gr-title">Forjado en pista</h2>
              <p className="gr-lead">Los GR en su terreno: ruta, pista y nieve.</p>
            </header>
            <div className="gr-gal-grid" id="gr-gallery-grid">
              {GALLERY.map((g, i) => (
                <button className="gr-gal-item reveal" type="button" data-cap={g.cap} key={g.src} onClick={() => openLightbox(i)}>
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                  <span className="gr-gal-cap">{g.cap}</span>
                </button>
              ))}
            </div>
            <p className="gr-disclaimer">*Imágenes de referencia</p>
          </div>
        </section>

        {/* BOUTIQUE */}
        <section className="gr-boutique" id="boutique">
          <img className="gr-bq-stripes" src="/assets/elements/gr-stripes.png" alt="" aria-hidden="true" loading="lazy" />
          <div className="wrap is-10col gr-bq-inner">
            <h2 className="gr-bq-title reveal">Boutique GR</h2>
            <p className="gr-bq-lead reveal" data-d="1">Llévate la marca contigo.</p>
            <div className="gr-bq-card reveal" data-d="2">
              <div className="gr-bq-shot">
                <img src="/assets/boutique/boutique-img.jpg" alt="Buzos oficiales GAZOO Racing Colombia" loading="lazy" decoding="async" />
              </div>
              <div className="gr-bq-detail">
                <img className="gr-bq-logo" src="/assets/icons/brand/gr-logo.png" alt="" aria-hidden="true" width={213} height={104} />
                <h3 className="gr-bq-name">Marketplace Colombia</h3>
                <p className="gr-bq-copy">Ropa y accesorios oficiales de GAZOO Racing Colombia, con despacho a todo el país.</p>
                <a className="gr-btn" href="https://www.toyota.com.co/deportivos-tgr/marketplace?type=boutique-gazoo-racing">
                  <span>
                    Ver la boutique
                    <ArrowRight />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SÍGUENOS */}
        <section className="gr-social">
          <div className="wrap">
            <div className="gr-social-panel reveal">
              <div className="gr-social-text">
                <span className="gr-eyebrow">Comunidad</span>
                <h2 className="gr-title">Síguenos</h2>
                <p className="gr-lead">
                  Lo que hace GAZOO Racing en Colombia, en tu teléfono. Sigue en Instagram todo lo que hace GAZOO Racing en Colombia.
                </p>
                <a className="gr-social-cta" href="https://www.instagram.com/toyotacolombia/" target="_blank" rel="noopener">
                  <span className="gr-social-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <span className="gr-social-net">@toyotacolombia</span>
                  <span className="gr-social-go" aria-hidden="true">
                    <ArrowRight strokeWidth={2.4} />
                  </span>
                </a>
              </div>
              <picture>
                <source media="(max-width:760px)" srcSet="/assets/siguenos/rav4-gr-sport-mobile.png" />
                <img className="gr-social-shot" src="/assets/siguenos/rav4-gr-sport.png" alt="" aria-hidden="true" loading="lazy" decoding="async" width={3060} height={990} />
              </picture>
            </div>
          </div>
        </section>

        {/* CIERRE */}
        <section className="gr-outro">
          <div className="wrap gr-outro-inner">
            <img className="gr-outro-logo reveal" src="/assets/icons/brand/gazoo-racing-lockup.svg" alt="GAZOO Racing" width={964} height={112} loading="lazy" />
            <p className="gr-outro-claim reveal" data-d="1">La competencia hace mejores a los autos. Y a las personas.</p>
          </div>
        </section>
      </main>

      {/* LIGHTBOX */}
      <div
        className="gr-lb"
        id="gr-lb"
        aria-hidden={!lbOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Visor de galería"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="gr-lb-backdrop" onClick={closeLightbox}></div>
        <div className="gr-lb-frame">
          <img
            className="gr-lb-img"
            id="gr-lb-img"
            src={lbOpen ? current.src : undefined}
            alt={lbOpen ? current.alt : ""}
            style={{ transition: "opacity .2s ease", opacity: fading ? 0 : 1 }}
          />
          <button className="gr-lb-close" id="gr-lb-close" type="button" ref={closeBtnRef} onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span>Cerrar</span>
          </button>
        </div>
        <button className="gr-lb-nav gr-lb-prev" id="gr-lb-prev" type="button" aria-label="Imagen anterior" onClick={() => moveLightbox(-1)}>
          <ChevronLeft />
        </button>
        <button className="gr-lb-nav gr-lb-next" id="gr-lb-next" type="button" aria-label="Imagen siguiente" onClick={() => moveLightbox(1)}>
          <ChevronRight />
        </button>
        <div className="gr-lb-cap">
          <span className="gr-lb-label" id="gr-lb-label">{lbOpen ? current.cap : ""}</span>
          <span className="gr-lb-count" id="gr-lb-count">{lbOpen ? `${(lbIndex as number) + 1} / ${GALLERY.length}` : ""}</span>
        </div>
      </div>
    </div>
  );
}

| Topbar propio con logo GR | **Header GR propio**: barra negra translúcida, lockup GAZOO Racing y solo los cuatro accesos que aplican |# GAZOO Racing — Landing (rediseño)

Adaptación a web (desktop + mobile) de la pantalla GR del kiosko/showroom virtual,
con el **header y el footer reales de toyota.com.co**.

Todo vive en **`home.html`** (HTML + CSS + JS en un solo archivo, como el kiosko).
Se abre con doble clic, no necesita servidor ni build.

---

## Qué cambió del kiosko a la web

| Kiosko | Web |
|---|---|
| Topbar propio con logo GR | **Header GR propio**: barra negra translúcida, lockup GAZOO Racing y solo los cuatro accesos que aplican |
| FAB flotante de "volver" | Navegación del sitio |
| **QR** en Boutique y Síguenos | **Enlaces directos** (marketplace / Instagram) |
| Historia antes que la gama | **GR Garage va primero**: los vehículos arriba y la historia después del póster |
| Medidas en `vw/vh` para 2160×3840 vertical | Escala recalculada — **cada sección entra completa en un viewport desktop** |
| Solo `:active` (táctil) | `:hover` + `:active` + foco visible por teclado |
| — | Reveal al hacer scroll, lightbox con teclado y swipe, `prefers-reduced-motion` |

Se respetaron las decisiones de diseño del kiosko: paleta GR, DecimaMonoPro de un
solo peso (`font-synthesis:none`), los dos rojos (`#FF0000` gráfico / `#DF001A`
para superficies con texto, que sí pasa AA), el póster de la cita, las cards de
vehículo y el bento de galería.

---

## Pendientes antes de publicar

1. **Los GIF del hero pesan 12 y 24 MB.** Funcionan, pero un MP4/WebM del mismo
   material queda en 1–2 MB y arranca antes. El `<picture>` ya elige por
   breakpoint (`Yaris-Gif-Cel.gif` en móvil, `Yaris-Gif-DeskF.gif` en desktop) y
   el póster pinta mientras tanto. Para cambiar a video: reemplazar el
   `<picture>` por un `<video autoplay muted loop playsinline>` con dos
   `<source>` y el mismo `poster`.
2. **Redes sociales.** Instagram y Facebook quedaron con las cuentas oficiales
   verificadas. YouTube, X y TikTok están en `href="#"` — el sitio de Toyota no las
   expone en su HTML. Buscar en `<!-- Instagram y Facebook son las cuentas... -->`.
3. **Legales del footer.** "Política de seguridad SGCS", "Términos y Condiciones",
   "Políticas y Privacidad", "Accesibilidad", "Opciones de Privacidad" y
   "Consentimiento de Cookies" están en `#`: en el sitio real abren modales, no URLs.
4. **RAV4 PHEV GR Sport — 306 CV.** Es la cifra global del PHEV; conviene
   confirmarla contra la ficha de Colombia.

---

## Editar contenido

- **Modelos GR** → array `GR_VEHICLES` en el `<script>` del final. Cada entrada
  lleva nombre, versión, foto, URL, 4 chips y descripción. Es el único lugar.
- **Línea de tiempo, galería, boutique** → están escritos directo en el HTML.
- **Menús del header** → los mega-menús del desktop son la única fuente: el panel
  móvil se genera solo a partir de ellos.

---

## Assets

```
assets/
  icons/brand/   lockups GAZOO Racing (.svg) + gr-logo.png
  icons/safety/  sellos de seguridad (sello-1…5.svg, en negro)
  icons/warranty/ sellos de garantía (5 años estándar · 8 años híbrido)
  banners/       fotos de banner de cada modelo + plantillas de composición (.svg)
                 dos variantes del lockup, por el fondo que llevan debajo:
                   -              letras blancas  → fondo oscuro (todo: header, hero, cierre, footer)
                   -red-bg        R de Racing en blanco → fondo rojo (póster)
  cutouts/       recortes de los 7 modelos (900px, con transparencia)
    originales/  los PNG de 1200px que subiste, intactos
  historia/      fotos de los hitos
  imgs/          galería — .jpg optimizados + los .png originales
  poster/        franja.jpg + carro.png (van superpuestos, no separar)
  siguenos/      rav4-gr-sport.png (3060×990) + rav4-gr-sport-mobile.png (690×458)
  outro/         pista-noche.jpg (1920×1033) + pista-noche-mobile.jpg (750×1000)
  elements/      franjas y galones GR
  fonts/         DecimaMonoPro + Toyota Type (del CDN de Toyota)
  toyota/        logo, menú, WhatsApp e íconos sociales
  video/         Yaris-Gif-Cel.gif (móvil) + Yaris-Gif-DeskF.gif (desktop)
                 + hero-poster.jpg (se pinta mientras baja el GIF)
```

**Peso:** el hero descarga el GIF que corresponda (24 MB en desktop, 12 en
móvil) — es lo más pesado de la página con diferencia. El resto del scroll suma
~4 MB.
Las fotos ya se optimizaron (eran ~11 MB); lo que queda son los recortes PNG,
que necesitan transparencia. En el build conviene generar **WebP/AVIF**
(`cwebp -q 82`) → bajan ~70% más. Los `.ttf` de las fuentes también
convienen en `.woff2` (~40% menos); el `@font-face` ya está listo para
agregar la línea.

---


## Header GR

**La réplica del header de toyota.com.co se reemplazó por una barra propia.** No
es el header de Toyota con cosas borradas: se rehízo entero, y con él se fueron
los cinco mega-menús, el acordeón del panel móvil y todo su CSS y su JS.

**El orden de los accesos es el de gazooracing.com.co:** Garaje GR · Historia ·
Alquila · Noticias · Cotizador · Concesionarios Toyota · WhatsApp, con el lockup
GAZOO Racing a la izquierda.

**Garaje GR es un ancla interna** (`#modelos`): esa sección vive en esta misma
página. Los demás enlaces salen del dominio, Historia incluida — apunta a
`toyota.com.co/deportivos-tgr/historia`, no a la sección de la landing.
`is-current` quedó en Garaje GR, que es por donde abre la página.

El bloque "Los inicios" sigue teniendo `id="historia"` y el CTA del hero
("Conoce la historia") sigue llevando ahí dentro de la página. Solo cambió a
dónde apunta la nav.

**Negro y translúcido.** `rgba(10,10,12,.72)` + `backdrop-filter:blur(16px)`:
sobre el hero se funde con el GIF y sobre las secciones blancas (galería,
Síguenos) se lee como una barra oscura deliberada. El desenfoque obliga a un
fondo semitransparente, así que hay un `@supports` con color sólido de respaldo
para los motores que no lo soporten.

La tipografía es DecimaMonoPro en versalitas con `letter-spacing:.16em`, como el
resto de la zona GR — el header ya no usa Toyota Type.

Dos gestos que lo enganchan con la marca:

- El **subrayado del enlace activo y del hover** es el paralelogramo GR:
  `skewX(-14deg)` con `scaleX` animado desde la izquierda, el mismo sesgo que
  los botones.
- **WhatsApp va en un botón circular** que al pasar por encima se tiñe del rojo
  de UI y sube 2 px. El SVG del icono viene en oscuro, así que lo aplana a
  blanco un `filter:brightness(0) invert(1)`.

⚠️ **El breakpoint al panel está en 1024 px.** Con seis enlaces más logo y
WhatsApp el header todavía *entra* a 900, pero ahí quedan **25 px** entre el logo
y el primer enlace y se ve apretado; a 1025 sobran 133. Por debajo pasa al panel
deslizante, también negro, con las filas en versalitas y un galón rojo al final
de cada una. Si se le quitan enlaces, se puede volver a bajar.

## Mega-menú de Garaje GR

Lo abre **todo el ítem**, texto y galón: "Garaje GR" es un `<button>`
(`#t-mega-btn`), no un enlace. Comparte la clase `.t-nav-link` con el resto de
la nav para que se vea igual. El galón de Alquila sigue siendo decorativo
(un `<i>` dentro del `<a>`).

⚠️ Al ser botón, "Garaje GR" ya **no** lleva a `#modelos`. La sección se sigue
alcanzando por el CTA del hero ("Ver modelos GR").

Cierra al volver a pulsar, al elegir un modelo, al hacer clic fuera y con
Escape. Cuelga del header sticky (`position:absolute; top:100%`), así que se
superpone al contenido en vez de empujarlo.

**El panel es blanco**, no negro como la barra: las fotos del catálogo vienen
sobre blanco, así que se funden con el fondo en vez de quedar como recuadros
recortados. La etiqueta **Novedad** lleva el paralelogramo de los botones GR
(`skewX(-14deg)` en la caja y contra-skew en el hijo, para que el texto no salga
inclinado).

⚠️ Con los siete modelos el panel mide **más que la ventana** en todos los
tamaños (1151 px a 1920×1080), así que se recorta a
`calc(100dvh - var(--header-h))` y scrollea por dentro. Sin eso la última card
quedaba cortada y fuera de alcance.

**De dónde salen los datos.** Los seis modelos, sus fotos y sus enlaces son los
del menú de gazooracing.com.co. Ese menú se llena en cliente desde una API
GraphQL pública cuya key viene en el propio HTML de la página:

```
POST https://ge2yikik75emfoovk6gq6dkewi.appsync-api.us-east-1.amazonaws.com/graphql
x-api-key: da2-ha2r4f6f2rddzegupiwaasohvi
query GetVehiclesHighlights → items { vehiclename vehicleimage detailurl
                                      cotizarurl isnovedad isheadervehicle }
```

Los campos usados: `vehiclename`, la etiqueta **Novedad** sale de `isnovedad`
(GR Yaris y RAV4 PHEV), y los dos enlaces de `detailurl` / `cotizarurl`. Las
fotos están **descargadas** en `assets/menu/`, no enlazadas al CDN de Toyota.

Son los **siete** que la API marca con `isheadervehicle:true`. Si algún día hay
que actualizar el menú, la consulta de arriba es la fuente.

El `max-height` de la foto no sobra: sin él, a 1920 crece con el ancho de la
columna y el panel se dispara.

**En móvil** el mismo menú vive dentro del hamburguesa: "Garaje GR" abre un
**sub-panel que entra deslizando desde la derecha**, igual que en la referencia,
con su cabecera propia (volver · título · cerrar) y los modelos apilados.

Las tarjetas **no están escritas dos veces**: el JS clona el `innerHTML` del
mega-menú dentro del sub-panel, así que los siete modelos se editan en un solo
sitio. Heredan las clases `.t-mega-*` y el CSS del sub-panel solo las apila y
las separa con filete.

⚠️ El sub-panel va `position:fixed` y no `absolute`: `.t-mobile` scrollea, y con
`absolute` se posicionaría contra el alto del contenido y se iría con el scroll.
Como `.t-mobile` lleva `transform`, el `fixed` se ancla a su caja —que es justo
lo que se quiere— y no al viewport.

⚠️ El sub-panel **rehace la familia tipográfica** a Toyota Type: el panel padre
impone DecimaMonoPro y los nombres de los modelos, que van en negrita, se
quedaban en el mono de un solo peso.

En la referencia el rótulo "Deportivos GR" lleva un galón de volver porque allá
hay varias categorías. Acá solo hay una, así que va como rótulo, sin control.

⚠️ El panel móvil **ya no se genera desde el desktop**: son los mismos siete
enlaces escritos directamente en el HTML. El JS del header quedó reducido a
abrir y cerrar el panel.

**El panel sigue la estructura del de gazooracing.com.co** —filas con filete,
utilidades agrupadas al final sin filetes, WhatsApp como icono— pero con la
tipografía de la casa: **DecimaMonoPro en versalitas**, a 18 px y `.12em` de
tracking, igual que la nav del desktop. Todas las filas van al mismo tamaño,
utilidades incluidas; lo que separa al grupo es que no lleva filetes, va en
blanco pleno y tiene aire propio arriba. WhatsApp va en el mismo botón circular
del header.
La página actual se marca con una barra roja en el canal izquierdo, absoluta
para no correr el texto respecto de las demás filas.

⚠️ **`font-synthesis:none` en `.t-mobile` es obligatorio.** La regla global vive
en `.gr` y el panel está FUERA de ese contenedor; sin ella, cualquier
`font-weight` alto haría que el navegador falsee una negrita sobre el único peso
de Decima y ensucie el trazo. Por lo mismo el grupo de utilidades **no usa
negrita**: la jerarquía la hacen el tamaño y el tracking.

El galón rojo va **solo en Garaje GR y Alquila**, las dos que lo llevan en la
referencia (allá porque abren submenú). Historia y Noticias van limpias. Están
en los dos sitios: en el panel al final de la fila (`.t-mobile-flat--sub`) y en
la nav del desktop, apuntando hacia abajo (`.t-nav-caret`).

⚠️ En desktop el galón va en un `<i>` propio y **no** en un `::after` del
enlace: ese pseudo ya lo ocupa el subrayado sesgado de hover y activo.

⚠️ `.t-mobile a{text-decoration:none}` es obligatorio: el panel es **hermano**
de `<header>`, no hijo, así que no le llega el `.t-header a{...}` y los enlaces
salían subrayados.

`--header-h` subió de 60 a 64 px. Lo consume el alto del hero
(`calc(92dvh - var(--header-h))`) y el `scroll-margin-top` de los anclajes.

## Footer GR

**También se rehízo entero**, igual que el header, y es negro por lo mismo:
cerrar la página con la misma marca. Va separado del bloque de cierre —que
también es negro— por la línea de 1 px de arriba, no por el color.

**El contenido es el de gazooracing.com.co; la estructura es la nuestra.** Los
bloques van así:

1. el logo a la izquierda y **las cuatro columnas pegadas a la derecha**
2. **los siete legales en UNA sola fila** —Política de seguridad SGCS ·
   Términos y Condiciones · Políticas y Privacidad · PQR · Accesibilidad ·
   Opciones de Privacidad · Consentimiento de Cookies— con Instagram a la
   derecha
3. el copyright, cerrando

Los tres de accesibilidad / privacidad / cookies tuvieron su propia banda al
pie, con su filete. Quedaban solos ahí abajo: son de la misma familia que los
otros cuatro, así que se juntaron en una fila y desaparecieron el bloque
huérfano y su divisoria. Queda **una sola línea divisoria** en el footer.

La divisoria va en el div interno y no en el `.wrap`: el wrap tiene
`padding-inline`, así que un borde puesto sobre él se dibuja sobre su caja
exterior y sobresale 40 px por cada lado de las columnas.

**Las dos filas de abajo tienen jerarquía distinta**, porque en gris plano se
leían como un muro de letra chica: los legales a 12,5 px y
`rgba(255,255,255,.68)` (son enlaces), el copyright a 11,5 y `.34`.

Los elementos van separados por un **punto medio** en vez de por espacios
sueltos. El punto es un `::after` del elemento anterior —no un `::before` del
siguiente— para que al partirse la fila cierre línea en vez de abrirla, y lleva
color propio para que el `:hover` del enlace no se lo lleve por herencia.

⚠️ Las filas son `flex` **sin column-gap**, a propósito: flex ignora los nodos
de espacio en blanco del HTML, que si no se sumaban al separador y descuadraban
las distancias. Todo el aire lo dan los márgenes del punto.

⚠️ `.t-footer-mid` va con **`flex-wrap:nowrap`** en desktop: con `wrap`, el flex
corta línea ANTES de encoger, así que en cuanto los siete legales no cabían de
una, Instagram se iba a una línea suelta. Sin wrap, los enlaces se encogen y
parten dentro de su caja y el icono se queda arriba a la derecha. Por debajo de
1024 vuelve a `wrap`, que apilado sí conviene que baje.

⚠️ Por debajo de 1024 los puntos se apagan (`content:none`) y el aire pasa a un
`column-gap`: ahí las filas se parten en varias líneas y el punto quedaba
colgando al final.

En móvil `.t-footer-mid` se apila en columna y **Instagram sube antes de los
legales** (`order:-1`): colgando debajo de tres líneas de letra chica quedaba
perdido.

⚠️ **La divisoria cambia de sitio en móvil.** Ahí las columnas son acordeón y
su última fila ya cierra con un `border-bottom`, así que el `border-top` de
`.t-footer-mid` dejaba dos filetes casi pegados. En móvil ese borde se anula y
la línea pasa a `.t-footer-legal`, entre los legales y el copyright:

| | divisoria |
|---|---|
| desktop | encima de `.t-footer-mid` (legales + Instagram) |
| ≤1024 | encima de `.t-footer-legal` (copyright) |

Instagram va en el **mismo botón circular que el WhatsApp del header** —suelto
en la esquina se leía como un glifo perdido— y al pasar por encima se tiñe del
rojo de UI, igual que aquel.

La referencia los ordena distinto —utilidades y redes arriba del todo, y el
logo debajo de las columnas— pero esa disposición se probó y no gustó.

**Las columnas van a ancho de contenido, no en reja de anchos iguales.** Así la
última (Contáctanos) **cierra exactamente sobre el borde derecho**, donde
terminan el divider y el icono de Instagram, en vez de dejar un sobrante a su
derecha. De paso los enlaces largos dejan de partirse en dos líneas.

⚠️ `.t-footer-cols{margin-left:auto}` no es redundante con el
`justify-content:space-between` del padre: cuando el grupo no cabe junto al logo
y baja a una segunda línea, el space-between lo dejaría pegado a la izquierda y
la última columna perdería el borde. Con el margen auto se mantiene a la derecha
en los dos casos. Verificado a 1920 / 1600 / 1440 / 1280 / 1200 / 1100 / 1025.

⚠️ **El footer se apila a 1024 px**, no a 900 como antes: entre 900 y 1024 las
cuatro columnas no caben en una línea, se partían entre ellas y quedaba sucio.
Coincide con el corte del header.

**Cuatro columnas, las de la referencia:** Vehículos · Acerca de GR · Enlaces
Útiles · Contáctanos. La de Vehículos lleva un solo enlace, "Toyota", que apunta
al cotizador — así está en gazooracing.com.co; no es un placeholder a medias.
El título de la segunda pasó de "Acerca de Toyota" a **"Acerca de GR"**, que es
como se llama allá.

**En redes va solo Instagram**, también como la referencia. Los PNG de Facebook,
YouTube, X y TikTok siguen en `assets/toyota/` por si vuelven.

**Todo el footer vive entre la columna 2 y la 11** (`.wrap.is-10col`), igual que
Los inicios, GR Garage, la galería y Boutique. A 1920 eso es 195→1725, el mismo
ancho exacto que el panel de Síguenos.

⚠️ La línea divisoria de los legales va en un div **dentro** del `.wrap`, no en
el `.wrap` mismo: como el wrap lleva su `padding-inline`, una regla puesta sobre
él se dibuja sobre su caja de borde y sobresalía 40 px por cada lado de las
columnas. Por eso `.t-footer-mid` es hijo.

⚠️ `.t-footer-cols{display:contents}` disuelve el contenedor para que las tres
listas sean ítems del grid. En móvil vuelve a ser una caja real
(`display:grid`), porque ahí lleva su propio borde y se apila.

Los enlaces conservan **Toyota Type**: son textos largos y legales, y
DecimaMonoPro a ese tamaño se lee peor. Las versalitas GR quedan para los
títulos de columna y para los botones del acordeón.

Los PNG de redes vienen en negro, así que los aplana a blanco el mismo
`filter:brightness(0) invert(1)` que usa el icono de WhatsApp del header.

El lockup del footer ya no necesita la variante `-light-bg` —sobre negro va el
normal, el de letras blancas—, así que ese archivo se borró: quedaba sin uso.

🐛 **Arreglado de paso:** el acordeón del footer en móvil **no abría**. La regla
usaba hermano adyacente (`+`) entre el botón y el cuerpo, pero entre los dos
está el `<span>` del título, que en móvil va oculto pero sigue en el DOM. Ahora
usa hermano general (`~`). Venía roto desde la réplica original.

⚠️ Al medir acordeones en headless pasa lo mismo que con `scroll-behavior`:
`transition:grid-template-rows` no avanza bajo `--virtual-time-budget` y la
altura se queda en 0, como si no abriera. Hay que anular la transición antes de
simular el clic.

## El botón de Los inicios

Cambia de sitio según el ancho:

| | dónde |
|---|---|
| desktop | a la derecha del texto, a ras del borde derecho del contenido (el mismo de la última card) |
| ≤760 | debajo de los botones del carrusel, centrado y a 3 columnas |

**En el DOM va al final de la sección**, que es su sitio en móvil; en desktop el
`.wrap` se vuelve grid y lo sube a la fila del encabezado (`grid-area:1 / 2`).
Se hace así y no con dos botones duplicados ni con `order`, que solo funciona
entre hermanos —y el encabezado es otro padre.

Su `margin-bottom` en desktop es el mismo que el de `.gr-head`, para que las dos
cajas terminen a la misma altura y el botón asiente sobre la línea base de la
bajada en vez de flotar arriba.

⚠️ La regla de móvil va con **doble clase** (`.gr-btn.gr-tl-more`):
`.gr-btn{display:inline-flex}` está definido más abajo en la hoja y con una sola
clase le ganaba por orden. Y en `inline-flex` los márgenes `auto` valen 0, así
que el botón no se centraba — se quedaba pegado a la izquierda.

Usa la variante roja (`.gr-btn--red`), que ya existía. Va en `--gr-red-ui`
(#DF001A) y no en `--gr-red` (#FF0000): lleva texto blanco encima, y ese es el
rojo que pasa AA. En móvil el encabezado hace wrap y el botón baja debajo del
texto.

ℹ️ El borde del paralelogramo sobresale ~7 px por arriba y se mete ~7 px por
abajo respecto de la caja: es el `skewX(-14deg)` de todos los botones GR. La
caja de maquetación sí queda a ras del borde.

## Alturas de sección

Calibradas para entrar en la ventana de un desktop. A 1440×900 el viewport real
del navegador es 813 px y bajo el header sticky de Toyota quedan **753 px
útiles**; a 1920×1080, unos **1020**. Las ocho entran en los dos casos:

| Sección | 1440 | 1920 |
|---|---|---|
| Hero | 688 (91% del viewport) | 688 |
| GR Garage | 515 | 668 |
| Póster | 741 | 844 |
| Los inicios | 583 | 749 |
| Galería | 744 | 902 |
| Boutique | 630 | 819 |
| Síguenos | 525 | 700 |
| Cierre | 510 | 680 |

**La proporción de las cards de historia cambia por breakpoint.** El alto sale
del ancho (`aspect-ratio`) y el ancho cambia muchísimo según cuántas cards
quepan, así que una sola proporción no sirve para los tres casos:

| | cards a la vista | proporción | a 1440 / 900 / 390 |
|---|---|---|---|
| base | 4 | `5/6` | 271×325 |
| ≤1100 | 2 | `4/3` | 333×250 |
| ≤760 | 1 | `5/6` | 360×432 |

Si se cambia una, hay que revisar que el texto siga cabiendo: el `.gr-tl-body`
va con `height:100%` y el bloque de título+bajada anclado abajo con
`margin-top:auto`, así que un desborde no empuja la card — la recorta.

El hero ocupa **92dvh menos el header**: llena casi toda la ventana y deja
asomar la sección siguiente, como el hero de gazooracing.com.

Palancas para reajustar: `--sec-y` (aire vertical de todas las secciones),
`.gr-head{margin-bottom}`, `.gr-gal-grid{grid-auto-rows}` y
`.gr-poster-stage{max-width}`.

## Cards de vehículo — por qué están así

Cuatro reglas que no conviene tocar sin volver a medir:

1. **El bloque va a dos columnas** (`.gr-models`): encabezado y navegación a la
   izquierda, carrusel a la derecha. Por debajo de 1360 px se apila.
2. **La card escala con container queries, no con el viewport.**
   `.gr-vcard{container-type:inline-size}` y todo lo de adentro en `cqi`
   (1cqi = 1% del ancho de la card). Así la card se achica como una pieza en vez
   de mantener texto de tamaño fijo dentro de una caja que encoge — que es lo
   que reventaba los chips. Los `clamp()` ponen el piso de legibilidad.
3. **Foto en 7/5.** Los recortes van de 1,23 (Fortuner) a 1,43 (Corolla Cross),
   con media ~1,36. A 7/5 el recorte de `cover` cae sobre el margen transparente.
   En 16/9 los autos se cortan feo.
4. **La altura del chip la manda el ícono, no el texto.** `--chip-h` se calcula
   con `1.35em` (el tamaño del SVG) y se aplica también al propio chip. Si se
   calcula sobre el texto, la reserva de dos filas queda corta y la card que sí
   usa dos filas se estira → los nombres dejan de alinearse.

Verificado a 1600 / 1440 / 1370 / 1350 / 1200 / 1024 / 900 / 760 / 620: en todos
los chips caen en **2 filas**, los nombres alinean y las siete cards miden igual.

Los cutouts que hay son **primeros planos frontales**, no el vehículo completo:
la parte trasera ya viene cortada en el archivo. Si el cliente puede entregar
recortes del auto entero, las cards ganan bastante.

## Escala tipográfica

Tres topes, verificados sobre el tamaño **renderizado** (no el declarado) a
1920 y 1440 px:

| Tier | Tope | Dónde |
|---|---|---|
| Títulos | **56 px** | `.gr-bq-title` (56) · `.gr-poster-quote p` (50) · `.gr-title` (44) |
| Subtítulos | **32 px** | `.gr-outro-claim` · `.gr-bq-name` · `.gr-tl-title` (30) · `.gr-social-net` (28) · `.gr-hero-sub` (27) · `.gr-vcard-name` (24) |
| Resto | **24 px** | bajadas, chips, botones, pies, meta |

Todo se declara con `clamp(min, vw, max)`, así que el tope solo entra en juego
en pantallas anchas — que es donde se disparaba. El texto más grande de la
página es ahora "BOUTIQUE GR" a 56 px exactos.

Ojo al tocar: las cards de vehículo no usan `vw` sino `cqi` (ver arriba), así
que sus topes están en los `clamp()` de `.gr-vcard-*`.

## El alto del hero y el GIF

El hero está en `clamp(460px, calc(92dvh - var(--header-h)), 860px)`.

**Por qué 92 y no 100.** El GIF de desktop es 1920×630 (3,05:1), un encuadre de
banner ancho. A 100dvh el navegador tiene que agrandarlo **1,33×** y recortarle
44% de ancho: se ablanda y se nota. A 92dvh el aumento es de **1,09×** y se
mantiene nítido, además de dejar asomar la sección siguiente.

**Si quieren el 100% exacto**, hay que reexportar el GIF (o mejor, un MP4) en
**1920×1080**. Con eso el hero llena la ventana sin escalar nada y se cambia
una línea:

```css
min-height:clamp(460px,calc(100dvh - var(--header-h)),1000px);
```

El de móvil (375×595) está a 1x: en un teléfono retina se ve blando aunque el
alto sea correcto. Lo ideal sería 1125×1785 (3x).

`dvh` y no `vh`: en móvil `vh` cuenta la barra del navegador y deja el hero más
alto que lo que se ve. La línea con `vh` queda antes como respaldo para
navegadores viejos.

## Dos detalles finos

- **La bajada del bloque GR Garage** va un punto más chica que las del resto
  (`.gr-models-head .gr-lead`, 14 px contra 17). Vive en una columna angosta,
  así que al tamaño general se partía en cuatro líneas.
- **El badge GR de la card de boutique** lleva un `drop-shadow` blanco casi
  imperceptible. La mitad izquierda del lockup es negra y la card también, así
  que sin ese contorno el logo se partía al medio. Es preferible a meterle una
  caja de fondo, que ensuciaría la composición.

## Grid desktop (≥761 px)

**12 columnas · margen 40 · gutter 20**, sobre un artboard de 1920. Los números
cierran exactos:

```
columna = (1920 − 2·40 − 11·20) / 12 = 135 px
```

Los tokens viven en `:root`:

```css
--wrap:1920px;   /* ancho EXTERIOR: con box-sizing:border-box se lleva
                    adentro los dos márgenes, el ancho útil son 1840 */
--pad-x:40px;
--gutter:20px;
--col:calc((min(100vw, 1920px) - 2 * 40px - 11 * 20px) / 12);
```

Encima de 1920 el contenido no crece: se queda en 1840 y solo sobra margen.
Por debajo, las columnas se encogen y todo escala; a 1440 la columna mide 95.

`--col` se calcula con `100vw` y no con porcentajes **a propósito**: un `100%`
se resolvería contra el contenedor de turno, así que adentro de una card daría
cualquier cosa. Así se puede usar a cualquier profundidad del DOM.

Anchos por columnas que ya usa la página:

| Elemento | Columnas | A 1920 | A 1440 |
|---|---|---|---|
| `.wrap` (hero, póster, cierre) | 12 | 1840 | 1360 |
| Los inicios · GR Garage · Galería · Boutique | 10 (col 2-11) | 1530 | 1130 |
| Panel de Síguenos | 10 (col 2-11) | 1530 | 1130 |
| Logo del cierre | 4, desde col 2 | 600 | 440 |
| Pie del póster | = ancho de la foto | 1000 | 1000 |

Los cuatro bloques de en medio van a 10 columnas con `.wrap.is-10col`, que
sube el `max-width` para dejar una columna de aire a cada lado. En móvil se
desactiva solo: con la columna del grid de 4 el cálculo da más que el viewport,
no llega a limitar, y manda el `width:100%`.

**El escenario del póster queda fuera del grid a propósito** (`max-width:1000px`
fijo): su alto sale del ancho del recorte del vehículo, y a 1256 medía 522 px y
la sección dejaba de entrar en un viewport de 900. El pie (línea, logo y
galones) usa el mismo token `--poster-w`, así que siempre mide lo mismo que la
foto.

⚠️ **`.wrap` lleva `width:100%`** y no es decorativo: cuando su padre es flex o
grid, `.wrap` pasa a ser ítem, y con `margin-inline:auto` se ajustaría al ancho
de su contenido en vez de ocupar el ancho completo — dejando de marcar los
márgenes del grid. Pasó exactamente eso en Síguenos y en el Cierre, y el
resultado daba bien por casualidad en un ancho y mal en todos los demás.
Por lo mismo esas dos secciones son `display:grid` y no `display:flex`.

## Los dos bloques del final

**Síguenos** (`.gr-social`): fondo blanco, 700 px de alto a 1920
(`min-height:clamp(430px,36.46vw,700px)` — 700/1920 = 36.46%). El panel negro
mide 1530×495 justos: `aspect-ratio:1530/495` sobre 10 columnas.

El panel es `container-type:inline-size` y todo su interior está en `cqi`, así
que escala como una sola pieza. Por debajo de ~1250 la proporción daría un
panel más bajo que su propio texto; ahí entra el `min-height` y el panel se va
volviendo más cuadrado en vez de recortar.

La foto va en un `<picture>` con dos versiones: `rav4-gr-sport.png` (3060×990)
en desktop y `rav4-gr-sport-mobile.png` (690×458) por debajo de 760. Las dos
traen **la proporción exacta de su contenedor** — 1530×495 al doble, y 3/2 —
así que llenan el panel sin recortar nada. Va detrás del texto porque
`.gr-social-text` lleva `z-index:2`.

⚠️ `.gr-social-panel picture{display:contents}` es obligatorio: sin eso, en
móvil el ítem del flex sería el `<picture>` y el `width:100%` del `<img>` se
resolvería contra una caja que no ocupa el ancho.

**Cierre** (`.gr-outro`): logo y frase alineados a la izquierda **desde la
columna 2** (`padding-left:calc(var(--pad-x) + var(--col) + var(--gutter))` =
195 px a 1920, solo en desktop), sobre
`assets/outro/pista-noche.jpg`. El degradado negro de izquierda a derecha va
por encima de la foto para que el texto tenga contraste; debajo de la foto
quedan el resplandor rojo y el negro, así que si algún día falta el archivo la
sección se sigue viendo bien en vez de romperse.

## Grid móvil (≤760 px)

**4 columnas · margen 15 · gutter 20.** Los tokens viven en un `@media` sobre
`:root`, arriba del todo del CSS:

```css
--pad-x:15px;                                    /* margen del grid */
--gutter:20px;
--col:calc((100vw - 2 * 15px - 3 * 20px) / 4);   /* = 75px a 390 */
--card-4col:calc(4 * var(--col) + 3 * var(--gutter));  /* = 360px */
```

A 390 px las columnas caen en:

| | col1 | col2 | col3 | col4 |
|---|---|---|---|---|
| de | 15 | 110 | 205 | 300 |
| a | 90 | 185 | 280 | 375 |

`--pad-x` pasa a 15 px, así que **todo lo que vive dentro de `.wrap`** —
títulos, bajadas, botones, bandas, galería— arranca sobre col1 y termina sobre
col4 sin cálculos extra. Verificado elemento por elemento: los 20 bloques
visibles caen sobre borde de columna.

**Las cards de los carruseles** (historia y vehículos) miden `--card-4col`: las
4 columnas completas más los 3 gutters de adentro. Ocupan el ancho útil entero,
así que **se ve una sola card, sin asomo de la siguiente**; se pasa con los
botones que van debajo de las cards (`‹ 1 de 4 ›`).

La navegación de los dos carruseles la maneja la misma función `grCarousel()`
en el JS, llamada dos veces:

```js
grCarousel('gr-vehicles', 'gr-veh-prev', 'gr-veh-next', 'gr-veh-count');
grCarousel('gr-timeline', 'gr-tl-prev',  'gr-tl-next',  'gr-tl-count');
```

⚠️ La navegación de la historia se esconde en desktop con
`.gr-vnav.gr-tl-nav{display:none}` — **con las dos clases a propósito**: el
`.gr-vnav` que está más abajo en el CSS trae `display:flex` y con una sola clase
le ganaría por orden, dejando los botones visibles sobre la reja de desktop.

Los dos carruseles llevan `scroll-behavior:smooth` en el contenedor: es lo que
hace que los botones deslicen en vez de saltar. El de la historia no lo tenía y
se notaba la diferencia contra el de GR Garage.

⚠️ **El de la historia va con `overflow:hidden` en los DOS ejes** (más
`touch-action:pan-y` de refuerzo); el de GR Garage sigue en `auto`. Así el
usuario no lo puede desplazar por ningún medio, pero **sigue siendo contenedor
de scroll**, así que `scrollLeft` por código (los botones) funciona igual, con
su `smooth` y su `snap`.

Hacían falta los dos ejes por motivos distintos:

- **Horizontal:** al bajar por la página con el puntero encima, la componente
  horizontal del gesto lo movía y el snap reacomodaba las cards.
  `touch-action:pan-y` por sí solo no alcanza — solo gobierna el táctil, no la
  rueda ni el trackpad.
- **Vertical:** `.reveal` deja las cards con `translateY(26px)` hasta que
  aparecen, y esos 26 px son overflow: volvían el contenedor desplazable a lo
  alto. Al moverlo, el `scrollTop` se quedaba ahí y la card terminaba recortada
  por arriba, comiéndose el año. El de GR Garage no lo sufre porque sus cards
  las pinta el JS sin `.reveal`.

El precio es que esa línea de tiempo ya no se pasa con el dedo, solo con los
botones. Si se quiere lo mismo en GR Garage, son esas dos líneas en `.gr-vgrid`.

Los hover que mueven imagen (`.gr-tl-card:hover .gr-tl-photo`) van dentro de
`@media (hover:hover)`: en táctil el navegador deja el `:hover` pegado al tocar,
así que el zoom se disparaba al apoyar el dedo para hacer scroll y la card
parecía moverse. **Los demás hover de la página siguen sin esa protección** —
galería, boutique y cards de vehículo hacen zoom y se quedan así tras un toque.

Ojo al medir en headless: `scroll-behavior:smooth` no avanza bajo
`--virtual-time-budget`, así que los botones parecen no funcionar. Hay que
anular `scrollBehavior` en el elemento antes de simular el clic.

⚠️ **`scroll-padding-inline` es obligatorio** en los dos carruseles. Van a
sangre con `margin-inline:-15px` + `padding-inline:15px`; sin el
`scroll-padding-inline`, el scroll-snap alinea la primera card con el borde del
contenedor en vez de con el del contenido, y el carrusel se desplaza esos 15 px
solo — sacando la card de col1. Cuesta verlo a ojo: se detecta midiendo.

## Otros detalles de móvil

- **Hero:** los dos CTA van apilados y miden 3 de las 4 columnas (265 px a 390),
  centrados. El indicador "Desliza" con la flecha animada se muestra también acá.
- **Galería:** con `gap:var(--gutter)` cada pieza mide 2 columnas exactas
  (170 px) y la grande, las 4.
- **Historia:** la reja de 4 columnas del desktop pasa a carrusel, con su propia
  nav (`.gr-tl-nav`) debajo de las cards. La nav va después del `</ol>` en el
  DOM, que ya es el orden de móvil; en desktop simplemente se esconde.
- **Póster:** el bloque (franja + recorte del vehículo + pie) va **dentro** de
  los canales, no a sangre: L15 / R375 a 390 px, las 4 columnas justas. Solo el
  fondo rojo de la sección llega a los bordes. Lleva más padding vertical que en
  desktop porque, apilado, el recorte del vehículo es chico y la banda roja
  quedaba apretada contra las secciones vecinas.
- **GR Garage:** los botones del carrusel van **debajo** de las cards. Por eso
  el `.gr-vnav` es hermano del `<header>` y no hijo — el orden del DOM
  (encabezado → cards → nav) ya es el de móvil, y en desktop el grid lo reubica
  a la fila 2 de la columna izquierda.
- **Boutique:** apilada, la card negra va **centrada** y con `padding:var(--gutter)`
  (20) para que el contenido no se pegue al borde. Lleva
  `.gr-bq-detail{padding-right:0}`: ese padding-right solo hace falta en la
  versión de dos columnas y acá rompía el centrado (20 a la derecha, 14 a la
  izquierda).
- **Síguenos:** apilado, el panel mide **345×430** — la medida del diseño sobre
  un artboard de 375 (los 345 son las 4 columnas, o sea 375 menos los dos
  márgenes de 15; el alto lo fija `aspect-ratio:345/430`). El texto va arriba y
  la foto llena lo de abajo, a sangre contra los bordes del panel, con las
  esquinas recortadas por su `border-radius` — el padding vive en el texto, no
  en el panel.

  El ritmo interior va **en píxeles fijos** y no en `cqi` como en desktop: el
  contenedor de consulta mide 345, así que 1cqi = 3,45 px y todos los valores
  fluidos se quedaban clavados en el suelo de su `clamp` — el texto salía
  pegado a los bordes y entre sí. Padding 26/24 y la bajada a 12 px.

  ⚠️ La bajada **tiene que entrar en 3 líneas**. La fuente es monoespaciada, y
  con 13 px dentro de estos 297 px de ancho se parte en 4: esos 19,5 px extra
  salen del alto de la foto, que ya va justa. Si se alarga el copy, revisar.

  La foto lleva `flex:1 1 0` en vez de una proporción propia: se queda con el
  alto que sobre después del texto. Así el panel respeta sus 430 aunque cambie
  el copy, en vez de que el sobrante se recorte contra el `overflow:hidden`.
  A 375 el texto pide 230 y la foto natural 229: no caben los dos en 430, así
  que la foto se recorta un 13% (a 390 son 8%, y de 430 para arriba, nada).
  El `max-height:560px` es solo para tablet: la proporción sola daría 910 de
  alto a 760 de ancho. Ningún teléfono lo toca (a 430 el panel mide 499).
- **Cierre:** **500 px de alto** a 375 (`clamp(460px,133.33vw,560px)`). En
  móvil el contenido va **centrado**, no a la izquierda. El velo y el encuadre
  de la foto están en variables (`--outro-scrim`,
  `--outro-focus`) porque cambian de eje: horizontal en desktop (texto a la
  izquierda, foto a la derecha) y vertical en móvil, suave arriba para que los
  autos se lean y cerrado abajo, que es donde cae el texto. El foco va a `62%`
  y no a `center` porque los autos viven en la mitad derecha del encuadre. El
  lockup baja a `min(78%,300px)`: a 4 columnas ocupaba el ancho entero.

  La foto móvil (`pista-noche-mobile.jpg`, 750×1000) va como capa **encima** de
  la de desktop en el mismo `background`: si el archivo no está, esa capa no
  pinta y se ve la de desktop, sin romperse. Como ya viene virada y oscurecida
  de origen, el velo móvil es mucho más suave que el de desktop — arranca en 0
  y solo cierra en la mitad de abajo, donde cae el texto.

  ⚠️ El `@media` del cierre va **después** de `.gr-outro-logo` y
  `.gr-outro-claim`, no antes: con la misma especificidad manda el orden, y
  puesto arriba las reglas base se lo comían.

⚠️ **Cuidado con `align-items` en el bloque de modelos.** La regla base de
`.gr-models` (grid, desktop) lleva `align-items:start`. En móvil el bloque pasa
a `display:flex; flex-direction:column`, y ahí `align-items` gobierna el eje
**transversal** (el horizontal): sin resetearlo a `stretch`, el carrusel se
encoge a su contenido y la nav se va a la izquierda. Lo mismo con el
`align-self:start` de la nav. Ambos están reseteados en el media query.

---

## Landing interna de vehículo — `interna-general.html`

Plantilla para las fichas de cada modelo, armada sobre el **GR Yaris**. El
contenido sigue el de `gazooracing.com.co/vehiculos/deportivos-tgr/yaris-gr`
(mismas secciones y en el mismo orden); el diseño es el del Home.

Es **autónoma, igual que el Home**: header, footer, botones, chips, cards,
bento de galería y lightbox están copiados tal cual de `home.html`.
Si se cambian allá, hay que cambiarlos acá. Lo nuevo va prefijado **`.gv-`**.

**Secciones, en orden:**

| # | Sección | Fondo | Equivale en gazooracing.com.co a |
|---|---|---|---|
| 1 | Banner — foto del modelo + nombre, precio, legales y sellos (sin botones) | foto | Cabecera con precio, CTA e íconos de seguridad |
| 2 | Sub-nav fija con scrollspy + Cotizar — **aparece al hacer scroll**, no en el primer pantallazo | negro | (no existe) |
| 3 | Presentación — "El ADN de un campeón de Rally", centrada, sección propia | negro | Texto de presentación |
| 4 | Selecciona un color — escenario + muestras + precio | negro con resplandor | Visor 360 y "Selecciona un color" |
| 5 | Galería — pestañas Exterior / Interior | blanco | Galería de imágenes |
| 6 | Razones para tener un GR Yaris — slider, 2 piezas por vista (1 en móvil) | negro | Diferenciales |
| 7 | Encuentra tu versión — card horizontal | negro | Encuentra tu versión |
| 8 | Materiales descargables + Legales | blanco | Materiales descargables · Legales |
| 9 | Garantía 5 años / 120.000 km | rojo | Beneficios de tener un Toyota |

En móvil aparece además una **barra fija abajo** (Test drive · Cotizar) cuando el
hero sale de pantalla: ahí la sub-nav no lleva el botón de cotizar.

### Una sola landing por vehículo

Ya no hay landing de versión: `interna-general.html` es la única interna del
vehículo. La sección **"Especificaciones generales"** muestra una card por
versión (carrusel con flechas si hay más de una) con 8 datos en dos columnas
(motor, caballos de fuerza, torque, transmisión, drivetrain, puertas,
pasajeros, suspensión), precio, "Modelo 2027" y los botones **Cotizar** (rojo)
y **Descargar ficha técnica**. Los datos van en `MODEL.versions[].specs`.

### El banner

**Una foto completa por tamaño** (auto con su escenario), con el **auto
centrado**. El auto **nunca se recorta**:

| ancho de pantalla | foto | texto |
|---|---|---|
| desktop (≥1280) | `assets/banners/<slug>-banner-desktop.webp` · **3840 × 1190** (≈3,23:1) | encima de la foto, en sus zonas |
| tablet (761–1279) | la misma de desktop, completa | debajo de la foto, sobre negro |
| móvil (≤760) | `assets/banners/<slug>-banner-mobile.jpg` · **1000 × 667** (3:2) | banner vertical a pantalla completa: foto arriba y toda la info junta abajo (nombre, precio, sellos, legales) |

**En desktop el banner ocupa el alto de la pantalla** (menos header y
sub-nav), como el hero del Home, sin que la foto pierda el auto:

- La foto va **completa y apoyada abajo**, y crece con el alto disponible hasta
  el **125 % del ancho**: como mucho recorta un 10 % por lado, que en la
  plantilla es el área de respeto (solo fondo).
- Lo que sobra **arriba** lo llena la **misma foto**: solo su franja superior
  (el 1/6 de arriba, fondo puro por encima del techo del auto), estirada y
  desenfocada. El borde de la foto se funde con una máscara. Misma URL, no
  descarga nada más. ⚠️ Por eso la foto tiene que traer fondo limpio en su
  sexto superior.
- El texto encima arranca en 1280; por debajo la foto va completa arriba y el
  texto debajo.

**Cómo componer la foto de desktop** — plantilla
[`assets/banners/plantilla-banner-desktop.svg`](assets/banners/plantilla-banner-desktop.svg)
(coordenadas a 1920 × 595, la mitad del archivo):

| zona | dónde | qué va |
|---|---|---|
| Área de respeto | 195 px por lado (390 en el archivo) | solo fondo |
| Zona segura del vehículo | el tercio central: x 30–70 % · y 9–84 % | **el auto completo y centrado** |
| Nombre | abajo a la izquierda, columnas 1–3 | hasta 3 líneas, fondo oscuro |
| Precio | abajo a la derecha, columnas 10–12 | fondo oscuro |
| Legales y sellos | franja inferior, a todo el ancho | legales a la izquierda, sellos a la derecha |

Para móvil, [`plantilla-banner-mobile.svg`](assets/banners/plantilla-banner-mobile.svg):
el auto completo dentro de un margen del 6 % por lado (el texto va debajo).

Las zonas también se ven sobre la página con **`?guias`** en la URL
(`interna-general.html?guias`).

El nombre está medido contra el más largo de la gama, "Land Cruiser 300 GR-S
HEV": a 1280 entra en dos líneas sin tocar el auto. Legales: "*Precio sugerido al
público. *Imágenes de referencia." (`MODEL.legal`). Sellos: `MODEL.seals`
(`{ src, alt }`), hoy los cinco de `assets/icons/safety/`. Vienen en negro (para
fondo claro): en el banner se aplanan a blanco por CSS. Vacío = huecos
punteados.

**GR Yaris:** la foto de desktop es la que subió el equipo
(`gr-yaris-banner-desktop.webp`). La de móvil es un recorte 3:2 de esa misma,
centrado en el auto; si hay una versión móvil propia, reemplazarla.

### Para hacer la landing de otro modelo

1. Duplicar `interna-general.html` (p. ej. `corolla-gr-s.html`).
2. Cambiar el **objeto `MODEL`** del `<script>`: precio, enlaces, cifras,
   colores, galería, diferenciales, versiones, ficha y documentos. Todo se
   pinta desde ahí.
3. Cambiar a mano lo que está en el HTML: `<title>`, miga de pan, nombre del
   banner y las dos fotos del banner (desktop y móvil).
4. En el mega-menú, apuntar el "Ver detalles" del modelo a su archivo.

### Contenido del GR Yaris

El contenido es el de `gazooracing.com.co/vehiculos/deportivos-tgr/yaris-gr`,
revisado el **15/10/2026** (la página carga sus datos por JavaScript; se leyó
renderizada en Chrome): precio **$218.900.000** (modelo 2027, vigente del
01/10 al 31/10/2026), presentación "El ADN de un campeón de Rally", **3
colores**, galería (11 exterior + 6 interior), los **5 diferenciales** con su
foto, la versión **GR Yaris MT**, los tres PDF y la garantía. Las fotos están
**descargadas** en `assets/vehiculos/gr-yaris/` (optimizadas: 2000 px la
galería, 1200 los diferenciales), no enlazadas al CDN de Toyota.

- **La galería** muestra 6 fotos en el bento; las otras 5 no se ven en la reja
  pero entran en el visor, y la sexta lleva "+5".
- **Sellos de seguridad:** del SVG se muestra solo el ícono; la leyenda va como
  texto (`MODEL.seals[].label`). Así se corrige por modelo sin rehacer el sello:
  `sello-5.svg` trae dibujado "BOLSAS DE AIRE (7)" y el GR Yaris tiene **6**.
- **Garantía:** el sello sale de `MODEL.warranty.seal` —
  `garantia-standard.svg` (5 años) o `garantia-hibrido.webp` (8 años, híbridos).
- "Garantía" en descargables no tiene PDF en Toyota: lleva a la sección de
  garantía de la página.

⚠️ **El Home dice 261 CV para el GR Yaris** (`GR_VEHICLES` en `home.html`);
la ficha actual dice **296 HP y 400 Nm**. Conviene alinear el Home.

### Decisiones

- **El logo del header y del footer lleva a `home.html`**, y el "Ver detalles"
  del GR Yaris en el mega-menú a `interna-general.html`, para poder navegar entre las
  dos páginas al revisar. En producción, volver a las URLs reales.
- **La galería es más baja que la del Home:** filas de `7.2vw` en vez de
  `9.7vw` (desde 901 px), para que la sección entera entre en 1440×900 con aire
  bajo el header y la sub-nav.
- **La sub-nav es `position:fixed` y arranca escondida:** entra deslizando
  desde debajo del header cuando ya pasó el 60 % del banner (clase `.is-on`). Por
  eso el banner ocupa el alto de pantalla menos el header, sin descontar la
  sub-nav.
- **Visor de color:** la base de la plantilla es la foto **3/4** de cada color
  (`colors[].img`). Si el modelo trae los frames del 360 (`colors[].spin`:
  carpeta, cantidad y frame de la 3/4), el visor se vuelve girable con el mouse,
  el dedo o las flechas del teclado, y aparece "Arrastra para girar". Sin
  `spin`, foto fija y sin la pista. GR Yaris: 12 frames por color en
  `assets/vehiculos/gr-yaris/colores/360/` (la 3/4 es el frame 2).
- **Diferenciales es un slider** con la composición y la mecánica del carrusel
  de modelos del Home (`.gr-models` + `.gr-vgrid` + `grCarousel`): encabezado y
  flechas a la izquierda, piezas a la derecha. Las piezas no llevan íconos ni
  números de fondo, solo "01 / 06", título y texto. El reveal va en la lista
  entera y no en cada pieza (dentro de un carrusel el translateY lo vuelve
  desplazable a lo alto).
- **La galería tiene bento propio** (no el del Home): 1 grande · 2 chicas arriba
  a la derecha · 1 apaisada abajo a la izquierda · 2 altas a la derecha (filas 2
  y 3). El orden de las fotos en `MODEL.gallery` importa: 2 y 3 piden ~2:1, la 4
  panorámica, la 5 y la 6 casi cuadradas. Los recortes con transparencia llevan
  `fit:'cutout'`. En ≤900 px manda la reja de 2 columnas del Home.
- **El scrollspy calcula por posición**, no con IntersectionObserver: pasada la
  última sección queda marcada Garantía en vez de la que hubiera antes.
- ⚠️ `.gv-hero` lleva `grid-template-columns:minmax(0,1fr)`: sin eso la columna
  implícita del grid no encoge por debajo del min-content del nombre y en móvil
  la página desbordaba a lo ancho.

---

## Galería completa — `galeria-general.html`

Sale de "Ver la galería completa" en `interna-general.html` (`MODEL.galeria`).
Misma plantilla; el `<main>` es solo la galería, en fondo blanco:

- Cotizar arriba a la derecha
- "Galería" + nombre, pestañas **Exterior / Interior**, "*Imágenes de referencia"
- **mosaico** con ritmo fijo: **fila de 3 chicas · 1 ancha**, repetido;
  después de la 1ª tanda va la frase (`MODEL.galleryQuote`). En móvil: **1
  grande · 2 chicas**. Clic en cualquier foto abre el visor.
- botón "Volver al GR Yaris"

Las fotos son las mismas de `MODEL.gallery` (aceptan `{ src, pos }`).

⚠️ La frase de la galería de Toyota dice "Innovación híbrida y confort premium…",
que no corresponde al GR Yaris (no es híbrido). Se usó la frase de la galería de
la versión: "Potencia, precisión y control en una experiencia 100% manual."

---

## Renders de color normalizados

Los renders de Toyota no vienen encuadrados igual entre colores (en el GR Yaris
el blanco trae el auto ~9,7 % más grande que el gris y el rojo), así que al
cambiar de color el auto "saltaba". Se corrigió **en las imágenes**, no en CSS:
cada render gris y rojo (vista 3/4 + los 12 frames del 360) se reescaló y
reubicó para que el auto quede en los mismos píxeles que el blanco — mismo
centro horizontal y mismo piso (ruedas), escala única de 1,0973 por color (el
frame 1 y el 6 traen su propio encuadre y se igualaron uno a uno).

Medido en pantalla después: los tres colores caen en las mismas coordenadas
(±1 px). El cambio de color es instantáneo, sin animación.

**Para otro modelo:** revisar si sus renders vienen uniformes. Si no, repetir la
normalización (tomar un color de referencia, medir el recorte opaco del auto en
cada imagen y alinear centro y piso). `colors[].fit` queda como respaldo de
emergencia, pero no reemplaza a normalizar.

---

## Versiones en carrusel

Si `MODEL.versions` trae **más de una** versión, "Encuentra tu versión" pasa a
ser un carrusel de una card por vista con flechas y contador ("1 de 2"). Con
una sola versión se ve la card sola, sin flechas. Para ver el carrusel con el
GR Yaris (que tiene una sola), abrir `interna-ejemplo-versiones-hibrido.html`
(misma interna con 2 versiones y garantía híbrida ya cargadas en `MODEL`). En la card, "Modelo 2027" va
debajo del precio.

## Legal en las imágenes

Cada foto de la galería (preview y página completa), de los diferenciales y del
visor lleva "*Imágenes de referencia" en la esquina inferior derecha
(`.gv-ref`).

## Archivo de ejemplo: varias versiones + garantía híbrida

`interna-ejemplo-versiones-hibrido.html` es la misma interna que
`interna-general.html` (mismo HTML, CSS y JS); solo cambian dos datos de `MODEL`:

- `versions` trae **2 versiones** (GR Yaris MT y GR Yaris AT de ejemplo) →
  "Especificaciones generales" se vuelve carrusel con flechas y contador "1 de 2".
- `warrantyHybrid` (sello `garantia-hibrido.webp`, título y texto) → la sección
  de garantía muestra las **dos garantías** bajo "Beneficios de tener un Toyota".

En producción no hace falta otro archivo: basta con que el modelo traiga más de
una versión y/o `warrantyHybrid` para que la interna cambie sola.

# Skeleton v1 – Bouwpad (React + Vite + TypeScript)

Dit document beschrijft het bouwpad voor Skeleton v1.  
Het definieert de volgorde van implementatiestappen, in lijn met `SKELETON_V1_SCOPE.md`.

---

## Fase 0 – Repo en basisdocumenten

**Doel:** Eén bron van waarheid en minimale maar duidelijke documentatie.

1. Maak lokale Git-repo `pwa-skeleton` aan (of clone vanuit GitHub).
2. Initialiseer projectdirectory (indien nodig).
3. Voeg basisdocumenten toe:
   - `README.md` (korte beschrijving + placeholder “work in progress”)
   - `SKELETON_V1_SCOPE.md` (definitieve v1-scope)
   - `Skeleton_V1_Bouwpad.md` (dit document)
4. Eerste commit: `chore: init repo with base docs`.

**Resultaat:** Git-repo bestaat, minimale docs aanwezig, niets complex.

---

## Fase 1 – Vite-bootstrap + scripts + mapstructuur

**Doel:** Werkend basisproject + definitieve mappenstructuur.

1. Genereer een Vite-project met React + TypeScript in de repo `pwa-skeleton`.
2. Verifieer NPM-scripts:
   - `npm run dev`
   - `npm run build`
   - `npm run test` (mag dummy zijn)
   - `npm run lint` (mag dummy zijn)
3. Maak de definitieve mappenstructuur aan:
   - `src/core/` (shell, routing, PWA, infra)
   - `src/modules/` (feature-modules)
   - `src/shared/ui/` (design system componenten)
   - `src/shared/lib/` (hooks, utils, services incl. logging/AI/storage/nav)
   - `src/config/` (app-config, PWA-config)
4. Pas `main.tsx`/root-app aan zodat de entry uit `src/core` komt.
5. Commit: `chore: bootstrap vite project and base folder structure`.

**Resultaat:** Vite-project draait (`npm run dev`), basisstructuur staat, inhoud nog minimaal.

---

## Fase 2 – AppShell, header, desktop-blokkering en basisroutes

**Doel:** UX-frame neerzetten dat alles host.

1. Maak `src/core/AppShell.tsx` met:
   - Header met zones: links (back/navigatie), midden (titel), rechts (twee icon-slots).
   - Main contentzone voor schermen.
2. Implementeer desktop-blokkering:
   - Detecteer non-mobile / te brede viewports.
   - Toon op desktop alleen een blokkerscherm met tekst en QR-code (placeholder).
3. Voeg router toe (bijv. `react-router-dom`) in `src/core/router/`.
4. Definieer minimaal drie routes:
   - `Home`
   - `Notifications`
   - `Settings`
5. Koppel header-iconen:
   - Icon 1 (rechtsboven) → route `Notifications`
   - Icon 2 (rechtsboven) → route `Settings`
6. Test navigatie tussen deze schermen.
7. Commit: `feat: core AppShell, router and desktop block screen`.

**Resultaat:** App heeft een vaste header, hoofdcontentzone, desktop-blokscherm en basisnavigatie.

---

## Fase 3 – Navigatie-/UI-API (useNavigation/useUI)

**Doel:** Modules praten via een contract met navigatie en UI.

1. Maak in `src/shared/lib/navigation/` een hook of service, bijv. `useNavigation`.
2. Implementeer minimaal:
   - `goTo(routeName | path)`
   - `goBack()`
   - `openSettings()`
   - `openNotifications()`
3. Laat Home/Notifications/Settings deze API gebruiken in plaats van directe router-calls.
4. Reserveer optioneel een generieke intent-functie, bijv. `openDetail(entity, id)` (v1-implementatie mag basic/no-op zijn).
5. Commit: `feat: central navigation API for screens and global actions`.

**Resultaat:** Alle navigatie loopt via één centrale laag; modules raken de router niet direct.

---

## Fase 4 – Tokens & micro design system

**Doel:** Visuele basis standaardiseren via tokens en shared UI.

1. Definieer in `src/core/theme/tokens.ts` (of vergelijkbaar) een light theme:
   - Kleuren (primary, secondary, background, surface, text, accent)
   - Typografie (basis font, font-sizes)
   - Spacing (s/m/l)
   - Border-radius (default, pill)
2. Maak in `src/shared/ui/` basiscomponenten die tokens gebruiken:
   - `Button`
   - `TextInput` / `TextArea`
   - `Card`
   - `Modal` (eenvoudige overlay)
   - `Badge`
   - `List` + `ListItem`
3. Vervang in AppShell en basispagina’s ad-hoc HTML-knoppen/inputs/cards door deze componenten.
4. Commit: `feat: light theme tokens and shared UI components`.

**Resultaat:** Eén thema, gedeelde componenten, geen hardcoded styles in kernschermen.

---

## Fase 5 – i18n-basisskelet

**Doel:** Alle UI-tekst via een key-based i18n-systeem laten lopen.

1. Voeg i18n-layer toe in `src/shared/lib/i18n/` (eenvoudige eigen implementatie of lib).
2. Maak `src/locales/de.json` als brontaalbestand.
3. Implementeer een helper/hook `t('key')`.
4. Verplaats alle zichtbare teksten uit Shell, Home, Notifications, Settings en basiscomponenten naar `de.json`.
5. Controleer dat er geen harde UI-strings meer in componenten staan.
6. Commit: `feat: basic i18n with German base locale`.

**Resultaat:** UI-tekst is centraal beheerd, klaar voor extra talen.

---

## Fase 6 – Storage-abstractie + voorbeeldmodule

**Doel:** Data-opslag abstraheren en modulepatroon end-to-end aantonen.

1. Maak in `src/shared/lib/storage/` een eenvoudige storage-service/hook:
   - bijv. `getItems(key)`, `setItems(key, items)` met lokale opslag (localStorage/IndexedDB wrapper).
2. Definieer één voorbeeldmodule in `src/modules/notes/` of `src/modules/journal/`:
   - lijst van items (bijv. notities/dromen)
   - formulier om nieuwe items toe te voegen
   - opslag via de storage-service
3. Toon deze module op de Home-route via de module-entry.
4. Zorg dat module shared UI-componenten, navigatie-API, i18n en logging (zodra beschikbaar) gebruikt.
5. Commit: `feat: storage abstraction and example notes/journal module`.

**Resultaat:** Eén concrete module bewijst dat skeleton end-to-end werkt.

---

## Fase 7 – Logging-API + error-boundary

**Doel:** Geen witte schermen meer en centraal loggingpunt.

1. Maak in `src/shared/lib/logging/` een logging-API met niveaus: `debug`, `info`, `warn`, `error`.
2. Implementatie v1:
   - in dev → log naar `console`
   - in prod → minimal/no-op toegestaan
3. Vervang losse `console.log`-aanroepen door de logging-API.
4. Voeg in `src/core/` een globale error-boundary toe rond de Shell.
5. Laat de error-boundary een foutscherm tonen met:
   - tekst via i18n
   - knop “opnieuw proberen” of “terug naar home”.
6. Commit: `feat: central logging and global error boundary`.

**Resultaat:** Fouten worden netjes afgehandeld en logging is centraliseerbaar.

---

## Fase 8 – PWA-basis afronden

**Doel:** Skeleton is een echte PWA volgens minimale best practices.

1. Voeg een web app manifest toe in `src/config/` of `public/`, met waarden gevoed uit app-config:
   - naam, korte naam
   - theme/background color
   - icon-referenties
2. Configureer Vite PWA-plugin of eigen service worker in `src/core/pwa/`:
   - cache de shell-bestanden (JS/CSS/HTML)
   - simpele update-strategie (bijv. nieuwe versie bij reload)
3. Test in browser:
   - PWA installable in devtools
   - app toont shell + basispagina’s offline.
4. Commit: `feat: basic PWA manifest and service worker`.

**Resultaat:** Skeleton voldoet functioneel als PWA.

---

## Fase 9 – AI-service-stub

**Doel:** AI-contract verankeren zonder provider-lock-in.

1. Maak in `src/shared/lib/ai/` een AI-servicecontract, bijv.:
   - `generateText(input, options)`
   - `analyze(input, options)`
   - `generateImage(input, options)`
2. Maak een v1-implementatie als stub/dummy:
   - vaste testresponses of eenvoudige mock
   - geen echte externe calls nodig in v1
3. Optioneel: voeg in de voorbeeldmodule een simpele knop toe die `generateText` aanroept en resultaat toont.
4. Commit: `feat: generic AI service contract with stub implementation`.

**Resultaat:** Modules spreken AI via één centrale laag; echte integraties kunnen later worden toegevoegd.

---

## Fase 10 – Documentatie invullen + v1-freeze

**Doel:** Skeleton v1 afronden, documenteren en bevriezen.

1. Vul `README.md` in met:
   - korte beschrijving Skeleton v1
   - hoe lokaal te starten (`npm run dev`)
   - hoe te builden (`npm run build`)
   - hoe een nieuwe PWA vanaf skeleton te maken (korte bullets).
2. Zorg dat `SKELETON_V1_SCOPE.md` en `Skeleton_V1_Bouwpad.md` up-to-date zijn met de daadwerkelijke implementatie.
3. Handmatige check:
   - mobile/tablet portrait UX
   - desktop-blokkerscherm + QR-tekst
   - navigatie Home/Notifications/Settings
   - voorbeeldmodule werkt (item toevoegen + terugzien)
   - PWA-install en basis offline gedrag
4. Maak Git-tag: `skeleton-v1.0.0`.
5. Architectuurwijzigingen na deze tag alleen via een expliciet v1.x-plan (bugfixes toegestaan, geen breaking changes).

**Resultaat:** Skeleton v1 is een stabiel, gedocumenteerd fundament voor nieuwe PWA’s.

# Skeleton v1 – Scope & Randvoorwaarden

Dit document definieert de **definitieve scope** van Skeleton v1 voor de PWA Factory.
Alles in dit document is bindend voor ontwerp, implementatie en uitbreidingen tot en met versie `v1.x`.

---

## 1. Doel van Skeleton v1

- Eén herbruikbaar PWA-skelet waarmee meerdere professionele PWA’s (o.a. Dreamdrop, Temio, RiskRadar) gebouwd kunnen worden.
- Gericht op **mobiel en tablet in portrait mode**; niet bedoeld als desktop-ervaring.
- Licht maar toekomstbestendig fundament: panel-ready, AI-ready, factory-ready, zonder over-engineering in v1.
- Git-repo als enige bron van waarheid; geen ZIP/ChatGPT-sessies als proces-SSOT.

---

## 2. Stack en SSOT

- **Stack:** React 18 + Vite + TypeScript.
- **Repo:** één Git-repository `pwa-skeleton` als enige SSOT voor code en structuur.
- **Docs-minimum in repo:**
  - `README.md`
  - `SKELETON_V1_SCOPE.md` (dit document).

---

## 3. In Scope voor v1 (MOET erin)

### 3.1 Projectstructuur en core

- Eén Git-repo `pwa-skeleton` als enige bron van waarheid, met minimaal `README.md` en `SKELETON_V1_SCOPE.md`, geen ZIP-/document-SSOT.
- Een vaste, gedocumenteerde mappenstructuur met gescheiden `core` (shell/routing/PWA/infra), `modules` (features), `shared/ui` (design system), `shared/lib` (hooks/utils/services) en `config` (app- en PWA-config).
- Een centrale `AppShell`-component die alle schermen host, met vaste header en één hoofd-contentzone, expliciet ontworpen als “panel-ready” maar nog zonder geïmplementeerde panel-engine.
- UX en layout strikt mobile/tablet-gericht in portrait mode; op desktop wordt uitsluitend een blokkerscherm met tekst en QR-code getoond en draait de PWA zelf niet.
- Geen aparte landscape-layout; bij gebruik in landscape blijft de app portrait-georiënteerd en kan optioneel een “draai je toestel naar portret”-overlay getoond worden.

### 3.2 Home, routing en submenu’s

- Home-scherm met een standaard responsive widgetgrid: 1 kolom op smalle mobiele schermen, 2 kolommen op bredere portrait-tablets; fijnmazige per-widget/per-home layoutsturing is expliciet voor latere versies.
- Eén client-side router met support voor meerdere en geneste pagina’s, zodat hoofdschermen en submenus (zoals instellingen-subpagina’s) via standaard navigatie en simpele menus bereikbaar zijn.
- Een centrale navigatie-/UI-API (bijv. `useNavigation`/`useUI`) waarlangs alle modules schermwissels, subpagina’s en globale acties (zoals instellingen/notificaties) aanroepen, zodat modules nooit direct router of layout manipuleren.
- Een modulair featurepatroon waarbij elke module een duidelijk entry-point heeft en uitsluitend via centrale services (navigatie, storage, UI, AI, logging) werkt, zonder eigen DOM- of shell-layoutmanipulatie.

### 3.3 PWA, thema en design system

- Een basis-PWA-setup met manifest en service worker die de shell cachet en installability in moderne browsers garandeert, zonder geavanceerde offline-logica in v1.
- Een eenvoudig tokens-gebaseerd themasysteem met één light theme (kleuren, typografie, spacing, rondingen) dat in alle core UI-componenten wordt gebruikt, zonder dark/system-thema’s in v1.
- Een klein maar compleet shared UI-designsystem met basiscomponenten (o.a. button, input, card, modal, badge, list) die allemaal het thematokensysteem gebruiken.

### 3.4 Data, i18n en logging

- Een eenvoudige, generieke storage-abstractie (bijv. lokale DB-/IndexedDB-wrapper) die modules gebruiken voor data-opslag, zodat ze nooit direct browser-storage of HTTP-endpoints aanspreken.
- Een key-based i18n-structuur met minimaal één brontaal (bijv. `de`) en losse taalfiles, zodat geen harde UI-strings in componenten staan.
- Een centrale logging-API met logniveaus (`debug`/`info`/`warn`/`error`) die in v1 vooral naar console schrijft maar later eenvoudig aan telemetrie kan worden gekoppeld.

### 3.5 Foutafhandeling en scripts

- Een globale error-boundary met een simpel foutscherm, zodat runtime-errors niet leiden tot een wit scherm maar tot een herstelbare foutstate.
- Standaard project-scripts (`dev`, `build`, `test`, `lint`) zodat het skeleton altijd lokaal te draaien, te testen en te bouwen is.

### 3.6 Voorbeeldmodule, app-config en AI-service

- Minimaal één voorbeeldmodule (bijv. eenvoudige notes/journal) die end-to-end laat zien hoe routing, storage, UI, i18n, logging en navigatie-contract in het skeleton worden gebruikt.
- Een centraal app-configbestand waarin per PWA naam, branding, ingeschakelde modules, PWA-meta en API-/endpointinstellingen worden vastgelegd.
- Een generieke AI-service-laag met een vast aanroepcontract voor modules, waarbij v1 desnoods een simpele of stub-implementatie gebruikt en providerspecifieke details verstopt blijven.
- Een vaste headerlayout in de `AppShell` met links back/navigatie, midden titel en rechts twee globale actie-iconen (meldingen en persoonlijke instellingen) met bijbehorende basisroutes.

---

## 4. Expliciet NIET in v1 (bewust uitgesteld)

De volgende onderwerpen vallen **niet** binnen de scope van Skeleton v1 en mogen pas in v1.1/v2 of later worden opgepakt:

- Volledige panel-engine met complexe open-/close-regels, docking, animaties en multi-panel layoutlogica.
- Meerdere thema’s (dark, system, brand-specifieke varianten) en complexe token-hierarchieën.
- Multi-tenant platformlogica waarbij meerdere klanten/apps in één runtime draaien.
- Uitgebreide analytics, A/B-testing, tracking-configs en geavanceerde telemetrie-dashboards.
- Volledige “factory-CLI” of visuele builder die automatisch projecten genereert vanuit vragenlijsten of DSL.
- Geavanceerde offline-strategieën per app (fine-grained caching, background sync, conflict resolution).
- Geavanceerde AI-“Style Intelligence Layer” of automatische stijlselectie op basis van inhoud/emotie.
- Volledige auth-/account-module met rollen, rechten en multi-device sessiebeheer (mag later als module worden toegevoegd).
- Integratie met specifieke backends (Supabase, Firebase, eigen SaaS) buiten een generieke API-/endpointconfig.
- Zware formele contract-/sessie-PDF’s, ZIP-rituelen of tool-protocollen als runtime-onderdeel van het skeleton.
- Fijnmazige per-widget/per-home layoutconfig voor het home-grid; v1 beperkt zich tot standaard responsive gedrag (1 kolom mobiel, 2 kolommen tablet).

---

## 5. Governance-regels Skeleton v1

- Wijzigingen aan de architectuur (shell, mapstructuur, core-contracten) zijn in v1 alleen toegestaan als ze:
  - het v1-scopecontract niet breken, en
  - via een duidelijke Git-commit en changelog worden vastgelegd.
- Na oplevering en tagging van `skeleton-v1.0.0` mogen alleen bugfixes en kleine, backwards-compatible verbeteringen worden gedaan binnen de `v1.x`-lijn.
- Nieuwe PWA’s (Dreamdrop, Temio, RiskRadar, etc.) moeten op `skeleton-v1.0.0` of een latere `v1.x`-tag worden gebaseerd zonder breaking changes aan de v1-contracten.

---

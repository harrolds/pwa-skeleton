# Skeleton v2 – Scope & Randvoorwaarden

Dit document definieert de **uitgebreide scope** van Skeleton v2 voor de PWA Factory.
Skeleton v2 bouwt voort op `skeleton-v1` (fases 0–8) en voegt extra structuren toe voor shell, menu, modules en ontwikkelervaring. :contentReference[oaicite:0]{index=0}  

Alle regels in dit document zijn bindend voor ontwerp, implementatie en uitbreidingen tot en met versie `v2.x`.

---

## 1. Doel van Skeleton v2

- Eén herbruikbaar PWA-skelet waarmee meerdere professionele PWA’s (o.a. Dreamdrop, Temio, RiskRadar en toekomstige apps) gebouwd kunnen worden.
- Gericht op **mobiel en tablet in portrait mode**; desktop krijgt uitsluitend een blokkerscherm met QR-link.
- Licht maar toekomstbestendig fundament: panel-ready, AI-ready, factory-ready, met nu een volwaardige shell (header + footer), menu-architectuur, module-registry en ontwikkelhandleiding.
- Git-repo als enige bron van waarheid voor code en structuur; ZIP’s worden alleen gebruikt als werkartefact voor AI-sessies, niet als proces-SSOT.

---

## 2. Stack en SSOT

- **Stack:** React 18 + Vite + TypeScript.
- **Repo:** één Git-repository `pwa-skeleton` als enige SSOT voor code, config en documentatie.
- **Minimale docs in repo:**
  - `README.md`
  - `SKELETON_V2_SCOPE.md` (dit document, leidend vanaf Fase 9)
  - `Skeleton_V2_Bouwpad.md`
  - `Skeleton_V2_Startblok.md`
  - `MODULE_AUTHOR_GUIDE.md` (vanaf Fase 20, leidend voor modulebouw).

---

## 3. In Scope voor v2 (MOET erin)

### 3.1 Projectstructuur en core

- Vaste, gedocumenteerde mappenstructuur:

  - `src/core/` (shell, routing, PWA, infra, error boundary)
  - `src/modules/` (feature-modules, per module 1 duidelijke entry)
  - `src/shared/ui/` (design system componenten)
  - `src/shared/lib/` (hooks, utils, services incl. navigation, storage, logging, i18n, telemetry)
  - `src/config/` (app-config, PWA-config, module-config)
  - `src/locales/` (taalbestanden)

- **Single root policy (blijft gelden):**  
  `src/main.tsx` rendert uitsluitend `AppRoot` uit `src/core`; er worden geen extra top-level rootcomponenten (`App.tsx`, `Root.tsx` e.d.) geïntroduceerd in andere mappen.

- Core is “panel-ready”: de shell en layout zijn zo opgebouwd dat later een panel-engine toegevoegd kan worden zonder brekende refactors, maar een echte panel-engine is nog steeds buiten scope voor v2.

### 3.2 Shell v2: header, footer en layout

- **Vaste Header**:
  - Bovenaan elk scherm zichtbaar.
  - Layout: links back/navigatie-slot, midden dynamische titel, rechts twee vaste actie-iconen:
    - meldingen (notifications)
    - persoonlijke instellingen (settings)
  - Deze iconen zijn **globaal** en altijd aanwezig.

- **Vaste Footer (bottom bar)**:
  - Persistent bottom navigation bar op alle hoofdschermen.
  - Bevat een configurabele set van 3–5 menu-items (bijv. Home, Modules, Notifications, Settings, More).
  - Footer-menu-items zijn declaratief gedefinieerd in een centrale config en worden niet per module “hardcoded”.

- **Layoutregels**:
  - UX en layout strikt mobile-/tablet-gericht in portrait mode.
  - Desktop toont alleen blokkerscherm met QR-code of instructie; PWA draait daar niet.
  - Geen aparte landscape-layout; optioneel overlay “draai je toestel naar portret” mag later komen.

### 3.3 Routing, submenu’s en navigatie-API

- Eén client-side router met support voor hoofdschermen en eenvoudige subpagina’s (bijv. `/settings/profile`, `/settings/notifications`, `/module/notes/detail/:id`).
- **Centrale navigatie-API** (bijv. `useNavigation`) blijft het enige toegestane kanaal voor schermwissels:
  - `goTo(pathOrRouteName)`
  - `goBack()`
  - `openSettings()` (globale settings)
  - `openNotifications()`
  - `openHome()`
  - `openModule(moduleKey)`
  - `openModuleSettings(moduleKey)`
- Modules en screens spreken de router uitsluitend via deze API; directe router- of history-manipulatie in modules is niet toegestaan.
- **Submenu-architectuur**:
  - Shell ondersteunt per scherm een optionele “secondary actions”-zone (bijv. in header of ondertitel), gevoed vanuit scherm- of moduleconfig.
  - Submenu-items zijn declaratief (config), niet inline in componenten.

### 3.4 Home-grid en widgets

- Home-scherm bevat een **widget host** die een set widgets rendert vanuit centrale config of module-registratie.
- Minimale grid-logica:
  - 1 kolom op kleinere mobiele schermen.
  - 2 kolommen op grotere portrait-tablets.
- Layout per widget (positie/kolombreedte/prioriteit) wordt via config geregeld; modules kunnen voorstellen doen, maar de shell houdt de controle.
- Fijnmazige drag-and-drop of per-gebruiker layout-editors blijven buiten scope van v2.

### 3.5 Module-registry en module-architectuur

- **Module-registry** in `src/config/moduleRegistry.ts` (of gelijkwaardig) is de enige plek waar modules worden geregistreerd, met ten minste:

  - `id` (machine-naam)
  - `labelKey` (i18n-key)
  - optioneel: `routeConfig`, `widgetConfig`, `settingsConfig`, `menuItems`, `featureFlags`

- Elke module in `src/modules/<moduleId>/` heeft:

  - één duidelijk entry-component (bijv. `NotesModule.tsx`),
  - optionele subcomponents voor routes, widgets, settings.

- Modules praten uitsluitend via centrale services:

  - navigation (`shared/lib/navigation`)
  - storage (`shared/lib/storage`)
  - logging (`shared/lib/logging`)
  - i18n (`shared/lib/i18n`)
  - API/data-client (`shared/lib/api`) zodra beschikbaar
  - AI (`shared/lib/ai`) zodra beschikbaar

- Modules mogen **geen**:

  - eigen shell-layout bouwen,
  - DOM buiten hun eigen contentzone manipuleren,
  - header/footer direct aanpassen,
  - router direct manipuleren.

### 3.6 PWA, thema en design system

- Basis-PWA-setup uit v1 blijft:

  - manifest
  - service worker
  - installability

- v2 voegt een **offline fallback-screen** toe:

  - route en/of resource die verschijnt wanneer netwerk ontbreekt,
  - eenvoudige tekst en herlaadknop, key-based via i18n.

- Themasysteem blijft tokens-based met minimaal één light theme:

  - kleuren, typografie, spacing, rondingen,
  - alle shared UI-componenten gebruiken tokens.

- Mogelijkheid tot **brand-overrides** via app-config (bijv. primary color, app-name) zonder structurele themamultiplicatie. Volledige multi-theme support blijft buiten v2-scope.

### 3.7 Data, i18n, logging en telemetry

- **Storage-abstractie** blijft verplicht voor lokale data (bijv. localStorage/IndexedDB wrapper).
- **i18n** blijft key-based met `de` als brontaal; extra talen kunnen later worden toegevoegd.
- **Logging-API**:

  - `debug/info/warn/error` niveaus blijven,
  - v2 voegt een optionele telemetrie-haak toe (bijv. `trackEvent(eventName, payload)`),
  - implementatie kan in v2 nog een stub zijn (console), maar de contractlaag moet er zijn.

- Modules gebruiken altijd deze logging-/telemetrylagen, geen losse `console.log` meer.

### 3.8 Settings-architectuur

- Centrale settings-structuur:

  - `/settings` voor algemene app-instellingen.
  - `/settings/<moduleId>` voor module-specifieke settings.

- Settings-navigatie verloopt via `useNavigation().openSettings()` en `openModuleSettings(moduleKey)`.
- Settings-schermen zijn sterk gestandaardiseerd (layout, header, body), zodat modules alleen inhoudscomponenten hoeven te leveren.

### 3.9 Notifications-abstraction

- In-app notificatie-layer:

  - globaal component voor toasts / banners / inline meldingen.
  - centrale API (bijv. `useNotifications().show(...)`).

- OS-push-notificaties blijven buiten v2-scope; alleen in-app notificaties worden ondersteund.

### 3.10 Developer experience en tests

- Minimale testharness:

  - unit-test support voor shared libs en UI (bijv. Vitest + Testing Library),
  - één of enkele voorbeeldtests voor een module en een shared component.

- Basislinting (ESLint) en formatting (Prettier) ingericht als optionele Fase 9/10 equivalent, maar functionaliteit gaat voor; geen overmatige tooling-complexiteit.

- `MODULE_AUTHOR_GUIDE.md`:

  - beschrijft stap-voor-stap hoe een nieuwe module wordt aangemaakt,
  - legt alle contracten uit (registry, routes, widgets, settings, services),
  - bevat voorbeeldsnippets en best practices,
  - is leidend voor alle toekomstige modulebouw.

---

## 4. Expliciet NIET in v2 (bewust uitgesteld)

De volgende onderwerpen vallen **niet** binnen de scope van Skeleton v2 en mogen pas in v3 of later worden opgepakt:

- Volledige panel-engine met complexe open-/close-regels, docking, animaties, multi-panel layout.
- Multi-tenant platformlogica met dynamische app-loader voor meerdere klanten in één runtime.
- Geavanceerde analytics, A/B-testing, dashboards en event-samplers.
- Factory-CLI of visuele builder die automatisch projecten genereert uit een DSL of wizard.
- Geavanceerde offline-strategieën per module (fine-grained caching, background sync, conflict resolution).
- Volledige auth-/account-module met rollen, rechten, multi-device sessies (kan als aparte module later komen).
- Integratie met specifieke backends (Supabase, Firebase, eigen SaaS) buiten een generieke API-/endpointlaag.
- Per-user, interactief aanpasbare widgetlayout (drag & drop, grid-editing).

---

## 5. Governance-regels Skeleton v2

- Architectuurwijzigingen (shell, mapstructuur, core-contracten, module-registry) zijn in v2 alleen toegestaan als ze:
  - het v2-scopecontract niet breken, en
  - via een duidelijke Git-commit en changelog worden vastgelegd.

- **Module-governance (hard):**

  1. Alle modules worden geregistreerd in de centrale module-registry. Geen “loshangende” modules.
  2. Modules manipuleren nooit direct router, header, footer, of globale layout.
  3. Modules gebruiken uitsluitend shared services (`navigation`, `storage`, `logging`, `i18n`, `api`, `ai`).
  4. Footer-menu wordt uitsluitend via centrale config beheerd, niet vanuit modules.

- Na oplevering en tagging van `skeleton-v2.0.0`:
  - alleen bugfixes en kleine, backwards-compatible verbeteringen in de `v2.x`-lijn,
  - nieuwe PWA’s moeten op `skeleton-v2.0.0` of latere `v2.x`-tag worden gebaseerd zonder breaking changes aan v2-contracten.

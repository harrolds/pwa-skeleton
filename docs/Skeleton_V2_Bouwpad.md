# Skeleton v2 – Bouwpad (React + Vite + TypeScript)

Dit document beschrijft het bouwpad voor Skeleton v2.
Fases 0–8 zijn overgenomen uit v1 en gelden als afgerond. Fases 9–25 breiden het skeleton uit naar een volwaardige Factory-basis.

---

## Fase 0 – Repo en basisdocumenten

*(Ongewijzigd t.o.v. v1, reeds afgerond. Zie oude Skeleton_V1_Bouwpad voor details.)*

---

## Fase 1 – Vite-bootstrap + scripts + mapstructuur

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 2 – AppShell, header, desktop-blokkering en basisroutes

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 3 – Navigatie-/UI-API (useNavigation/useUI)

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 4 – Tokens & micro design system

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 5 – i18n-basisskelet

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 6 – Storage-abstractie + voorbeeldmodule

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 7 – Logging-API + error-boundary

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 8 – PWA-basis afronden

*(Ongewijzigd t.o.v. v1, reeds afgerond.)*

---

## Fase 9 – Shell v2: vaste footer + bottom navigation

**Doel:** De shell uitbreiden met een vaste footer en een centraal footer-menu.

1. Maak in `src/core/` een footercomponent, bijv. `AppFooter.tsx`, die:

   * onderaan elk scherm wordt gerenderd,
   * 3–5 vaste slots toont voor bottom-nav-items (icon + label).

2. Definieer in `src/config/appConfig.ts` of `src/config/navigation.ts` een declaratieve footer-menuconfig, bijv.:

   ```ts
   export const footerMenu = [
     { id: 'home', route: 'home', labelKey: 'nav.home', icon: 'home' },
     { id: 'notes', route: 'notes', labelKey: 'nav.notes', icon: 'notes' },
     { id: 'notifications', route: 'notifications', labelKey: 'nav.notifications', icon: 'bell' },
     { id: 'settings', route: 'settings', labelKey: 'nav.settings', icon: 'settings' },
   ];
   ```

3. Laat `AppShell` de footer altijd onder de main content renderen (boven safe-area).

4. Koppel footer-menu-items via `useNavigation()` (geen directe router-calls).

5. Voeg de benodigde i18n-keys toe voor de labels (`nav.*`).

6. **Definition of Done:**

   * Footer zichtbaar op alle hoofdschermen.
   * Footer-items navigeren correct naar de beoogde routes.
   * Header en desktop-block blijven ongewijzigd werken.
   * `npm run dev/build/test/lint` groen.

7. Commit: `feat: shell footer and bottom navigation`.

**Resultaat:** Een consistente shell met vaste header en footer-nav, declaratief geconfigureerd.

---

## Fase 10 – Submenu-architectuur en scherm-acties

**Doel:** Een gestandaardiseerde manier introduceren voor secundaire acties (submenus) per scherm.

1. Definieer in `src/core/` een concept voor “screen config” (bijv. `ScreenConfig` type) met o.a.:

   * `id`
   * `titleKey`
   * optionele `actions`-array (bijv. rechtsboven icon-knoppen of overflow-menu).

2. Maak in `src/config/navigation.ts` een lijst van screen-configs voor Home, Notifications, Settings en de Notes-module.

3. Pas `AppShell` aan zodat het schermtitel en acties uit de screen-config laadt i.p.v. hardcoded waarden.

4. Implementeer een eenvoudige “secondary actions”-rendering (bijv. extra icon in header of eenvoudige overflow-knop).

5. Zorg dat acties uitsluitend via `useNavigation` en andere centrale services werken (geen inline router-calls).

6. **Definition of Done:**

   * Titels en header-acties komen uit screen-config.
   * Submenu-acties functioneren op minimaal 1–2 schermen.
   * Geen duplicatie van header-logic in losse screens.
   * Testscripts blijven groen.

7. Commit: `feat: screen configuration and secondary actions`.

**Resultaat:** Schermgedrag is configureerbaar en uniform, voorbereid op meer modules.

---

## Fase 11 – Home-grid en widget-host v1

**Doel:** Home ombouwen tot een widget-host met 1–2 koloms grid.

1. Maak in `src/core/home/` een `WidgetHost`-component die een lijst widgets rendert in gridlayout.

2. Definieer in `src/config/homeWidgets.ts` een configuratie-array met:

   * `id`
   * `moduleId` of `componentRef`
   * `labelKey`
   * optionele `priority`
   * optionele kolombreedte (bijv. `span: 1|2`)

3. Pas Home-route aan zodat hij niet langer direct modulecomponenten rendert, maar via `WidgetHost` de geconfigureerde widgets toont (bijv. Notes-widget).

4. Implementeer gridlogica:

   * 1 kolom op small screens.
   * 2 kolommen op tablets (portrait).
   * Gebruik CSS grid of flex, zonder complexe layout-editor.

5. Widgets gebruiken shared UI (Card, Button etc.) en zien er visueel coherent uit.

6. **Definition of Done:**

   * Minstens 1 widget (Notes) wordt via `homeWidgets`-config gerenderd.
   * Layout is stabiel in 1- en 2-koloms scenario’s.
   * App blijft functioneren zoals voorheen; geen regressie in navigatie.

7. Commit: `feat: home widget host and grid layout`.

**Resultaat:** Home fungeert als flexibele widgetcontainer, aangestuurd door config.

---

## Fase 12 – Module-registry v1

**Doel:** Modules centraal registreren en shell/router daaruit voeden.

1. Maak in `src/config/moduleRegistry.ts` een registry-array, bijv.:

   ```ts
   export const moduleRegistry = [
     {
       id: 'notes',
       labelKey: 'modules.notes.title',
       routeBase: '/notes',
       hasHomeWidget: true,
       hasSettings: true,
     },
     // toekomstige modules
   ] as const;
   ```

2. Verplaats module-specifieke kennis uit router/home naar de registry waar mogelijk (bijv. routeBase, labels).

3. Pas `AppRoutes` aan zodat module-routes deels uit `moduleRegistry` worden opgebouwd (minstens voor Notes).

4. Laat `homeWidgets` config verwijzen naar `moduleRegistry` (bijv. via `moduleId`).

5. Maak een helper in `shared/lib/modules` om registry te raadplegen (bijv. `getModuleById`, `listModules`).

6. **Definition of Done:**

   * Notes-module is volledig geregistreerd in `moduleRegistry`.
   * Router en home gebruiken registry-informatie i.p.v. duplicatie.
   * App blijft stabiel, test-scripts groen.

7. Commit: `feat: central module registry and notes module registration`.

**Resultaat:** Modules hebben een centraal contract; shell en routes zijn minder hardcoded.

---

## Fase 13 – Settings-architectuur (globaal + module)

**Doel:** Settings opdelen in algemene app-settings en module-settings.

1. Definieer in `moduleRegistry` per module een optionele `settingsRoute` of `settingsConfig`.

2. Voeg routes toe:

   * `/settings` voor globale settings (bestaat al),
   * `/settings/:moduleId` voor module-specifieke settings.

3. Maak een `SettingsLayout`-component in `src/core/settings/`:

   * toont een lijst modules met settings,
   * rendert child-settingscontent in een uniforme layout.

4. Maak een eenvoudige settings-view voor de Notes-module (toggle, text, of dummy-optie).

5. Breid `useNavigation` uit met `openModuleSettings(moduleId)`.

6. Pas de Notes-module aan zodat de "Einstellungen öffnen"-knop nu naar module-settings gaat in plaats van globale settings.

7. **Definition of Done:**

   * `/settings` toont globale beschrijving + lijst modules met settings.
   * `/settings/notes` toont module-specifieke settings-UI.
   * Navigatie naar zowel globale als module-settings werkt via `useNavigation`.

8. Commit: `feat: global and per-module settings structure`.

**Resultaat:** Settingsstructuur is opgeschoond; module-instellingen zijn duidelijk gescheiden van globale instellingen.

---

## Fase 14 – Notifications-layer v1

**Doel:** Een generieke in-app notificatie-API introduceren.

1. Maak in `src/shared/lib/notifications/` een API (hook of context) met minimaal:

   * `showToast(messageKey, options?)`
   * optioneel: `showBanner(messageKey, options?)`

2. Voeg een `NotificationsHost`-component toe in `AppShell` of een hoog niveau, die toasts/banners rendert.

3. Gebruik i18n-keys voor notificatieteksten; geen harde strings.

4. Vervang bestaande ad-hoc feedback (bijv. alerts) door notificaties waar zinvol (bijv. "Notiz gespeichert").

5. **Definition of Done:**

   * Ten minste één module (Notes) gebruikt `showToast` na een succesvolle actie.
   * Notifications-host rendert niet als er geen notificaties zijn.
   * Geen regressie in navigatie of layout.

6. Commit: `feat: in-app notification system`.

**Resultaat:** Modules kunnen gebruikersfeedback geven via een uniforme notificatielaag.

---

## Fase 15 – Telemetry / event-tracking stub

**Doel:** Eén centraal contract voor events en basis-telemetry.

1. Introduceer in `src/shared/lib/telemetry/` een API:

   * `trackEvent(name: string, payload?: Record<string, unknown>)`
   * optioneel: `trackScreenView(screenId: string)`

2. Implementatie v1:

   * in dev: logt eventnaam en payload naar console,
   * in prod: mag no-op zijn (of zeer minimale logging).

3. Laat `useNavigation` of router bij een schermwissel `trackScreenView` aanroepen.

4. Laat de Notes-module bij een opgeslagen notitie `trackEvent('notes_saved', {...})` aanroepen.

5. **Definition of Done:**

   * Er worden events gelogd bij schermwissels en module-acties (in dev-console zichtbaar).
   * Telemetry-API is optioneel aanroepbaar door modules, maar niet verplicht.

6. Commit: `feat: telemetry stub and basic screen tracking`.

**Resultaat:** Er is een centraal punt voor event-tracking dat later naar echte analytics kan wijzen.

---

## Fase 16 – Offline fallback v1

**Doel:** De PWA een nette offline-ervaring geven.

1. Maak een `OfflineScreen` in `src/core/offline/OfflineScreen.tsx` met i18n-keys voor titel/tekst/knop.

2. Configureer de PWA-plugin / service worker zodat:

   * shell-resources worden gecachet,
   * bij offline falen een fallback-pagina of route wordt getoond (afhankelijk van tooling).

3. Toon een duidelijke boodschap en eventueel een "Opnieuw proberen"-knop in de offline-UI.

4. Test offline-gedrag in devtools (Network → Offline) op live-build.

5. **Definition of Done:**

   * Bij offline navigatie toont de app een zinvolle fallback in plaats van een blanco scherm.
   * Online-gedrag blijft ongewijzigd.

6. Commit: `feat: basic offline fallback screen`.

**Resultaat:** De skeleton gedraagt zich correct als PWA in offline-situaties.

---

## Fase 17 – API/data-client skeleton

**Doel:** Basisstructuur leggen voor toekomstige backends zonder provider-lock-in.

1. Maak in `src/shared/lib/api/` een eenvoudige client:

   * `get(url, options?)`
   * `post(url, body, options?)`
   * eventueel met basis error-handling en logging.

2. Integreer met logging/telemetry (`logError`, `trackEvent` bij failures).

3. Voeg in `src/config/appConfig.ts` een placeholder-API-baseURL toe (bijv. `apiBaseUrl?: string`).

4. Gebruik de API-client minimaal in één dummy-call (bijv. fetch naar een test-endpoint of mocked JSON via `public/`), zonder kritische afhankelijkheid.

5. **Definition of Done:**

   * API-client compileert, is getest (dummy-call).
   * Modules kunnen optioneel deze client importeren maar zijn er nog niet van afhankelijk.

6. Commit: `feat: generic API client skeleton`.

**Resultaat:** Een centrale data-laag bestaat, klaar voor koppeling met echte backends.

---

## Fase 18 – Forms & validation-utils

**Doel:** Forms in modules standaardiseren en eenvoudige validatie centraal regelen.

1. Maak in `src/shared/lib/forms/` helpers voor:

   * `validateRequired(value)`
   * `validateMaxLength(value, max)`
   * optioneel: generieke `validate(value, rules[])`.

2. Pas de Notes-module aan om deze helpers te gebruiken in plaats van inline validatie.

3. Bied standaard foutboodschappen via i18n-keys (`validation.*`).

4. **Definition of Done:**

   * Notes-formulier gebruikt centrale validatiehelpers.
   * Validation-keys staan in `de.json`.
   * Geen regressie in UX.

5. Commit: `feat: basic form validation utilities`.

**Resultaat:** Modules delen dezelfde simpele validatiemechanismen.

---

## Fase 19 – Module-templates (list/detail, form-module)

**Doel:** Voorbeeldtemplates maken die modulebouw versnellen.

1. Maak in `src/modules/templates/` twee voorbeeldmodules (of pseudo-modules):

   * `ListDetailTemplate`: lijst met items + detail-view.
   * `FormTemplate`: basismodule met formulier + submit + feedback.

2. Documenteer in comments in deze templates waar ontwikkelaars hun eigen logica moeten toevoegen.

3. Registreer de templates optioneel in `moduleRegistry` als demo, maar houd ze desnoods uit de footer-menuconfig (of achter een flag).

4. **Definition of Done:**

   * Beide templates compileren en kunnen optioneel in dev-omgeving worden geactiveerd.
   * Geen impact op eindgebruikersflow als templates uit menu gehouden worden.

5. Commit: `feat: module templates for list/detail and form flows`.

**Resultaat:** Er zijn concrete codevoorbeelden die als startpunt voor nieuwe modules kunnen dienen.

---

## Fase 20 – Module Author Guide

**Doel:** Een duidelijke handleiding voor het toevoegen van modules.

1. Maak `MODULE_AUTHOR_GUIDE.md` in de repo-root met ten minste:

   * high-level uitleg van de module-architectuur,
   * stappenplan "Nieuwe module toevoegen",
   * uitleg van `moduleRegistry`-velden,
   * voorbeelden met de Notes-module en de templates uit Fase 19,
   * best practices (geen directe router-calls, gebruik shared services, i18n, logging etc.).

2. Verwijs vanuit `README.md` naar deze guide.

3. **Definition of Done:**

   * Guide is voldoende dat een niet-expert dev een eenvoudige module kan toevoegen zonder extra uitleg.

4. Commit: `docs: add module author guide`.

**Resultaat:** Modules zijn niet alleen technisch maar ook procesmatig eenvoudig toe te voegen.

---

## Fase 21 – Theme-extensies en app-branding

**Doel:** Basisbrandings-opties bieden zonder volledige thema-multiplicatie.

1. Breid `appConfig` uit met brand-instellingen (bijv. `primaryColor`, `appName`, `logoPath`).
2. Laat `AppShell` en PWA-manifest `appName` en branding-waarden uit config gebruiken.
3. Laat tokens-layer optioneel `primaryColor` overriden vanuit config.
4. **Definition of Done:**

   * Ten minste één visueel element (bijv. primary-knopkleur, app-titel) kan via config worden aangepast.
   * Geen breaking changes in bestaande themalogica.
5. Commit: `feat: basic app branding via config`.

**Resultaat:** Skeleton kan per PWA minimaal gebrand worden zonder codewijzigingen.

---

## Fase 22 – Testharness v1 (unit + minimal UI-tests)

**Doel:** Basis testinfrastructuur neerzetten.

1. Configureer Vitest (of andere gekozen runner) volledig:

   * test-script in `package.json`,
   * basisconfig (bijv. `vitest.config.ts`).

2. Schrijf minstens:

   * 1 test voor `shared/lib/` (bijv. storage, forms of api).
   * 1 test voor een eenvoudige UI-component (bijv. Button of Card).

3. Integreer tests in CI-achtige flow (minimaal via `npm run test`).

4. **Definition of Done:**

   * `npm run test` draait daadwerkelijk tests (geen pure echo meer).
   * Fout bij test faalt de build.

5. Commit: `chore: add basic testing infrastructure`.

**Resultaat:** Het skeleton is testbaar en heeft voorbeelden.

---

## Fase 23 – Code health & linting v2

**Doel:** Codekwaliteit consolideren zonder de functionaliteit te verstoren.

1. Richt ESLint (en eventueel Prettier) in met een mild maar nuttig basisprofiel.
2. Voeg `npm run lint` script toe dat echt linting uitvoert.
3. Los de belangrijkste lintissues op in core, shared libs en modules (zonder architectuurwijzigingen).
4. **Definition of Done:**

   * `npm run lint` is groen.
   * Geen zware rule-sets die het ontwikkelproces blokkeren.
5. Commit: `chore: enable eslint and fix core warnings`.

**Resultaat:** Codebasis is schoon genoeg voor schaalbare ontwikkeling.

---

## Fase 24 – Documentatie en examples-update

**Doel:** Documentatie op v2-niveau brengen.

1. Update `README.md` met:

   * korte uitleg Skeleton v2,
   * hoe een nieuwe PWA te maken vanaf deze skeleton,
   * verwijzingen naar `MODULE_AUTHOR_GUIDE.md`.

2. Actualiseer `SKELETON_V2_SCOPE.md` en dit `Skeleton_V2_Bouwpad.md` indien nodig met de realiteit.

3. Voeg desnoods een `docs/` map toe met één "Getting started with a new PWA" document.

4. **Definition of Done:**

   * Nieuwe dev kan vanuit README + Guide een PWA en module starten.

5. Commit: `docs: update skeleton v2 documentation`.

**Resultaat:** Skeleton v2 is begrijpelijk en inzetbaar voor anderen.

---

## Fase 25 – v2-freeze en tag

**Doel:** Skeleton v2 afronden en stabiliseren.

1. Handmatige check:

   * mobile/tablet UX met header/footer/menu,
   * Home-grid + widgets,
   * module-registry en Notes-module,
   * settings (globaal + module),
   * notificaties,
   * offline fallback,
   * PWA-install en basis offline gedrag,
   * test en lint groen.

2. Leg in `CHANGELOG.md` (of README) kort vast wat v2 toevoegt boven v1.

3. Maak Git-tag: `skeleton-v2.0.0`.

4. Architectuurwijzigingen na deze tag alleen via expliciet v2.x-plan; bugfixes toegestaan.

5. Commit: `chore: mark skeleton v2.0.0`.

**Resultaat:** Skeleton v2 is een stabiel, gedocumenteerd fundament voor de PWA Factory.

# Vue 3 + Vite

## Spotify

La ricerca nel catalogo usa Spotify Web API tramite il middleware server-side di Vite. Crea un'app nella [Dashboard Spotify for Developers](https://developer.spotify.com/dashboard), copia `.env.example` in `.env` e inserisci Client ID e Client Secret.

```bash
cp .env.example .env
npm run dev
```

Le credenziali restano nel server e non vengono mai inviate al browser. Il middleware e quindi la ricerca Spotify sono disponibili durante `npm run dev`; per una pubblicazione in produzione serve esporre lo stesso endpoint tramite un backend/serverless con le medesime variabili d'ambiente.

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

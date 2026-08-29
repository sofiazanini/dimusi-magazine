# Dimusi Magazine

**Dimusi** (dal fondersi di *Divino* e *Musica*) è un progetto editoriale transmediale che indaga la musica come rito, mito e manifestazione del divino nella contemporaneità. Non è una rivista di critica musicale: analizza l'impatto della musica sul subconscio collettivo e tratta l'ascolto come esperienza trascendentale, attraverso la tensione apollineo/dionisiaco.

Questo repository contiene il **doppio dionisiaco** del magazine cartaceo: la piattaforma web che affianca la rivista stampata, con due anime distinte:

- **Storytelling & presentazione** — landing page, glossario interattivo, archivio dei volumi
- **Diario personale** — un archivio privato e non social delle proprie *zidrise* (le melodie ossessive che riattivano ricordi)

Progetto sviluppato per la tesi triennale in Graphic Design & Multimedia nell'accademia LABA di Brescia.

---

## Concept

Il progetto ruota attorno a un **glossario** di 6 termini, usati come lente concettuale sia nell'editoriale cartaceo che nell'interfaccia digitale:

| Termine | Significato |
|---|---|
| **Zidrisa** | melodia breve e ossessiva che riattiva ricordi profondi — la colonna sonora del sé |
| **Kesond** | il mix di emozioni provate durante l'ascolto di una zidrisa |
| **Arkèlo** | il ricordo che riemerge grazie a una zidrisa |
| **Xalidèrno** | il ritorno alla realtà dopo l'immersione in una zidrisa |
| **Dimusi** | la ricerca ossessiva della zidrisa perfetta |
| **Skelo** | l'artista che ha prodotto la propria zidrisa principale |

Il **Volume 1 — "Dove il velo si lacera"** esplora il contrasto apollineo/dionisiaco nella musica contemporanea: ordine formale contro estasi caotica, testo contro musicalità, armonia contro irrazionale.

---

## Struttura del sito

```
/                 Landing — hero, manifesto, glossario a schermo intero, "Più grande"
/magazine         Archivio dei volumi cartacei
/magazine/vol-01  Dettaglio Volume 1, con sblocco contenuti via codice QR
/social           Profilo Rituale — diario personale delle zidrise, Affinità Elettive
```

La sezione `/social` è deliberatamente **anti-social**: nessun contatore di follower, nessuna griglia pubblica, nessun feed. Il profilo è un diario verticale privato di default (`DiarioTimeline`), con un'unica finestra verso l'esterno — *Affinità Elettive* — che propone una sola connessione a settimana anziché un flusso continuo di contenuti.

---

## Stack tecnico

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** come build tool
- **Tailwind CSS v4**
- **GSAP** (ScrollTrigger, SplitText) per le animazioni scroll-driven
- **Vue Router** per la navigazione
- **Spotify Web API** per la ricerca live dei brani in fase di creazione di una zidrisa

---

## Funzionalità principali

- **Landing con animazioni scroll-driven**: manifesto animato, glossario a slide plein-écran con transizioni a "tendina", sezione visione con scroll orizzontale
- **Archivio volumi**: griglia dei numeri pubblicati/in arrivo, dettaglio volume con sblocco contenuti esclusivi tramite codice
- **Diario Zidrise**: creazione/modifica/eliminazione di ingressi, ricerca brani live su Spotify con autocomplete, tag personalizzati, filtri per archetipo (Apollineo/Dionisiaco) e tipo (Canzone/Album)
- **Affinità Elettive**: suggerimento settimanale di un profilo affine, con relativo diario in sola lettura
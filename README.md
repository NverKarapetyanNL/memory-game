# memory-game

Een interactieve Javascript Memory Game waarin spelers kaartparen moeten vinden. Het spel ondersteunt dynamische instellingen zoals kaarttypen, bordafmetingen en kleurschema's. Resultaten worden opgeslagen in een backend-database, inclusief spelvoorkeuren en scores.

---

## Features

- **Dynamische instellingen**:
    - Kies uit verschillende kaarttypen (letters, nummers, symbolen, afbeeldingen van honden/katten).
    - Pas de kleuren aan voor gesloten, open en gevonden kaarten.
    - Selecteer bordgrootte (4x4, 6x6, 8x8).

- **Backend-integratie**:
    - Voorkeuren worden opgeslagen in de database.
    - Spelscores worden opgeslagen na elke sessie.

- **Live timer**:
    - Houd de verstreken tijd en resterende tijd bij.
    - Dynamische voortgangsbalk.

- **Top vijf spelers**:
    - Bekijk een lijst van de beste scores.

---

## Installatie

### Backend
1. Clone de [backend repository](https://github.com/hanze-hbo-ict/memory-backend) of zorg dat de backend draait.
2. Configureer de backend met een werkende database (bijv. SQLite/MySQL).
3. Start de backend-server:
   ```bash
   php -S localhost:8000

### Frontend

Clone deze repository:
git clone [frontend repository](https://github.com/NverKarapetyanNL/memory-game)
Navigeer naar de frontend-map:
cd memory-game
Start een lokale server:
http-server .
Open de applicatie in je browser:

```shell
php -S localhost:8080
```

Gebruik
Start een nieuw spel:

Selecteer instellingen (kaarttype, bordgrootte, kleuren).
Klik op "Nieuw Spel".
Opslaan van voorkeuren:

Voorkeuren worden automatisch opgeslagen bij het starten van een spel.
E-mail bijwerken:

Gebruik het formulier in de zijbalk om je e-mailadres te updaten.
Top vijf bekijken:

Bekijk de top vijf spelers en hun scores in de zijbalk.
API Endpoints
De frontend communiceert met de volgende endpoints:

Voorkeuren opslaan:

POST /api/player/{playerId}/preferences
Opslaan van gebruikersvoorkeuren.
Spel opslaan:

POST /game/save
Opslaan van spelscores met:
json

{
"id": 1,
"score": 321,
"api": "dogs",
"color_found": "red",
"color_closed": "rebeccapurple"
}
Voorkeuren ophalen:

GET /api/player/{playerId}/preferences
Ophalen van eerder opgeslagen voorkeuren.

Technologieën
Frontend: HTML, CSS, JavaScript (modules)
Backend: PHP (met SQLite/MySQL database)
Hosting: Lokale server met http-server

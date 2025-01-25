## Leesopdracht 1

### Welke methode wordt er voornamelijk beschreven om een idee te krijgen bij de impact van JavaScript op webpagina's?

### Voer deze methode zelf ook uit in je browser en bekijk vier van je favoriete websites. Wat valt je op?

In hoofdstuk 2.5 van het proefschrift wordt voornamelijk de methode beschreven waarbij de browserontwikkelaarstools (
zoals Chrome DevTools) worden gebruikt om inzicht te krijgen in de impact van JavaScript op webpagina's. Deze methode
omvat het observeren van netwerkverzoeken, het analyseren van JavaScript-bestanden, het meten van laadtijden en het
gebruik van profileringshulpmiddelen om te zien hoe scripts de prestaties beïnvloeden.

### Uitvoering van de methode:

Ik heb deze methode toegepast op vier websites:

YouTube

Groot aantal netwerkverzoeken en scripts.
Hoge afhankelijkheid van JavaScript voor dynamische content zoals aanbevelingen en live updates.

Wikipedia

Zeer beperkt gebruik van JavaScript.
De pagina blijft functioneel zonder JavaScript, wat wijst op een sterke nadruk op toegankelijkheid.

Amazon

Veel JavaScript voor dynamische functies, zoals filters en productaanbevelingen.
Langere laadtijden door grote scriptbestanden.

Twitter

Volledige functionaliteit afhankelijk van JavaScript.
Hoge CPU-belasting vanwege live-updates en asynchrone interacties.

### Wat valt op:

Websites met complexe, interactieve elementen (zoals YouTube en Twitter) vertrouwen sterk op JavaScript en hebben hogere
laadtijden en CPU-gebruik.

Functionele, informatieve websites zoals Wikipedia gebruiken JavaScript spaarzaam en blijven bruikbaar zonder scripts.

De impact van JavaScript hangt sterk af van hoe het wordt geïmplementeerd: goed geoptimaliseerde scripts verbeteren de
ervaring, terwijl slecht geoptimaliseerde scripts prestaties en toegankelijkheid kunnen schaden.

## Leesopdracht 2

### Beschrijf één van de redenen die de schrijver noemt waardoor er andere talen dan JavaScript worden overwogen voor hetweb.

### Denk je dat dit inderdaad een belangrijke reden is om JavaScript te vervangen? Beargumenteer je antwoord.

In hoofdstuk 2.7 noemt de schrijver de "gebrekkige typeveiligheid" van JavaScript als een belangrijke reden waarom andere
talen overwogen worden voor het web. JavaScript is een dynamisch getypeerde taal, wat betekent dat fouten zoals
typefouten pas tijdens runtime zichtbaar worden. Dit kan leiden tot bugs die moeilijk te traceren zijn in grote,
complexe codebases. Talen zoals TypeScript en WebAssembly bieden een robuuster alternatief doordat ze statische
typecontrole en meer voorspelbare gedragspatronen hebben.

Mijn mening:

Ik denk dat dit inderdaad een belangrijke reden is om naar alternatieven te kijken. In moderne webontwikkeling, waarin
schaalbaarheid en onderhoudbaarheid van cruciaal belang zijn, kan het ontbreken van typeveiligheid leiden tot
inefficiënte workflows en hogere foutkansen. Hoewel JavaScript niet volledig vervangen zal worden vanwege zijn brede
adoptie en ecosysteem, maken alternatieven zoals TypeScript de taal veiliger en geschikter voor complexe projecten
zonder de voordelen van JavaScript op te geven.
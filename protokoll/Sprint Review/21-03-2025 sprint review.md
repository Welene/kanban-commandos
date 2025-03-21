# Mötesprotokoll (dagens datum)

## Närvarande

-   Stefan
-   David
-   Lam
-   Robin
-   Helene

## Protokoll

Vi har visat upp vad vi byggt för Jakob, och han var ganska nöjd. Vi pratade om att vårt arbete inom gruppen har fungerat bra och att vi hunnit väldigt långt. Jakob hade några synpunkter på förbättringar, såsom ett errormeddelande och några andra funktioner vi kunde förbättra. Vi frågade också efter nya funktionaliteter eftersom vi nästan hade tömt vår backlog. Han föreslog exempelvis en utökad adminfunktion och en desktop-version. Detta tog vi med oss in till sprintplaneringsmötet.

# Vad vi har gjort och visat:

Vi började med att sätta upp vårt repository, skapa våra första kodfiler och bygga upp de viktigaste sidorna, inklusive landningssidan, menyn, "Om oss"-sidan och registreringssidan. Vi har även implementerat en fungerande header och hamburgermeny.
Trots att detta är vår första sprint har vi redan identifierat och åtgärdat flera buggar, t.ex. i dropdown-korgen och texten i foodtruck-kartan. Vi har även justerat fontstorlekar.
Vi har slagit ihop vissa funktioner för att hålla koden renare, lagt till en menyfilterfunktion och sett till att local storage används på rätt sätt för att spara användardata. Vi har även förbättrat orderflödet genom att låta korgen automatiskt tömmas när en beställning görs.
Vi har alltså gått längre än planerat i denna första sprint, då det endast finns en user story kvar i backloggen.

## Alla issues

# Fixade buggar:

-   Bug-fix-on-dropdown-basket – Fix på dropdown-korgen
-   Fixing-text-in-foodtruck-map-selection – Fixade text i foodtruck-kartan
-   Logo-href-and-add-black-logo-icon – Fixade logolänk och lade till svart ikon

# Designförbättringar:

-   Smaller-font-aboutpage – Mindre fontstorlek på "Om oss"-sidan
-   About-Us-Fix – Fixade ytterligare saker på "Om oss"-sidan
-   Add-text-to-landingpage – Lade till text på landningssidan

# Funktionalitet & korg

-   BasketCount-function-when-items-added – Uppdaterade antal varor i korgen
-   Add-import-to-addToBasket.js – Lade till import i "addToBasket.js"
-   Remove-addToBasket-log – Tog bort onödig loggning i "addToBasket"
-   Switch-from-basket-to-receipt-etapage – Bytte vy från korg till kvitto på ETA-sidan
-   Remove-all-basket-items-function – Lade till funktion för att tömma korgen
-   Empty-orders-basket-function – Tömmer korgen vid beställning
-   Empty-order-page-when-empty-basket – Tom ordersida när korgen är tom
-   Basket-dropdown-overlay – Lade till en dropdown-overlay för korgen
-   Basket-summary-page – Skapade en sammanfattningssida för korgen

# Beställningar & kassaflöde:

-   Order-confirmation-function – Funktion för orderbekräftelse
-   Hide-login-requirement-ordering-food – Tog bort inloggningskravet vid beställning
-   Fix-make-new-order-btn-in-receipt – Fixade knappen för att göra en ny beställning på kvittosidan
-   Eta-time-function – Beräknar ETA för order
-   View-receipt-page – Lade till sida för att visa kvitto

# Sidor & navigation:

-   Register-page – Skapade registreringssida
-   Landing-page – Lade till landningssida
-   About-us-page – Skapade "Om oss"-sidan
-   Food-menu-page – Skapade menyn
-   Truck-location-page – Lade till foodtruck-lokaliseringssida
-   Create-header-content – Lade till sidhuvudinnehåll
-   Hamburger-nav-menu-overlay – Lade till overlay för hamburgermenyn

# Kodstruktur & setup:

-   Make-burgerInit-functions-into-one – Slog ihop initieringsfunktionerna för hamburgermenyn
-   Menu-filter-function – Lade till filterfunktion för menyn
-   Add-to-basket-function – Lade till funktion för att lägga till varor i korgen
-   Repository-setup – Initialiserade repository
-   Startcode-script.js – Grundläggande script för modulering av JavaScript
-   Create-setup-pages-for-javascript – Skapade sidor för JavaScript-setup
-   Get-set-local-storage – Lade till universala funktioner för att hantera local storage

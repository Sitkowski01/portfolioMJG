# MJGweb — strona studia

Witryna studia webowego MJGweb: prezentacja zespołu i realizacji, karty projektów
otwierane w oknie modalnym oraz kontakt. Ciemna, techniczna estetyka z animowanym
oświetleniem tła podążającym za kursorem.

**Na żywo:** [mjgweb.pl](https://mjgweb.pl)

## Co zawiera

- **Ekran wczytywania** z paskiem postępu i animowanym tekstem
- Prezentacja zespołu i realizacji studia
- **Karty projektów w oknie modalnym** — szczegóły bez opuszczania strony
- Animowane światło tła i drobne efekty interakcji
- Formularz kontaktowy — ⚠ zaślepka interfejsu, patrz „Czego tu nie ma"
- Osobna podstrona z polityką prywatności
- Menu mobilne i pełna responsywność

## Decyzje projektowe

**Bez frameworka.** Cała logika strony to **472 linie czystego JavaScriptu** —
Vite i Tailwind, nic więcej. Cztery sekcje treści i garść animacji nie potrzebują
drzewa komponentów ani wirtualnego DOM-u; React dołożyłby tu paczkę runtime'u do
strony, która nie ma stanu poza otwartym modalem. Cena tej decyzji jest realna:
nie ma komponentów do wielokrotnego użycia, a kontraktem między HTML-em a skryptem
są identyfikatory elementów — zmiana `id` w znaczniku psuje zachowanie po cichu.

**Ekran wczytywania odtwarza się raz.** Pierwsze wejście dostaje pełną sekwencję
z paskiem postępu. Powrót z podstrony polityki prywatności ją pomija: klasa
`mjgweb-skip-preloader` ustawiana na elemencie `html` **przed pierwszym malowaniem**
skraca też opóźnienia pojawiania się nagłówka (200 ms → 80 ms). Bez tego intro
odtwarzałoby się przy każdym kliknięciu w stopce — efektowne za pierwszym razem,
irytujące za trzecim.

**Animacje wejścia na `IntersectionObserver`, nie na nasłuchu przewijania.**
Obserwator odpala się raz na element i przestaje go śledzić. Nasłuch `scroll`
liczyłby pozycje przy każdej klatce przewijania, także dla sekcji dawno pokazanych.

**Projekty w modalu, nie na osobnych podstronach.** Odwiedzający przegląda realizacje
jedna po drugiej — przeładowanie strony przy każdej z nich gubiłoby pozycję
przewijania i wymuszało powrót do listy.

**Zgoda na cookies trzymana w `localStorage`**, nie w cookie — baner ma się nie
pokazywać ponownie, a sama zgoda nie musi wędrować na serwer.

## Czego tu nie ma

- **Treść jest w znacznikach.** Dodanie realizacji oznacza edycję `index.html`,
  a nie wpis w panelu. Dla strony wizytówkowej aktualizowanej kilka razy w roku to
  świadomy wybór; przy comiesięcznych zmianach sensowniejszy byłby CMS.
- **Brak testów automatycznych.** Strona nie ma logiki biznesowej poza otwieraniem
  modala i banerem zgody.
- 🔴 **Formularz kontaktowy nie wysyła wiadomości.** `submit` jest przechwytywany,
  po 1,5 sekundy pojawia się ekran potwierdzenia — i na tym koniec. To zaślepka
  interfejsu, nie działający kanał kontaktu; realny kontakt idzie przez adres
  i telefon w stopce. Podpięcie usługi pocztowej albo własnego punktu końcowego
  to jedna funkcja w `src/main.js` w miejscu `setTimeout`.

## Stack

| Warstwa | Technologie |
|---|---|
| Build | Vite 5 |
| Język | JavaScript (bez frameworka) |
| Style | Tailwind CSS 3 |
| Strony | `index.html`, `polityka.html`, `portfoliozzdjecia.html` |

## Uruchomienie

```bash
npm i
npm run dev       # serwer deweloperski
npm run build     # build produkcyjny do ./dist
npm run preview   # podgląd builda
```

## Struktura

```
index.html               strona główna — sekcje, karty projektów, kontakt
polityka.html            polityka prywatności
portfoliozzdjecia.html   galeria realizacji
src/main.js              całość logiki: preloader, modal, obserwator animacji,
                         menu mobilne, światło tła, baner zgody
src/style.css            warstwa Tailwinda + style własne
```

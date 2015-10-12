# js.angular.final

Specyfikacja projektu: Klient email

4 ekrany:
1.	Lista odebranych emaili
2.	Lista wysłanych emaili
3.	Podgląd emaila
4.	Tworzenie nowego emaila
5.	Konfiguracja

Każdy ekran wyświetlany jest w miejscu poprzedniego. Mają być one dostępne przez routing:
/#/inbox - odebrane maile
/#/sent - wysłane maile
/#/view/:emailId - podgląd emaila
/#/create - nowy email
/#/create/:emailId - tworzenie nowego maila (jako odpowiedź na maila z emailId)
/#/config - ekran konfiguracji


Lista Emaili
1.	Użytkownik powinien móc wyświetlić wszystkie emaile
2.	Email może być przeczytany lub nie, nieprzeczytane powinny być wyróżnione na liście
3.	Na liście powinno być widać nadawcę, tytuł oraz fragment treści
4.	Lista powinna być posortowana wedle daty odebrania
5.	Lista powinna automatycznie odświeżać się co ustalony czas
6.	Użytkownik może usunąć element z listy (poprzez kliknięcie ikonki/guzika na danym rekordzie)
7.	Kliknięcie w tytuł wiadomości otwiera widok podglądu wiadomości (routing!)
8.	Zarówno maile odebrane jak i wysłane mają funkcję live search. Nad listą powinno znajdować się okienko wyszukiwania, po wpisaniu wyszukiwanej frazy, lista jest automatycznie zawężana do maili, których tytuł zawiera wyszukiwaną frazę. Pasujący fragment tytułu powinien zostać zaznaczony (np. Innym kolorem).
9.	Okienko wyszukiwarki powinno podpowiadać ostatnio wyszukane frazy
10.	Wyszukiwarka musi zostać zaimplementowana jako jedna dyrektywa. Użyta na dwóch osobnych ekranach (inbox i sent)

Podgląd wiadomości
1.	wyświetla informacje na temat emaila (nadawca, adresaci, temat, treść, data odbioru)
2.	Z tego poziomu można również usunąć wiadomość
Tworzenie wiadomości
1.	Formularz, pola w formularzu: adresaci (możliwość podania wielu adresów email), tytuł i treść
2.	Użytkownik musi wypełnić wszystkie pola zanim wyśle wiadomość
3.	Wszystkie podane emaile muszą mieć prawidłowy format
4.	Jeżeli próbuje wysłać niepełny formularz, nieprawidłowo wypełnione pola powinny zostać podkreślone
5.	Po wysłaniu, użytkownik jest przekierowywany do widoku "sent". Widok powinien być odświeżony aby pokazywać nową wiadomość
Konfiguracja
1.	Jedna opcja: Zmiana wiodącego kolor strony. Kilka kolorów do wyboru, użytkownik klika na wybrany, efekt ma być widoczny w czasie rzeczywistym! Ustawienia mają być zapisane w pamięci przeglądarki (localStorage) i automatycznie przywracane po restarcie aplikacji
2.	Druga opcja: Zmiana czasu odświeżania listy emaili. Użytkownik wprowadza liczbę minut definiując co ile aplikacja będzie odświeżać zawartość listy emaili
Odpowiadanie na maile
1.	 Z poglądu emaila użytkownik może kliknąć przycisk "Respond". To przekierowuje go na ekran tworzenia wiadomości. Ekran taki ma być już wypełniony odpowiednimi odbiorcami, tematem, oraz poprzednią treścią wiadomości.
2.	Akcja ta ma być oparta o routing!


SPECYFIKACJA API:
Włączony serwer będzie co jakiś czas (domyślnie co minutę) generował jednego nowe emaila.
Aktualna listy emaili i wysłanych zapisywane są w plikach w folderze server/data, w formacie JSON. Pliki można edytować, ale zawartość pliku musi być poprawnym kodem JSON.
OTRZYMANE EMAILE:
Pobierz emaile
GET /emails
Zwraca tablicę rekordów. Każdy rekord zawiera przynajmniej takie pola:
•	id - numer
•	read - boolean (czy przeczytany)
•	title- string
•	sender - string (adres email)
•	content - string
•	received - timestamp reprezentujący datę odbioru
Email może zawierać dodatkowe pola (jeżeli zadanie dodatkowe tego wymaga).
Uwaga! Żeby zasymulować działanie faktycznego serwera email, metoda ta, przy każdym wyświetleniu będzie dodawać 1-3 nowe, nieprzeczytane wiadomości

GET /emails/:emailId
Zwraca rekord emaila na podstawie przekazanego ID (pola jak wyżej)

Aktualizuj maila
PUT /emails/:emailId
:emailId - ID emaila który jest aktualizowany
Payload (przesłane dane): JSON zawierający obiekt z polami emaila, które mają być zaktualizowane. Nowe dane zostaną domergowane do istniejącego rekordu. Nowe wartości nadpiszą stare

Usuń maila
DELETE /emails/:emailId
Zwraca: Usunięty rekord

WYSŁANE:

GET /sent
Zwraca JSON z tablicą rekordów:
•	id
•	title
•	receivers - tablica stringów (adresów email)
•	content
•	sent - timestamp

POST /sent
Wysyła/tworzy nową wysłaną wiadomość.
Payload: JSON z rekordem wiadomość (patrz wyżej)
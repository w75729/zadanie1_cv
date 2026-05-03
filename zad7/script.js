// Numer indeksu: 75729 | Furkan Akgun

function zmienMotyw(kolor) {
    const link = document.getElementById('theme-link');
    if (link) { link.href = kolor + '.css'; }
}

function toggleSekcja() {
    const sekcja = document.getElementById('sekcja-projekty');
    if (sekcja) {
        if (sekcja.style.display === "none") {
            sekcja.style.display = "block";
        } else {
            sekcja.style.display = "none";
        }
    }
}


/* Zadanie 5: Walidacja formularza kontaktowego */
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Czyszczenie komunikatów o błędach
    document.getElementById('imie-error').innerText = "";
    document.getElementById('nazwisko-error').innerText = "";
    document.getElementById('email-error').innerText = "";
    document.getElementById('wiadomosc-error').innerText = "";
    document.getElementById('form-success').innerText = "";

    let isCorrect = true;

    // Pobieranie wartości z pól
    const valImie = document.getElementById('imie').value.trim();
    const valNazwisko = document.getElementById('nazwisko').value.trim();
    const valEmail = document.getElementById('email').value.trim();
    const valWiadomosc = document.getElementById('wiadomosc').value.trim();

    // Wyrażenia regularne (cyfry i e-mail)
    const regexDigits = /\d/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Walidacja pola Imię
    if (valImie === "" || regexDigits.test(valImie)) {
        document.getElementById('imie-error').innerText = "Podaj poprawne imię (bez cyfr).";
        isCorrect = false;
    }

    // Walidacja pola Nazwisko
    if (valNazwisko === "" || regexDigits.test(valNazwisko)) {
        document.getElementById('nazwisko-error').innerText = "Podaj poprawne nazwisko (bez cyfr).";
        isCorrect = false;
    }

    // Walidacja pola E-mail
    if (!regexEmail.test(valEmail)) {
        document.getElementById('email-error').innerText = "Podaj poprawny adres e-mail.";
        isCorrect = false;
    }

    // Walidacja pola Wiadomość
    if (valWiadomosc === "") {
        document.getElementById('wiadomosc-error').innerText = "Wiadomość nie może być pusta.";
        isCorrect = false;
    }

    // Jeśli wszystko ok
    if (isCorrect) {
        document.getElementById('form-success').innerText = "Formularz został wysłany!";
        document.getElementById('contact-form').reset();
    }
});


/* Zadanie 6: Pobieranie danych z pliku JSON i dynamiczne budowanie list */
document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Błąd podczas wczytywania pliku JSON");
            }
            return response.json();
        })
        .then(data => {
            // Budowanie listy umiejętności na podstawie JSON
            const skillsUl = document.getElementById('lista-umiejetnosci');
            if (skillsUl) {
                data.skills.forEach(skill => {
                    let li = document.createElement('li');
                    li.textContent = skill;
                    skillsUl.appendChild(li);
                });
            }

            // Budowanie listy projektów na podstawie JSON
            const projectsUl = document.getElementById('lista-projektow');
            if (projectsUl) {
                data.projects.forEach(project => {
                    let li = document.createElement('li');
                    li.textContent = project;
                    projectsUl.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error("Wystąpił błąd podczas ładowania danych (Zadanie 6):", error);
        });
});



/* Zadanie 7: Local Storage */

// Ładuje dane przy starcie strony
document.addEventListener('DOMContentLoaded', wyswietlNotatki);

function dodajNotatke() {
    const input = document.getElementById('input-notatka');
    const tekst = input.value.trim();

    if (tekst === "") {
        alert("Pole nie może być puste!");
        return;
    }

    // Pobieranie starych danych z localStorage
    let notatki = JSON.parse(localStorage.getItem('moje_notatki')) || [];
    
    // Dodawanie nowej notatki
    notatki.push(tekst);
    
    // Zapisywanie w formacie JSON string
    localStorage.setItem('moje_notatki', JSON.stringify(notatki));

    input.value = "";
    wyswietlNotatki();
}

function wyswietlNotatki() {
    const lista = document.getElementById('lista-notatek');
    if (!lista) return;

    // Odczyt danych i zamiana na tablice
    const notatki = JSON.parse(localStorage.getItem('moje_notatki')) || [];
    lista.innerHTML = "";

    notatki.forEach((notatka, index) => {
        const li = document.createElement('li');
        li.style.marginBottom = "5px";
        li.innerHTML = `
            ${notatka} 
            <button onclick="usunNotatke(${index})" style="margin-left: 10px; color: red; cursor: pointer; border: none; background: none;">[Usuń]</button>
        `;
        lista.appendChild(li);
    });
}

function usunNotatke(index) {
    let notatki = JSON.parse(localStorage.getItem('moje_notatki')) || [];
    
    // Usuwanie elementu z tablicy
    notatki.splice(index, 1);
    
    // Aktualizacja localStorage
    localStorage.setItem('moje_notatki', JSON.stringify(notatki));
    
    wyswietlNotatki();
}

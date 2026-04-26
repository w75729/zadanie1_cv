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

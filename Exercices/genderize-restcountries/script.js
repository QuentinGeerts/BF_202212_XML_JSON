// Récupération des URL vers les API
// Utilisation d'un pattern pour le nom et le pays (A remplacer par leurs valeurs respectives)
const genderize_api = `https://api.genderize.io/?name=__name__&country_id=__country__`;
const countries_api = `https://restcountries.com/v3.1/all`;

window.onload = function () {
    // Initialisation de la liste des pays
    callAPI(countries_api, (response) => getCountries(response));

    // Vérification de l'entrée de l'utilisateur
    document.forms.myForm.addEventListener('input', checkUserInput);

    // Récupération des informations par rapport au prénom et pays
    document.getElementById('check').onclick = checkGenderize;
    document.forms.myForm.onsubmit = (e) => { e.preventDefault(); checkGenderize(); };

};

function checkGenderize () {
    const country = document.getElementById('country');
    const name = document.getElementById('firstname');

    // Si les champs sont vides, on ne fait rien
    if (name.value.trim() === "" || country.value.trim() === "") return;

    // Récupération du pays sélectionné par rapport à la liste des options ; petit tips :-)
    const selectedCountry = country.options[country.selectedIndex].text;

    callAPI(
        genderize_api
            .replace('__name__', name.value)
            .replace('__country__', country.value),
        (genderizeInfo) => getGenderize({ countryName: selectedCountry, ...genderizeInfo })
    );
};


// Création d'une fonction d'appel API générique
function callAPI (URL, callback) {

    const xhr = new XMLHttpRequest();
    xhr.open('get', URL);

    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };

    xhr.send();
}

// Création des différentes options du SELECT des pays
function getCountries (countries) {
    const select = document.getElementById('country');

    // Permet de trier de manière alphabétique sur le nom français
    countries.sort((a, b) => {
        if (a.translations.fra.common < b.translations.fra.common) return -1;
        else if (a.translations.fra.common > b.translations.fra.common) return 1;
        else return 0;
    });

    // Création des options
    for (const country of countries) {
        const option = document.createElement('option');
        option.setAttribute('value', country.cca2);
        option.textContent = country.translations.fra.common;
        select.appendChild(option);
    }
}

// Vérification de l'entrée de l'utilisateur
function checkUserInput () {
    const btn = document.getElementById('check');
    const select = document.getElementById('country')
    const input = document.getElementById('firstname')

    // Si le champ est vide → désactivation du bouton
    // Méthode trim permet de retirer les espaces à gauche et à droite de la chaine de caractères
    if (input.value.trim() === "" || select.value.trim() === "") {
        btn.setAttribute('disabled', '');
    }
    else {
        btn.removeAttribute('disabled');
    }

}

// Affichage des données récupérées par Genderize 
function getGenderize (genderizeInfo) {
    const resultDiv = document.getElementById('result');

    if (genderizeInfo.probability) {
        resultDiv.innerHTML = `<p>Résultat pour ${genderizeInfo.name} en ${genderizeInfo.countryName}</p>`;
        resultDiv.innerHTML += `<p>Probabilité de ${genderizeInfo.probability * 100}% de sexe ${genderizeInfo.gender === "male" ? "masculin" : "féminin"}</p>`;
        resultDiv.innerHTML += `<p>Il y a environs ${genderizeInfo.count} personnes du prénom de ${genderizeInfo.name}.</p>`;
    }
    else {
        resultDiv.innerHTML = `<p>Aucune donnée trouvée.</p>`;
    }

}
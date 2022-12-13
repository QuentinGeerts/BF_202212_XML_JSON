const xhr = new XMLHttpRequest();

xhr.onload = function () {

    // Convertir le format string en format JSON

    const classe = JSON.parse(xhr.responseText);

    generate(classe);

};

xhr.open('get', 'stagiaires.json');
xhr.send();


function generate (classe) {

    const stagiairesTab = document.getElementById('stagiaires');
    const infoFormateur = document.getElementById('info-formateur');

    // Destructuration
    const { formateur, stagiaires } = classe;

    const [el1, el2] = stagiaires
    console.log('el1 :>> ', el1);
    console.log('el2 :>> ', el2);

    console.log('formateur :>> ', formateur);
    console.log('stagiaires :>> ', stagiaires);

    infoFormateur.innerText = `Formateur : ${formateur.prenom} ${formateur.nom} de chez ${formateur.societe}`; 

    for (const stagiaire of stagiaires) {

        const row = document.createElement('tr')
        const nom = document.createElement('td')
        const prenom = document.createElement('td')
        const present = document.createElement('td')

        nom.innerText = stagiaire.nom
        prenom.innerText = stagiaire.prenom
        present.innerText = stagiaire.present ? '✅' : '❌';

        stagiairesTab.appendChild(row);
        row.appendChild(nom)
        row.appendChild(prenom)
        row.appendChild(present)
        
    }


}
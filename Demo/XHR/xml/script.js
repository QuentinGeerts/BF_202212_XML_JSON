
window.onload = initXHR;

function initXHR () {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState === xhr.DONE && this.status == 200) {

            const docXML = xhr.responseXML;

            const animeList = getAllAnimes(docXML);

            generateRow(animeList);
        }

    };

    xhr.open('get', 'animelist.xml');
    xhr.send();
}

function getAllAnimes (xml) {

    // Récupération de la liste des balises "anime"
    const animes = xml.getElementsByTagName('anime');
    const animeList = [];

    for (const anime of animes) {

        // console.log(anime);
        // const title = anime.getElementsByTagName('series_title')[0].textContent
        const title = anime.querySelector('series_title').textContent;
        const type = anime.querySelector('series_type').textContent;
        const episodesMax = anime.querySelector('series_episodes').textContent;

        animeList.push({ title, type, episodesMax });
    }

    return animeList;
}

function generateRow (animes) {
    const content = document.getElementById('content');

    for (const anime of animes) {
        // Création des éléments du tableau
        const animeRow = document.createElement('tr');
        const animeTitle = document.createElement('td')
        const animeType = document.createElement('td')
        const animeEpisodes = document.createElement('td')

        // Paramétrer les éléments HTML
        animeTitle.innerText = anime.title;
        animeType.innerText = anime.type;
        animeEpisodes.innerText = anime.episodesMax;

        // Ajouter les enfants aux parents
        animeRow.appendChild(animeTitle)
        animeRow.appendChild(animeType)
        animeRow.appendChild(animeEpisodes)
        content.appendChild(animeRow)
    }
}
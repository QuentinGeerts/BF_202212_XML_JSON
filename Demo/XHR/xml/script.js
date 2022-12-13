
window.onload = initXHR;

function initXHR () {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState === xhr.DONE && this.status == 200) {

            const docXML = xhr.responseXML

            getAllAnimes(docXML);
        }

    };

    xhr.open('get', 'animelist.xml');
    xhr.send();
}

function getAllAnimes(xml) {

    // Récupération de la liste des balises "anime"
    const animes = xml.getElementsByTagName('anime');

    for (const anime of animes) {
        
        // console.log(anime);
        // const title = anime.getElementsByTagName('series_title')[0].textContent
        const title = anime.querySelector('series_title').textContent
        console.dir(title);

    }

}
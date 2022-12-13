

window.onload = function () {

    // Création de l'objet XMLHttpRequest
    const xhr = window.XMLHttpRequest 
        ? new XMLHttpRequest 
        : new ActiveXObject('Microsoft.XMLHTTP')

    xhr.onreadystatechange = function () {
        // console.log(xhr);
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if (this.readyState === 4 && this.status === 200) {
        // if (this.readyState === xhr.DONE && this.statusText === "OK") {
            console.log(xhr);
            // console.log(xhr.responseText);
        }
    }

    // Paramétrer la requête
    // method: type de la requête : GET, POST, PUT, DELETE
    // url: chemin d'accès vers le serveur WEB ou le fichier
    // async: booléen (défault: true) requête synchrone ou asychrone
    // user: nom d'utilisateur pour l'authentification
    // psw: mot de passe pour l'authentification
    xhr.open('get', 'demo.txt')

    // Envoie de la requête
    // Prend un paramètre (payload) si besoin, par défaut (null)
    xhr.send()

}
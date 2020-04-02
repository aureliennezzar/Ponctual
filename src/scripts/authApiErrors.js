export function translateError(errorCode) {
    let translated = "";
    switch (errorCode.split("/")[1]) {
        case "email-already-exists":
            translated += "Ce mail existe déjà !"
            break;
        case "user-not-found":
            translated += "Vous avez rentré un mauvais email ou mot de passe. Veuillez réessayer."
            break;
        case "invalid-password":
            translated += "Mauvais mot de passe, il doit contenir au moins 6 caractères"
            break;
        case "wrong-password":
            translated += "Vous avez rentré un mauvais email ou mot de passe. Veuillez réessayer."
            break;
        case "too-many-requests":
            translated += "Vous avez tenté de vous connecter trop de fois, veuillez réessayer ultérieurement"
            break;
        case "invalid-email":
            translated += "Ce mail est invalide !"
            break;
        case "user-disabled":
            translated += "Ce compte à été désactivé !"
            break;

        default:
            break;
    }
    return translated;
}
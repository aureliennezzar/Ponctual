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
        case "invalid-email":
            translated += "Ce mail est invalide !"
            break;
        default:
            break;
    }
    return translated;
}
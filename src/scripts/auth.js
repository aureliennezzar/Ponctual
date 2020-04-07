import { auth } from "./services/firebase";
import { Password } from "../scripts/generatePassword";
import firebase from 'firebase';

export async function signup(email, lname, fname, role, classe) {
    let password = Password(16);
    console.log(password)

    let createUser = firebase.functions().httpsCallable('createUser');

    let user = {
        firstName: fname,
        lastName: lname,
        password,
        email,
        classe,
        role
    };

    createUser(user)
        .then(function (resp) {
            //Display success
            console.log(resp.data.result);
        })
        .catch(function (error) {
            let code = error.code;
            let message = error.message;
            //Display error
            console.log(message,code);

        });
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signOut() {
    return auth().signOut()
}
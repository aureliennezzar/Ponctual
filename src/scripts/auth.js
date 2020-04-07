import { auth } from "./services/firebase";
import firebase from 'firebase';

const Password = (length) => new Array(length).fill().map(() => String.fromCharCode(Math.random() * 86 + 40)).join("")
export async function signup(email, lname, fname, role, classe) {

    const createUser = firebase.functions().httpsCallable('createUser');
    const sendMail = firebase.functions().httpsCallable('sendMail');
    const password = Password(16)
    const user = {
        firstName: fname,
        lastName: lname,
        email,
        password,
        classe,
        role
    };

    createUser(user)
        .then(function (resp) {
            //Display success
            console.log(resp.data.result);
        })
        .catch(function (error) {
            const code = error.code;
            const message = error.message;
            //Display error
            console.log("Error creating user",message,code);

        });
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signOut() {
    return auth().signOut()
}
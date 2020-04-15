import { auth } from "./services/firebase";
import firebase from 'firebase';


export async function signup(email, lname, fname, role, classe, telephone) {

    const createUser = firebase.functions().httpsCallable('createUser');
    const user = {
        firstName: fname,
        lastName: lname,
        email,
        classe,
        role,
        telephone
    };
    console.log(user)

    createUser(user)
        .then(function (resp) {
            //Display success
            console.log(resp.data.result);
        })
        .catch(function (error) {
            const code = error.code;
            const message = error.message;
            //Display error
            console.log("Error creating user", message, code);

        });
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
export function signOut() {
    return auth().signOut()
}
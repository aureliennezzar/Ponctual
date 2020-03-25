import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAGOyjkk8bS2cTccYyoKXbUKtE2T1t0LeU",
    authDomain: "ponctual-fbaf7.firebaseapp.com",
    databaseURL: "https://ponctual-fbaf7.firebaseio.com",
    projectId: "ponctual-fbaf7",
    storageBucket: "ponctual-fbaf7.appspot.com",
    messagingSenderId: "991220401938",
    appId: "1:991220401938:web:e8604c296a2c61c4e5d5cb"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
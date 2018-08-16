import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCqVjqpMNZ4k46WtiyFMx1G88yBNS-d-7M",
    authDomain: "crow-codding.firebaseapp.com",
    databaseURL: "https://crow-codding.firebaseio.com",
    projectId: "crow-codding",
    storageBucket: "crow-codding.appspot.com",
    messagingSenderId: "1022422549646"
};
const app = firebase.initializeApp(config);
const db = app.database()

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");

//example user
var dbUser = db

export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser}


// apiKey: "AIzaSyAYStRsZqUp9u5d6uJE2qXEa1A_0QsilWk",
// authDomain: "crowd-codding.firebaseapp.com",
// databaseURL: "https://crowd-codding.firebaseio.com",
// projectId: "crowd-codding",
// storageBucket: "crowd-codding.appspot.com",
// messagingSenderId: "852929625643"
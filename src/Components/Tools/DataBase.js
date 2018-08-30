import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCBoAOj04MWr_0EKVvIdV3l7jSK1p_3buU",
    authDomain: "crowd-coddingi3.firebaseapp.com",
    databaseURL: "https://crowd-coddingi3.firebaseio.com",
    projectId: "crowd-coddingi3",
    storageBucket: "crowd-coddingi3.appspot.com",
    messagingSenderId: "83095745342"
};
const app = firebase.initializeApp(config);
const db = app.database()

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");

//example user
var dbUser = db

export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser}

//extrallendo la informacion para Norma.
// var refJsonNorma = db.ref("JsonNorma");
// refAllUsers.on("value", (snapshot) => {
//     let users = snapshot.val();
//     var infoCosole = [];
//     for (let i = 0; i < users.length; i++) {
//         var postArray = [];
//         var seleccted = [];
//         for (let j = 0; j < users[i].User.PostAndCategory.Post.length; j++) {
//             var infoPost = {
//                 "1-post": users[i].User.PostAndCategory.Post[j].post, 
//                 "2-category":  users[i].User.PostAndCategory.Category[users[i].User.PostAndCategory.Post[j].category]
//             };
//             postArray.push(infoPost);
//             if(Number(users[i].User.PostAndCategory.Post[j].category) !== 0){
//                 seleccted.push(users[i].User.PostAndCategory.Post[j].category)
//             };
//         };
//         var infoArray = {
//             "1-Trabajador": users[i].User.UserInfo.Username,
//             "2-Post": postArray,
//             "3-Seleccionados": seleccted.length+ " de 185",
//             "4-Estado": users[i].User.UserState
//         };
//         infoCosole.push(infoArray);
//     };
//     refJsonNorma.set(infoCosole)
// });
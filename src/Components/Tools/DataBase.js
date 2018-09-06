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

//generating report
var refReport = db.ref("Report");
refAllUsers.on("value", (snapshot) => {
    let users = snapshot.val();
    var infoCosole = [];
    for (let i = 0; i < users.length; i++) {
        var seleccted = [];
        for (let j = 0; j < users[i].PostAndCategory.Post.length; j++) {
            if(users[i].PostAndCategory.Post[j].category !== "Select Category"){
                seleccted.push(users[i].PostAndCategory.Post[j].category)
            };
        };
        var infoArray = {
            "1-Worker": users[i].UserInfo.Username,
            "2-Post": users[i].PostAndCategory.Post,
            "3-Selected": seleccted.length+ " of "+users[i].PostAndCategory.Post.length,
            "4-State": users[i].UserState
        };
        infoCosole.push(infoArray);
    };
    refReport.set(infoCosole)
});
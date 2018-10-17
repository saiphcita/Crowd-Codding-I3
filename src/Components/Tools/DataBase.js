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

        var fancyTimeFormat = (time) =>{  
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = ~~time % 60;
          var ret = "";

          if (hrs > 0) {  ret += "" + hrs + ":" + (mins < 10 ? "0" : "");  };
          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          return ret;
        }

        var infoArray = {
            "1-Worker": users[i].UserInfo.Username,
            "2-Post": users[i].PostAndCategory.Post,
            "3-Selected": "Has "+seleccted.length+" categorized Posts of "+users[i].PostAndCategory.Post.length +" Posts.",
            "4-State": users[i].UserState,
            "5-WorkCode": users[i].UserInfo.NumberPay,
            "6-TimeWork": fancyTimeFormat(users[i].TimeWork)
        };
        infoCosole.push(infoArray);
    };
    refReport.set(infoCosole)
});
//extrallendo la informacion para Norma.
var refJsonNorma = db.ref("JsonNorma");
refAllUsers.on("value", (snapshot) => {
    let users = snapshot.val();
    var infoCosole = [];
    for (let i = 0; i < users.length; i++) {
        var postArray = [];
        var seleccted = [];
        for (let j = 0; j < users[i].User.PostAndCategory.Post.length; j++) {
            var infoPost = {
                "1-post": users[i].User.PostAndCategory.Post[j].post, 
                "2-category":  users[i].User.PostAndCategory.Category[users[i].User.PostAndCategory.Post[j].category]
            };
            postArray.push(infoPost);
            if(Number(users[i].User.PostAndCategory.Post[j].category) !== 0){
                seleccted.push(users[i].User.PostAndCategory.Post[j].category)
            };
        };
        var infoArray = {
            "1-Trabajador": users[i].User.UserInfo.Username,
            "2-Post": postArray,
            "3-Seleccionados": seleccted.length+ " de 185",
            "4-Estado": users[i].User.UserState
        };
        infoCosole.push(infoArray);
    };
    refJsonNorma.set(infoCosole)
    console.log(infoCosole)
});
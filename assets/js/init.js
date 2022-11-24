const auth = new Auth();

document.getElementById("loginlogout").addEventListener("click", (e) =>{
    if(document.getElementById("loginlogout").innerHTML == "LogOut"){
        auth.logOut();
    }
});

/*
document.querySelector(".logout").addEventListener("click", (e) =>{
    auth.logOut();
});
*/
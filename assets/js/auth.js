class Auth{
    constructor(){
        document.querySelector("body").style.display = "none"; // quitar un glitch que se muestra por algunos segundos la pagina. 
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);   
    }
    
    validateAuth(auth){
        if(auth != 1){
            window.location.replace("loginpage.html");

        }else{
            document.querySelector("body").style.display = "block";  // volver a mostrar la pagina cuano ya esta autenticado el user.
            document.getElementById("loginlogout").innerHTML = "LogOut";
        }
    }

    logOut(){
        localStorage.removeItem("auth");
        window.location.replace("\\");  
    }

}



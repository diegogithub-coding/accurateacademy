class Login {

    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.RESPONSE = null;
        this.validateonSubmit();
    }

    

    validateonSubmit(){
        let self = this;
        this.form.addEventListener("submit", (e) => {
            var error = 0;
            e.preventDefault();
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                //console.log(input.value); //just in case we want to bug the login credentials
                //console.log(document.querySelector(`#${field}`).type);
                if(self.validateFields(input) == false){ 
                    error++;
                }
            }); 
            
            if(error == 0){
                localStorage.setItem("auth",1);
                this.form.submit();
                console.log("sucess");
                //console.log(self.fields);
            }
        });
    }

    validateUsername(field){
        const JSONUserName = {
            UserName : field,
            Password : "0"
        }
        var resp = false;
        const jsonObjectToDataBase = JSON.stringify(JSONUserName);

        var xhr = new XMLHttpRequest();
        xhr.open("POST","https://script.google.com/macros/s/AKfycbzEZChqdROXWplKilkEElQOYUKmEV9E1zl_Si8XCa9OnoDa1hQ3HOkk1FIrAhOpH4tgxQ/exec",false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {

                console.log("USERNAME " + xhr.responseText.toLowerCase());
                resp =  xhr.responseText.toLowerCase() == "true" ? true : false ;

                
            }

        }

        xhr.send(jsonObjectToDataBase);
        
        
        return resp;

    }

    validatePassword(field){
        const JSONUserName = {
            UserName : "0",
            Password : field
        }
        var resp = false;
        const jsonObjectToDataBase = JSON.stringify(JSONUserName);

        var xhr = new XMLHttpRequest();
        xhr.open("POST","https://script.google.com/macros/s/AKfycbzEZChqdROXWplKilkEElQOYUKmEV9E1zl_Si8XCa9OnoDa1hQ3HOkk1FIrAhOpH4tgxQ/exec",false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {

                console.log("PASSWORD " + xhr.responseText.toLowerCase());
                resp =  xhr.responseText.toLowerCase() == "true" ? true : false ;
            }
        }
        
        xhr.send(jsonObjectToDataBase);
        return resp;
        
    }

    validateFields(field){

        if(field.value.trim() == ""){
            this.setStatus(field,`${field.previousElementSibling.innerText} cannot be blank`,"error");
            return false;
        } else {
            if(field.type == "text"){
                if(this.validateUsername(field.value)){ 
                    this.setStatus(field, null, "success");
  
                    console.log("ok username")
                    return true;
                } else { 
                    this.setStatus(field,`${field.previousElementSibling.innerText} wrong username`,"error");
                    return false;
                }               
            } else if (field.type == "password"){
                if(this.validatePassword(field.value)){     
                    this.setStatus(field, null, "success");

                    console.log("ok password")
                    return true;
                } else {
                    this.setStatus(field,`${field.previousElementSibling.innerText} wrong password`,"error");
                    return false;
                }

            }
        }
    }

    setStatus(field,message,status){
        const errorMessage = field.parentElement.querySelector(".error-message");

        if (status == "success"){
            if(errorMessage){
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }

        if(status == "error"){
            errorMessage.innerText = message;
            field.classList.add("input-error");
        }
    }
}


const form = document.querySelector(".loginForm");

if(form){
    const fields = ["username","password"];
    const validator = new Login(form, fields);
}
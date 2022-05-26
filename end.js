const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup",() => {
    //console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});
saveHighScore = e => {
    console.log("Clicked the save button");
    e.preventDefault();

    const score = {
        score : mostRecentScore,
        name : username.value,
        dateTime:  new Date(new Date().getTime()),//Math.floor((new Date()).getTime() / 1000) //+ new Date()
        exerciseName: "First Test" // NAME OF THE EXERCISE
    };
    
    const jsonObjectToDataBase = JSON.stringify(score);
    console.log(jsonObjectToDataBase);
    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://script.google.com/macros/s/AKfycbzsFWKxHn__b0jQESFPG5TOJu02rYhaka-7BmMijS_mKrp3qlfuFryfGLEotv98_uCI6Q/exec");
    //xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Content-Type,Accept"); 
    //xhr.setRequestHeader("Content-type", "application/json");
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:5500");
    //xhr.setRequestHeader("Access-Control-Allow-Origin","*");
    //xhr.setRequestHeader("Access-Control-Allow-Headers","Content-Type");
    //xhr.setRequestHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    //xhr.setRequestHeader("ccess-Control-Allow-Credentials","true");
    
    try{
        xhr.send(jsonObjectToDataBase);
    }catch(err){
        console.log("ERROR");
    }
    
    
    alert("Score SAVED!");
    //sleep(5000);
    
    // EN ESTA PAGINA HAY QUE CONECTAR G-SHEETS PARA PODER TENER LA DATA
    //window.location.assign("quiz.html"); 

    // investigar como ponerun mensjae que se envio el score. 

};


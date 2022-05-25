const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

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
        exerciseName: "First Test"
    };
    const jsonObjectToDataBase = JSON.stringify(score);
    console.log(jsonObjectToDataBase);
    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://script.google.com/macros/s/AKfycbyPCXPLHkePS09gIqkHBwpY3KAbISRIVqAMxVHn_ihbCOmld4W5Ws-_kAcUkKjD-dLHoA/exec",true);
    xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.setRequestHeader("Access-Control-Allow-Origin: true"); 
//     xhr.setRequestHeader("Access-Control-Allow-Credentials: true"); 
    xhr.withCredentials = true;
    xhr.send(jsonObjectToDataBase);
    
//     xhr.send(jsonObjectToDataBase);

     
    // EN ESTA PAGINA HAY QUE CONECTAR G-SHEETS PARA PODER TENER LA DATA
    //window.location.assign("quiz.html"); 

    // investigar como ponerun mensjae que se envio el score. 

};


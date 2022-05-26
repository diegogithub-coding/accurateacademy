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
    xhr.open("POST","https://script.google.com/macros/s/AKfycbzsFWKxHn__b0jQESFPG5TOJu02rYhaka-7BmMijS_mKrp3qlfuFryfGLEotv98_uCI6Q/exec");
    
    try{
        xhr.send(jsonObjectToDataBase);
    }catch(err){
        console.log("ERROR");
    }
    
    
    alert("Score SAVED!");

     

};


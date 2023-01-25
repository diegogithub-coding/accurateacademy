const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup',() => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore=(e)=>{
    console.log('Save HighScore Function Reached'); // for testing in the console
    console.log(username.value);                    // for testing int he console
    e.preventDefault();
    const data = {
        dateTime:  new Date(new Date().getTime()),   
        usernamef : username.value,
        score : mostRecentScore,
        level : 'A1',
        notopic : 'Past Simple Was Were Easy'
         
    };
    const jsonObjectToDataBase = JSON.stringify(data);
	console.log(jsonObjectToDataBase);
    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://script.google.com/macros/s/AKfycbw3ne_ovOY14t_-V4SIoaLmEl209vy2mRLWTcoaehUHosC0-lb612p4GXmtEbf26eQnHA/exec");
    
        try{
        xhr.send(jsonObjectToDataBase);
    }catch(err){
        console.log("ERROR");
    }
    
    
    alert("Score SAVED!");
};
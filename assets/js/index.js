
const songList = ["The Good Witch", "Coming of Age", "Watch", "Body Better", "Want You Back", "The Band and I", "You're Just a Boy (And I'm Kinda The Man)", "Lost the Breakup", "Wendy", "Run", "Two Weeks Ago", "BSC", "Therapy", "There It Goes", "History Of Man"];


function shuffle(array) {
let currentIndex = array.length, randomIndex;

// While there remain elements to shuffle.
while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}

return array;
}

songListRandom = shuffle(songList);
console.log(songListRandom);

// hide start button, show ranking container
let goButton = document.getElementById("go-button");
goButton.addEventListener("click", hide);
goButton.addEventListener("click", optionsDisplay(songListRandom[1], songListRandom[0]));

function hide() {
    goButton.style.display = 'none';
    document.getElementById("ranking-container").style.display = 'block'
}

// manages what options are displayed
function optionsDisplay(option1, option2) {
    document.getElementById("option1").innerHTML = option1;
    document.getElementById("option2").innerHTML = option2;
}

let button1 = document.getElementById("option1");
let button2 = document.getElementById("option2");

button1.addEventListener("click", function () {rankManager(button1);});
button2.addEventListener("click", function () {rankManager(button2);});

currentIndex = 1;
comparisonIndex = 0;

function rankManager(betterBody) {
    if (betterBody.innerHTML == songListRandom[currentIndex]) {
        // if comparing against first item and it is better, move to front of list
        if (comparisonIndex == 0) {
            songListRandom.splice(comparisonIndex, 0, songListRandom[currentIndex]);
            songListRandom.splice(currentIndex + 1, 1);
            
            // next song
            comparisonIndex = currentIndex;
            currentIndex++;
        }
        // current index is better, but not yet at front of list
        // decrease comparison index, display options again
        else {
            comparisonIndex--;
        }

    }
    else {
        // if current song is better than some far away index, insert
        if (currentIndex - comparisonIndex != 1) {
            songListRandom.splice(comparisonIndex + 1, 0, songListRandom[currentIndex]);
            songListRandom.splice(currentIndex + 1, 1);
        }
        // next song
        comparisonIndex = currentIndex;
        currentIndex++;
    }

    if (currentIndex < 15) {
        optionsDisplay(songListRandom[currentIndex], songListRandom[comparisonIndex]);
    }
    else {
        document.getElementById("ranking-container").style.display = "none";
        document.getElementById("results-container").style.display = "block";
        document.getElementById("go-button-div").style.marginTop = "80px";
        document.getElementById("heading").style.display = "none";
        resultsRender();
    }

    console.log(songListRandom)
}

const imgList = ["assets/img/pic1.jpg", "assets/img/pic2.png", "assets/img/pic3.png", "assets/img/pic4.png", "assets/img/pic5.png", "assets/img/pic6.jpg", "assets/img/pic7.png"]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

randomImg = imgList[getRandomInt(7)];
document.getElementById("maisie-img").setAttribute("src", randomImg);

function resultsRender(){
    for (let i = 0; i < 15; i++) {
        id = "rank" + (i+1);
        document.getElementById(id).innerHTML = songListRandom[i];
    }
}

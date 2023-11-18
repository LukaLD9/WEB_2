// konstante
const REBOUND = false; // zastavica koja omogućuje odbijanje asteroida od rubova platna
const ASTEROID_COUNT = 20; // za fiksno stvaranje asteroida, nema brisanja jer se odbijaju od rubova
const ASTEROID_SPAWN_TIME = 200; // za dinamičko stvaranje asteroida
const ASTEROID_DELETE_TIME = 20000; // za dinamičko brisaje asteroida

const ASTEROID_MIN_SIZE = 20;
const ASTEROID_MAX_SIZE = 40;
const ASTEROID_MIN_SPEED = 1;
const ASTEROID_MAX_SPEED = 5;
const ASTEROID_COLORS = ["#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#DCDCDC"]; // pet nijansi sive

const SPACESHIP_WIDTH = 30;
const SPACESHIP_HEIGHT = 30;
const SPACESHIP_SPEED_X = 5;
const SPACESHIP_SPEED_Y = 5;
const SPACESHIP_COLOR = "red";

var spaceship;
var asteroids = [];
var timer;
var highscore;

// funkcija koja se poziva na pocetku igre
function startGame() {
    myGameArea.start();
    // kreiraj svemirski brod
    spaceship = new Spaceship();

    if(REBOUND){
        // kreiraj asteroide fiksnog broja
        for (var i = 0; i < ASTEROID_COUNT; i++) {
            var asteroid = new Asteroid();
            asteroids.push(asteroid);
        }
    } else {
        // kreiraj asteroide dinamički
        setInterval(function() {
        var asteroid = new Asteroid();
            asteroids.push(asteroid);
        }, ASTEROID_SPAWN_TIME);

        // izbriši stare asteroide za dovoljno vrijeme da prođu preko platna
        setInterval(function() {
            asteroids.splice(0, 10);
        }, ASTEROID_DELETE_TIME);
    }
    // inicializiraj timer i highscore
    timer = 0;
    highscore = localStorage.getItem("highscore") || 0;
}

// objekt koji predstavlja platno na kojem se crta
var myGameArea = {
    // elementi za prikaz vremena i highscorea i platna
    highscoreDisplay : document.createElement("p"),
    timerDisplay : document.createElement("p"),
    canvas : document.createElement("canvas"),
    // funkcija koja se poziva na pocetku igre
    start : function() {
        this.timerDisplay.id = "timer";
        document.body.insertBefore(this.timerDisplay, document.body.childNodes[0]);

        this.highscoreDisplay.id = "highscore";
        document.body.insertBefore(this.highscoreDisplay, document.body.childNodes[0]);

        // kreiraj platno
        this.canvas.id = "myGameCanvas"
        this.canvas.width = window.innerWidth * 0.90;
        this.canvas.height = window.innerHeight * 0.80;
        this.canvas.style.border = "1px solid #000000";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);

        // dodaj event listenere za tipke za upravljanje svemirskim brodom
        this.keys = [];
        window.addEventListener('keydown',  e => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window,addEventListener('keyup', e => {
            var index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        });
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// klasa koja predstavlja svemirski brod
class Spaceship {
    // veličina svemirskog broda i brzina kretanja su konstante
    constructor() {
        this.width = SPACESHIP_WIDTH;
        this.height = SPACESHIP_HEIGHT;
        this.speed_x = SPACESHIP_SPEED_X;
        this.speed_y = SPACESHIP_SPEED_Y; 
        // na početku igre svemirski brod je u sredini platna
        this.x = myGameArea.canvas.width / 2;
        this.y = myGameArea.canvas.height / 2;
    }
    update() {
        var ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y); 
        ctx.fillStyle = SPACESHIP_COLOR;
        ctx.shadowBlur = 20;
        ctx.shadowColor = SPACESHIP_COLOR;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore(); 
    }

    newPos() {
        if (myGameArea.keys.indexOf('ArrowUp') > -1) {
            this.y -= this.speed_y;
        }
        if (myGameArea.keys.indexOf('ArrowDown') > -1) {
            this.y += this.speed_y;
        }
        if (myGameArea.keys.indexOf('ArrowLeft') > -1) {
            this.x -= this.speed_x;
        }
        if (myGameArea.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed_x;
        }

        if (this.x - this.width / 2 < 0)
            this.x = this.width / 2;
        else if ((this.x + this.width / 2) >= myGameArea.canvas.width) 
            this.x = myGameArea.canvas.width - this.width / 2;
        if (this.y - this.height / 2 < 0)
            this.y = this.height / 2;
        else if ((this.y + this.height / 2) >= myGameArea.canvas.height) 
            this.y = myGameArea.canvas.height - this.height / 2;
    }
}

// klasa koja predstavlja asteroide
class Asteroid {
    // veličina asteroida, brzina kretanja i boja su nasumično odabrani
    

    constructor() {
        this.width = Math.random() * (ASTEROID_MAX_SIZE - ASTEROID_MIN_SIZE + 1) + ASTEROID_MIN_SIZE;
        this.height = Math.random() * (ASTEROID_MAX_SIZE - ASTEROID_MIN_SIZE + 1) + ASTEROID_MIN_SIZE;
        this.color = ASTEROID_COLORS[Math.floor(Math.random() * ASTEROID_COLORS.length)];
       
        var radnom = Math.random();
        if(radnom > 0.5){
            this.speed_x = Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            this.x = Math.floor(Math.random() * (- 300 + 1));
        } else {
            this.speed_x = -Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            this.x = Math.floor(Math.random() * (300 + 1) + myGameArea.canvas.width);
        }
        var radnom = Math.random();
        if(radnom < 0.5){
            this.speed_y = Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            this.y = Math.floor(Math.random() * (- 300 + 1));
        } else {
            this.speed_y = -Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            this.y = Math.floor(Math.random() * (300 + 1) + myGameArea.canvas.height);
        }
        
    }
    update() {
        var ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y); 
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore(); 
    }
    newPos() {
        if(REBOUND){
            if (this.x - this.width / 2 < 0)
                this.speed_x = Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            else if ((this.x + this.width / 2) >= myGameArea.canvas.width) 
                this.speed_x = -Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            if (this.y - this.height / 2 < 0)
                this.speed_y = -Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            else if ((this.y + this.height / 2) >= myGameArea.canvas.height) 
                this.speed_y = Math.floor(Math.random() * (ASTEROID_MAX_SPEED - ASTEROID_MIN_SPEED + 1) + ASTEROID_MIN_SPEED);
            this.x += this.speed_x;
            this.y -= this.speed_y;
        } else {
            this.x += this.speed_x;
            this.y += this.speed_y;
        }
        
    }
}

// funkcija koja provjerava postoji li kolizija(sudar) između dva objekta
function checkCollision(first , second) {
    return (first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y
    );
}

// funkcija koja parsira milisekunde u format mm:ss:dd
function timeParser(time) {
    var minute = Math.floor(time / 60000);
    var sekunde = Math.floor((time - minute * 60000) / 1000);
    var desetinke = Math.floor((time - minute * 60000 - sekunde * 1000) / 10);
    var minuteString = minute < 10 ? "0" + minute : minute;
    var sekundeString = sekunde < 10 ? "0" + sekunde : sekunde;
    var desetinkeString = desetinke < 10 ? "0" + desetinke : desetinke;
    return minuteString + ":" + sekundeString + ":" + desetinkeString;
}

// funkcija koja se poziva svakih 20 ms i ažurira stanje igre
function updateGameArea() {
    myGameArea.clear();
    spaceship.newPos();
    spaceship.update();
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].newPos();
        asteroids[i].update();
    }
    for (var i = 0; i < asteroids.length; i++) {
        if(checkCollision(spaceship, asteroids[i])){
            myGameArea.stop();
            if(timer > highscore){
                localStorage.setItem("highscore", timer);
                myGameArea.highscoreDisplay.innerHTML = "Highscore: " + timer;
                alert("Igra je gotova!\nTvoje vrijeme je: " + timeParser(timer) + "\nNovi najbolji rezultat!");
            } else {
                alert("Igra je gotova!\nTvoje vrijeme je: " + timeParser(timer) + "\nNajbolje vrijeme je: " + timeParser(highscore));
            }
            window.location.reload();
        }
    }
    timer = timer + 20; // setInterval(updateGameArea, 20);
    myGameArea.timerDisplay.innerHTML = "Vrijeme: " + timeParser(timer);
    
    myGameArea.highscoreDisplay.innerHTML = "Najbolje vrijeme: " + timeParser(highscore);
}

// pokreni igru kada se stranica učita
window.addEventListener('load', function() {
    startGame();
});

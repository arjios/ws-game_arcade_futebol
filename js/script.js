
var pos = {
    posx: Number,
    posy: Number
};
pos.posx=150;
pos.posy=75;

const evt = document.addEventListener;
const angle = 2 * Math.PI;

var posLeft = 70;
var posRight = 70;

var r = 1;
var s = 1;

var c = document.getElementById("tela");
var ctx = c.getContext("2d");

function telaInit() {

    ctx.moveTo(10, 0);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineTo(10, 60);
    ctx.stroke();

    ctx.moveTo(10, 90);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineTo(10, 200);
    ctx.stroke();

    ctx.moveTo(290, 0);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineTo(290, 60);
    ctx.stroke();

    ctx.moveTo(290, 90);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineTo(290, 200);
    ctx.stroke();

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(13, posLeft, 3, 10);
    ctx.fill();

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(285, posRight, 3, 10);
    ctx.fill();

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    ctx.arc(150, 75, 1, 0, 2 * Math.PI);
    ctx.fill();

}

document.onkeydown = (e) => {
    var letra = e.key.toLowerCase();

    if(letra == "w") {
        posLeft=moveUpLeft(posLeft);
    }
    if(letra == "s") {
        posLeft=moveDownLeft(posLeft);
    }
    if(letra == "o") {
        posRight=moveUpRight(posRight);
    }
    if(letra == "k") {
        posRight=moveDownRight(posRight);
    }

}

function moveUpLeft(y) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(13, y, 3, 10);
    ctx.fill();
    y = moveUp(y);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(13, y, 3, 10);
    ctx.fill();
    return y;
}

function moveDownLeft(y) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(13, y, 3, 10);
    ctx.fill();
    y = moveDown(y);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(13, y, 3, 10);
    ctx.fill();
    return y;
}

function moveUpRight(y) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(285, y, 3, 10);
    ctx.fill();
    y = moveUp(y);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(285, y, 3, 10);
    ctx.fill();
    return y;
}

function moveDownRight(y) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(285, y, 3, 10);
    ctx.fill();
    y = moveDown(y);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(285, y, 3, 10);
    ctx.fill();
    return y;
}

function moveUp(py) {
    py--;
    py = limitGoalKeeper(py)
    return py;
}

function moveDown(py) {
    py++
    py = limitGoalKeeper(py)
    return py;
}

function limitGoalKeeper(ky) {
    if(ky > 80) {
        ky = 80;
    }

    if(ky < 60) {
        ky = 60;
    }
    return ky
}

function clearBall(x, y) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, angle);
    ctx.fill();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, angle);
    ctx.fill();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, angle);
    ctx.fill();
}

function paintBall(x, y) {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, angle);
    ctx.fill();
}

function calcPosition(posx, posy) {
    pos.posx = posx;
    pos.posy = posy;

    if((pos.posy >= posLeft && pos.posy <= (posLeft + 10)) && pos.posx >= 283) {
        if(r<0) {
            r = 1;
        } else {
            r = -1;
        }
        pos.posx = 280;
    }
    
    if((pos.posy >= posLeft && pos.posy <= (posLeft + 10)) && pos.posx <= 17) {
        console.log(pos.posy);
        console.log(pos.posx);
        if(r<0) {
            r=1;
        } else {
            r=-1;
        }
        pos.posx = 17;
    } 

    if(pos.posx < 13) {
        pos.posx = 13;
        r = 1;
        pos.posx++;
    }
    if(pos.posx > 286) {
        pos.posx = 286;
        r = -1;
        pos.posx--;
    }
    if(pos.posy < 1) {
        pos.posy = 1;
        s = +1;
        pos.posy++;
    }
    if(pos.posy > 149) {
        pos.posy = 149;
        s = -1;
        pos.posy--;
    }
    pos.posx = pos.posx + (1*r);
    pos.posy = pos.posy + (1*s);

    return pos;
}

function moveBall() {
    clearBall(pos.posx, pos.posy);
    pos = calcPosition(pos.posx, pos.posy);
    if(pos.posx == 280) {
        console.log(pos.posy);
        console.log(pos.posx);
    }
    if(pos.posx == 16) {
        console.log(pos.posy);
        console.log(pos.posx);
    }
    clearBall(pos.posx, pos.posy);
    paintBall(pos.posx, pos.posy);
}

telaInit();
clearBall(150, 75);
setInterval(moveBall, 10);

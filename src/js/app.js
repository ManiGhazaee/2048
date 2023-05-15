function move(element, direction, distance, duration, afterFunction) {
        let topOrLeft = direction == "left" || direction == "right" ? "left" : "top";
        let isNegated = direction == "up" || direction == "left";
        if (isNegated) {
                distance *= -1;
        }
        let elStyle = window.getComputedStyle(element);
        let value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
        let destination = Number(value) + distance;
        let frameDistance = distance / (duration / 10);
        function moveAFrame() {
                elStyle = window.getComputedStyle(element);
                value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
                var newLocation = Number(value) + frameDistance;
                var beyondDestination = (!isNegated && newLocation >= destination) || (isNegated && newLocation <= destination);
                if (beyondDestination) {
                        element.style[topOrLeft] = destination + "px";
                        clearInterval(movingFrames);
                        afterFunction();
                } else {
                        element.style[topOrLeft] = newLocation + "px";
                }
        }
        var movingFrames = setInterval(moveAFrame, 10);
}
const src = document;
let clientX;
let clientY;

src.addEventListener(
        "touchstart",
        (e) => {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
        },
        false
);

src.addEventListener(
        "touchend",
        (e) => {
                let deltaX;
                let deltaY;
                deltaX = e.changedTouches[0].clientX - clientX;
                deltaY = e.changedTouches[0].clientY - clientY;

                console.log(deltaX);
                console.log(deltaY);
                if (deltaY < 0 && deltaX < -deltaY && -deltaX < -deltaY) {
                        upCommand();
                } else if (deltaX > 0 && -deltaY < deltaX && deltaY < deltaX) {
                        rightCommand();
                } else if (deltaY > 0 && -deltaX < deltaY && deltaX < deltaY) {
                        downCommand();
                } else if (deltaX < 0 && -deltaY < -deltaX && deltaY < -deltaX) {
                        leftCommand();
                }
        },
        false
);

document.onkeydown = checkKey;
let bestScore = window.localStorage.getItem("bestScore");
if (bestScore != null) {
        document.getElementById("bestscore").innerHTML = bestScore;
}

function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == "38") {
                upCommand();
        } else if (e.keyCode == "40") {
                downCommand();
        } else if (e.keyCode == "37") {
                leftCommand();
        } else if (e.keyCode == "39") {
                rightCommand();
        }
}
document.addEventListener("keypress", (event) => {
        let restart = document.getElementById("restart");
        if (event.keyCode === 13 && restart.style.display !== "none") {
                reloadPage();
        }
});
let DIRECTION = "";
let ELCREATE = false;
let boxObject = {
        1: [0],
        2: [0],
        3: [0],
        4: [0],
        5: [0],
        6: [0],
        7: [0],
        8: [0],
        9: [0],
        10: [0],
        11: [0],
        12: [0],
        13: [0],
        14: [0],
        15: [0],
        16: [0],
};
let idOfBoxes = [
        [0, 0, 0, 0],
        [0, 5, 0, 0],
        [0, 0, 9, 0],
        [0, 0, 0, 0],
];
let listOfInstructions = [];
function leftCommand() {
        DIRECTION = "left";
        ELCREATE = false;
        for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                        if (idOfBoxes[i][j] !== 0 && idOfBoxes[i][j - 1] === 0) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                [idOfBoxes[i][j - 1], idOfBoxes[i][j]] = [idOfBoxes[i][j], idOfBoxes[i][j - 1]];
                                j -= 2;
                        } else if (
                                idOfBoxes[i][j - 1] !== 0 &&
                                idOfBoxes[i][j] !== 0 &&
                                document.getElementById("b" + idOfBoxes[i][j - 1]) != null &&
                                document.getElementById("b" + idOfBoxes[i][j]) != null &&
                                document.getElementById("b" + idOfBoxes[i][j - 1]).innerHTML === document.getElementById("b" + idOfBoxes[i][j]).innerHTML &&
                                boxObject[idOfBoxes[i][j - 1]].length !== 2
                        ) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                boxObject[idOfBoxes[i][j].toString()][1] = "double";
                                boxObject[idOfBoxes[i][j - 1].toString()][1] = "remove";
                                idOfBoxes[i][j - 1] = idOfBoxes[i][j];
                                idOfBoxes[i][j] = 0;
                                j -= 2;
                        }
                }
        }

        removesToArray();
}
function upCommand() {
        DIRECTION = "up";
        ELCREATE = false;
        for (let j = 0; j < 4; j++) {
                for (let i = 1; i < 4; i++) {
                        if (i < 1) {
                                continue;
                        }
                        if (idOfBoxes[i][j] !== 0 && idOfBoxes[i - 1][j] === 0) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                let temp = idOfBoxes[i][j];
                                idOfBoxes[i][j] = idOfBoxes[i - 1][j];
                                idOfBoxes[i - 1][j] = temp;
                                i -= 2;
                        } else if (
                                idOfBoxes[i - 1][j] !== 0 &&
                                idOfBoxes[i][j] !== 0 &&
                                document.getElementById("b" + idOfBoxes[i - 1][j]) != null &&
                                document.getElementById("b" + idOfBoxes[i][j]) != null &&
                                document.getElementById("b" + idOfBoxes[i - 1][j]).innerHTML === document.getElementById("b" + idOfBoxes[i][j]).innerHTML &&
                                boxObject[idOfBoxes[i - 1][j]].length !== 2
                        ) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                boxObject[idOfBoxes[i][j].toString()][1] = "double";
                                boxObject[idOfBoxes[i - 1][j].toString()][1] = "remove";
                                idOfBoxes[i - 1][j] = idOfBoxes[i][j];
                                idOfBoxes[i][j] = 0;
                                i -= 2;
                        }
                }
        }

        removesToArray();
}
function rightCommand() {
        DIRECTION = "right";
        ELCREATE = false;
        for (let i = 3; i >= 0; i--) {
                for (let j = 2; j >= 0; j--) {
                        if (idOfBoxes[i][j] !== 0 && idOfBoxes[i][j + 1] === 0) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                [idOfBoxes[i][j + 1], idOfBoxes[i][j]] = [idOfBoxes[i][j], idOfBoxes[i][j + 1]];
                                j += 2;
                        } else if (
                                idOfBoxes[i][j + 1] !== 0 &&
                                idOfBoxes[i][j] !== 0 &&
                                document.getElementById("b" + idOfBoxes[i][j + 1]) != null &&
                                document.getElementById("b" + idOfBoxes[i][j]) != null &&
                                document.getElementById("b" + idOfBoxes[i][j + 1]).innerHTML === document.getElementById("b" + idOfBoxes[i][j]).innerHTML &&
                                boxObject[idOfBoxes[i][j + 1]].length !== 2
                        ) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                boxObject[idOfBoxes[i][j].toString()][1] = "double";
                                boxObject[idOfBoxes[i][j + 1].toString()][1] = "remove";
                                idOfBoxes[i][j + 1] = idOfBoxes[i][j];
                                idOfBoxes[i][j] = 0;
                                j += 2;
                        }
                }
        }
        removesToArray();
}

function downCommand() {
        DIRECTION = "down";
        ELCREATE = false;
        for (let j = 3; j >= 0; j--) {
                for (let i = 2; i >= 0; i--) {
                        if (i > 2) {
                                continue;
                        }
                        if (idOfBoxes[i][j] !== 0 && idOfBoxes[i + 1][j] === 0) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                let temp = idOfBoxes[i][j];
                                idOfBoxes[i][j] = idOfBoxes[i + 1][j];
                                idOfBoxes[i + 1][j] = temp;
                                i += 2;
                        } else if (
                                idOfBoxes[i + 1][j] !== 0 &&
                                idOfBoxes[i][j] !== 0 &&
                                document.getElementById("b" + idOfBoxes[i + 1][j]) != null &&
                                document.getElementById("b" + idOfBoxes[i][j]) != null &&
                                document.getElementById("b" + idOfBoxes[i + 1][j]).innerHTML === document.getElementById("b" + idOfBoxes[i][j]).innerHTML &&
                                boxObject[idOfBoxes[i + 1][j]].length !== 2
                        ) {
                                boxObject[idOfBoxes[i][j].toString()][0] += 1;
                                boxObject[idOfBoxes[i][j].toString()][1] = "double";
                                boxObject[idOfBoxes[i + 1][j].toString()][1] = "remove";
                                idOfBoxes[i + 1][j] = idOfBoxes[i][j];
                                idOfBoxes[i][j] = 0;
                                i += 2;
                        }
                }
        }
        removesToArray();
}
let removes = [];
function removesToArray() {
        for (const key in boxObject) {
                if (boxObject[key].length === 2 && boxObject[key][1] === "remove") {
                        removes.push(key);
                }
        }
        movingWithBoxObject();
}

function movingWithBoxObject() {
        for (const key in boxObject) {
                if (boxObject[key].length === 1 && boxObject[key][0] === 0) continue;
                else if (boxObject[key].length === 1 && boxObject[key][0] !== 0) {
                        move(document.getElementById("b" + key), DIRECTION, boxObject[key][0] * 40 + boxObject[key][0] * 4, 100, () => {
                                coloring();
                                if (ELCREATE === false) {
                                        notInIdOfBoxes();
                                        ELCREATE = true;
                                }
                        });
                } else if (boxObject[key].length === 2 && boxObject[key][1] === "remove") {
                        move(document.getElementById("b" + key), DIRECTION, boxObject[key][0] * 40 + boxObject[key][0] * 4, 100, () => {});
                } else if (boxObject[key].length === 2 && boxObject[key][1] === "double") {
                        move(document.getElementById("b" + key), DIRECTION, boxObject[key][0] * 40 + boxObject[key][0] * 4, 100, () => {
                                let iHtml = document.getElementById("b" + key).innerHTML;
                                let score = document.getElementById("score").innerHTML;
                                score = Number(score);
                                iHtml = Number(iHtml);
                                iHtml *= 2;
                                score = score + iHtml;
                                score = score.toString();
                                iHtml = iHtml.toString();
                                document.getElementById("b" + key).innerHTML = iHtml;
                                document.getElementById("score").innerHTML = score;
                                coloring();
                                if (removes.length !== 0) {
                                        for (let i = 0; i < removes.length; i++) {
                                                if (document.getElementById("b" + removes[i]) != null) {
                                                        document.getElementById("b" + removes[i]).remove();
                                                }
                                        }
                                }
                                removes = [];
                                if (ELCREATE === false) {
                                        notInIdOfBoxes();
                                        ELCREATE = true;
                                }
                        });
                }
        }
        ValidChecker();
}
function ValidChecker() {
        for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                        if (idOfBoxes[i][j] === 0) {
                                resetBoxObject();
                                return true;
                        }
                }
        }
        for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                        let left = document.getElementById("b" + idOfBoxes[i][j].toString()).innerHTML;
                        let right = document.getElementById("b" + idOfBoxes[i][j + 1].toString()).innerHTML;
                        if (left === right) {
                                resetBoxObject();
                                return true;
                        }
                }
        }
        for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 4; j++) {
                        let up = document.getElementById("b" + idOfBoxes[i][j].toString()).innerHTML;
                        let down = document.getElementById("b" + idOfBoxes[i + 1][j].toString()).innerHTML;
                        if (up === down) {
                                resetBoxObject();
                                return true;
                        }
                }
        }
        console.log("lost");
        let score = document.getElementById("score").innerHTML;
        let bs = document.getElementById("bestscore").innerHTML;
        if (Number(score) > Number(bs)) {
                window.localStorage.setItem("bestScore", score);
                document.getElementById("bestscore").innerHTML = score;
        }
        document.getElementById("restart").style.display = "inline-block";
        return false;
}
function reloadPage() {
        window.location.reload();
}
function resetBoxObject() {
        boxObject = {
                1: [0],
                2: [0],
                3: [0],
                4: [0],
                5: [0],
                6: [0],
                7: [0],
                8: [0],
                9: [0],
                10: [0],
                11: [0],
                12: [0],
                13: [0],
                14: [0],
                15: [0],
                16: [0],
        };
}
let newIdPool = [];
let NEWID = "";
function notInIdOfBoxes() {
        let copy = JSON.parse(JSON.stringify(idOfBoxes));
        copy = copy.flat();
        for (let i = 1; i <= 16; i++) {
                if (copy.indexOf(i) === -1) {
                        newIdPool.push(i);
                }
        }
        randomGeneratedId();
}
function randomGeneratedId() {
        let random = Math.floor(Math.random() * newIdPool.length);
        NEWID = "b" + newIdPool[random];
        newIdPool = [];
        emptyIndexesFinder();
}
let emptyIndexes = [];
let NEWPOSITION;
function emptyIndexesFinder() {
        for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                        if (idOfBoxes[i][j] === 0) {
                                emptyIndexes.push([i, j]);
                        }
                }
        }
        randomGeneratedPostion();
}
function randomGeneratedPostion() {
        let random = Math.floor(Math.random() * emptyIndexes.length);
        let arr = emptyIndexes[random];
        emptyIndexes = []; // [i, j]
        NEWPOSITION = arr[0].toString() + arr[1].toString();
        addToIdOfBoxes();
}
function addToIdOfBoxes() {
        let arr = NEWID.split("");
        arr.shift("");
        let id = arr.join("");
        id = Number(id);
        idOfBoxes[NEWPOSITION[0]][NEWPOSITION[1]] = id;
        console.log(NEWPOSITION);
        console.log(NEWID);
        elementCreate();
        coloring();
}
let positionsByPixel = {
        "00": "top: 4px; left: 4px;",
        "01": "top: 4px; left: 48px;",
        "02": "top: 4px; left: 92px;",
        "03": "top: 4px; left: 136px;",
        10: "top: 48px; left: 4px;",
        11: "top: 48px; left: 48px;",
        12: "top: 48px; left: 92px;",
        13: "top: 48px; left: 136px;",
        20: "top: 92px; left: 4px;",
        21: "top: 92px; left: 48px;",
        22: "top: 92px; left: 92px;",
        23: "top: 92px; left: 136px;",
        30: "top: 136px; left: 4px;",
        31: "top: 136px; left: 48px;",
        32: "top: 136px; left: 92px;",
        33: "top: 136px; left: 136px;",
};
function elementCreate() {
        let element = document.createElement("div");
        let node = document.createTextNode("2");
        element.appendChild(node);
        let container = document.getElementById("container");
        container.appendChild(element);
        element.style.cssText = `display: inline-block; position: absolute; height: 40px; width: 40px; ${positionsByPixel[NEWPOSITION]} background-color: white; text-align: center; vertical-align: middle; line-height: 40px;`;
        element.setAttribute("id", NEWID);

        console.log(idOfBoxes);
}
function coloring() {
        let container = document.getElementById("container");
        let children = container.children;
        for (let i = 0; i < children.length; i++) {
                if (children[i].innerHTML === "4") {
                        children[i].style.backgroundColor = "rgb(102, 255, 255)";
                } else if (children[i].innerHTML === "8") {
                        children[i].style.backgroundColor = "rgb(77, 195, 255)";
                } else if (children[i].innerHTML === "16") {
                        children[i].style.backgroundColor = "rgb(0, 102, 255)";
                } else if (children[i].innerHTML === "32") {
                        children[i].style.backgroundColor = "rgb(51, 51, 204)";
                        children[i].style.color = "white";
                } else if (children[i].innerHTML === "64") {
                        children[i].style.backgroundColor = "rgb(102, 0, 255)";
                        children[i].style.color = "white";
                } else if (children[i].innerHTML === "128") {
                        children[i].style.backgroundColor = "rgb(153, 0, 255)";
                        children[i].style.color = "white";
                } else if (children[i].innerHTML === "256") {
                        children[i].style.backgroundColor = "rgb(204, 0, 255)";
                        children[i].style.color = "white";
                } else if (children[i].innerHTML === "512") {
                        children[i].style.backgroundColor = "rgb(255, 51, 204)";
                        children[i].style.color = "white";
                } else if (children[i].innerHTML === "1024") {
                        children[i].style.backgroundColor = "rgb(255, 0, 102)";
                        children[i].style.color = "white";
                } else if (children[i].innerHTML === "2048") {
                        children[i].style.backgroundColor = "rgb(255, 0, 0)";
                        children[i].style.color = "white";
                }
        }
}

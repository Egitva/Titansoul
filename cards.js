var draw = document.getElementById("draw");
var choose = document.getElementById("choose");
var counter = 1;
var canvase = document.getElementById("canvase");
var asidecode_talker = document.getElementById("aside");
deck = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F7",
    "F7",
    "F8",
    "F9",
    "F9",
    "F9",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F17",
    "F17",
    "F17",
]
aside = [
    "F15",
    "F16",
]
hand = []
choose_list = []
texto = `images/Cards/${deck[1]}.png`;
asidecode_talker = `<img class="carda" src='${texto}'>`;
draw.onclick = function() {
    if (deck.length > 0) {
        let texto = `images/Cards/undefined.png`;
    let randomChar = 0;
    while (texto === `images/Cards/undefined.png`) {
        randomChar = Math.floor(Math.random() * deck.length);
        texto = `images/Cards/${deck[randomChar]}.png`;
    };
    document.getElementById("cards").innerHTML += `<img class="carda" src='${texto}'>`;
    hand.push(deck[randomChar]);
    deck.splice(randomChar, 1);
    }
}
document.getElementById("cards").addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('carda')) {
        let clickedCardSrc = event.target.src;
        canvase.innerHTML += `<img class="carda" id="goyda" src='${clickedCardSrc}'>`;
        event.target.remove();
        let cardIdMatch = clickedCardSrc.match(/\/([^\/]+)\.png$/);
        if (cardIdMatch) {
            let cardId = cardIdMatch[1];
            let index = hand.indexOf(cardId);
            if (index !== -1) {
                hand.splice(index, 1);
            }
        }
    }
});
choose.onclick = function() {
    document.getElementById("opis").innerHTML = null;
    document.getElementById("opis").innerHTML += `<button class="cleared" id="clear" style="float: left;">CLOSE DECK</button>`;
    var clear = document.getElementById("clear");
    for (let i = 0; i < deck.length; i++) {
        if (deck.length > 0) {
            let texto = `images/Cards/undefined.png`;
            let randomChar = 0;
        while (texto === `images/Cards/undefined.png`) {
            randomChar = Math.floor(Math.random() * deck.length);
            texto = `images/Cards/${deck[randomChar]}.png`;
        };
        document.getElementById("opis").innerHTML += `<img class="carda" id="cho" src='${texto}'>`;
        choose_list.push(deck);
    }
}}
document.getElementById("opis").addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('carda')) {
        let clickedCardSrc = event.target.src;
        document.getElementById("cards").innerHTML += `<img class="carda" src='${clickedCardSrc}'>`;
        event.target.remove();
        let cardIdMatch = clickedCardSrc.match(/\/([^\/]+)\.png$/);
        if (cardIdMatch) {
            let cardId = cardIdMatch[1];
            let index = choose_list.indexOf(cardId);
            if (index !== -1) {
                choose_list.splice(index, 1);
            }
        }
    }
    if (event.target && event.target.classList.contains('cleared')) {
        document.getElementById("opis").innerHTML = null;
    }
});
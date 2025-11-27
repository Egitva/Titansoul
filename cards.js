var draw = document.getElementById("draw");
var choose = document.getElementById("choose");
var counter = 1;
var canvase = document.getElementById("canvase");
var ftoh = document.getElementById("ftoh");
const gridContainer = document.getElementById('grid-container');
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
nullI =[]
hand = []
choose_list = []
field = []
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
    document.getElementById("cards").innerHTML += `<img class="carda" id="${deck[randomChar]}" src='${texto}'>`;
    hand.push(deck[randomChar]);
    deck.splice(randomChar, 1);
    }
}
document.getElementById("cards").addEventListener('click', (event) => {
    if ((event.target && event.target.classList.contains('carda')) && (field.length < 4)) {
        let clickedCardSrc = event.target.src;
        field.push(event.target.id);
        hand.splice(event.target.id);
        const gridItem = document.createElement('div');
        gridItem.innerHTML = `<div class="dropdown" id="${event.target.id+"_d"+field.length}">
  		<img class="carda" id="${event.target.id+"_i"+field.length}" src='${clickedCardSrc}'>
  		<div class="dropdown-content">
    		<a href="#" class="nulla" id="${event.target.id+"_f"+field.length}">TO NULL</a>
    		<a href="#" class="handa" id="${event.target.id+"_f"+field.length}">TO HAND</a>
            <a href="#" class="taper" id="${event.target.id+"_f"+field.length}">TAP</a>
  		</div>
	</div>`;
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
ftoh.onclick = function() {
    ftoh.classList.add('buttonActive');
};
document.getElementById("canvase").addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('nulla')) {
        let clickedCardSrc = document.getElementById(event.target.id.replace('f', 'i')).src;
        document.getElementById("nullI").innerHTML += `<img class="carda" id="${event.target.id.slice(0, -3)}" src='${clickedCardSrc}'>`;
        nullI.push(event.target.id.slice(0, -3), 1);
        field.splice(event.target.id.slice(0, -3), 1);
        document.getElementById(event.target.id.replace('f', 'd')).remove();
        let cardIdMatch = clickedCardSrc.match(/\/([^\/]+)\.png$/);
        if (cardIdMatch) {
            let cardId = cardIdMatch[1];
            let index = choose_list.indexOf(cardId);
            if (index !== -1) {
            }
        }
    }
    if (event.target && event.target.classList.contains('handa')) {
        let clickedCardSrc = document.getElementById(event.target.id.replace('f', 'i')).src;
        document.getElementById("cards").innerHTML += `<img class="carda" id="${event.target.id.slice(0, -3)}" src='${clickedCardSrc}'>`;
        hand.push(event.target.id.slice(0, -3), 1);
        field.splice(event.target.id.slice(0, -3), 1);
        document.getElementById(event.target.id.replace('f', 'd')).remove();
        let cardIdMatch = clickedCardSrc.match(/\/([^\/]+)\.png$/);
        if (cardIdMatch) {
            let cardId = cardIdMatch[1];
            let index = choose_list.indexOf(cardId);
            if (index !== -1) {
            }
        }
    }
    if (event.target && event.target.classList.contains('taper')) {
        document.getElementById(event.target.id.replace('f', 'i')).classList.add('tap');
    }
});
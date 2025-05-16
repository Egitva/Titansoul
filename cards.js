var draw = document.getElementById("draw");
var counter = 1;
var canvase = document.getElementById("canvase");
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
]
hand = []
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
        canvase.innerHTML += `<img class="carda" src='images/Cards/F10.png'>`;
    }
});

var draw = document.getElementById("draw");
var choose = document.getElementById("choose");
var counter = 1;
var canvase = document.getElementById("canvase");
var ftoh = document.getElementById("ftoh");
const gridContainer = document.getElementById('grid-container');

// Canvas setup
var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
canvas.style.border = '1px solid black';
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

deck = [
    "KR001-00",
    "KR001-00",
    "KR001-00",
    "KR003-00",
    "KR003-00",
    "KR004-00",
    "KR004-00",
    "KR005-00",
    "KR005-00",
    "KR007-00",
    "KR007-00",
    "KR007-00",
    "KR008-00",
    "KR009-00",
    "KR009-00",
    "KR009-00",
    "KR010-00",
    "KR010-00",
    "KR010-00",
    "KR011-00",
    "KR011-00",
    "KR011-00",
    "KR012-00",
    "KR013-00",
    "KR013-00",
    "KR013-00",
    "KR014-00",
    "KR014-00",
    "KR015-00",
    "KR015-00",
];
aside = ["KR016-00"];
lead = ["KR002-00", "KR016-00"];
nullI = [];
hand = [];
choose_list = [];
field = [];

// Card dimensions and positions
const cardWidth = 80;
const cardHeight = 120;
const cardSpacing = 10;

// Card positions
let handCards = [];
let fieldCards = [null, null, null, null]; // 4 zones
let nullCards = [];
let asideCards = aside.map(id => ({id, selected: false, tapped: false}));
let chooseCards = [];

// Drag and drop variables
let isDragging = false;
let draggedCardIndex = -1;
let dragOffsetX = 0;
let dragOffsetY = 0;
let draggedImage = null;
let mouseX = 0;
let mouseY = 0;

// Load card images
let cardImages = {};
let cardImagesNull = {};
let imagesLoaded = 0;
const totalImages = [...new Set([...deck, ...aside, ...lead, ...nullI])].length;

function loadCardImages() {
    const uniqueCards = [...new Set([...deck, ...aside, ...lead, ...nullI])];

    uniqueCards.forEach(cardId => {
        const img = new Image();
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                console.log('All card images loaded');
                render();
            }
        };
        img.onerror = () => {
            console.warn(`Failed to load image for card: ${cardId}`);
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                render();
            }
        };
        img.src = `images/Cards/${cardId}.png`;
        cardImages[cardId] = img;
        cardImagesNull[cardId] = img;
    });
}


// Modal for choosing cards from deck
function showChooseModal(fromwhere) {
    let modal = document.getElementById('choose-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'choose-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        document.body.appendChild(modal);
    }
    modal.innerHTML = '';
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '20px';
    content.style.borderRadius = '10px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';
    modal.appendChild(content);

    const title = document.createElement('h2');
    title.textContent = 'Choose cards from deck';
    content.appendChild(title);

    const cardsContainer = document.createElement('div');
    cardsContainer.style.display = 'flex';
    cardsContainer.style.flexWrap = 'wrap';
    cardsContainer.style.justifyContent = 'center';
    content.appendChild(cardsContainer);

    let selectedCards = [];

    deck.forEach((cardId, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.style.margin = '5px';
        cardDiv.style.display = 'flex';
        cardDiv.style.flexDirection = 'column';
        cardDiv.style.alignItems = 'center';
        cardDiv.style.cursor = 'pointer';
        cardDiv.style.border = '2px solid transparent';
        cardsContainer.appendChild(cardDiv);
        if (fromwhere == 1){
            const img = document.createElement('img');
            img.src = cardImages[cardId] ? cardImages[cardId].src : '';
            img.style.width = '60px';
            img.style.height = '90px';
            cardDiv.appendChild(img);
        }
        else if (fromwhere == 0){
            const img = document.createElement('img');
            img.src = cardImagesNull[cardId] ? cardImagesNull[cardId].src : '';
            img.style.width = '60px';
            img.style.height = '90px';
            cardDiv.appendChild(img);
        }

        cardDiv.onclick = () => {
            if (selectedCards.includes(index)) {
                selectedCards = selectedCards.filter(i => i !== index);
                cardDiv.style.border = '2px solid transparent';
            } else {
                selectedCards.push(index);
                cardDiv.style.border = '2px solid yellow';
            }
        };
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.marginTop = '20px';
    content.appendChild(buttonsDiv);

    const handBtn = document.createElement('button');
    handBtn.textContent = 'Add Selected to Hand';
    handBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const cardId = deck.splice(index, 1)[0];
            handCards.push({
                id: cardId,
                selected: false,
                tapped: false
            });
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(handBtn);

    const nullBtn = document.createElement('button');
    nullBtn.textContent = 'Add Selected to Null';
    nullBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const cardId = deck.splice(index, 1)[0];
            nullCards.push({
                id: cardId,
                selected: false,
                tapped: false
            });
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(nullBtn);

    const asideBtn = document.createElement('button');
    asideBtn.textContent = 'Add Selected to Aside';
    asideBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const cardId = deck.splice(index, 1)[0];
            asideCards.push({id: cardId, selected: false, tapped: false});
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(asideBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    buttonsDiv.appendChild(closeBtn);

    modal.style.display = 'flex';
}

// Modal for choosing cards from null
function showNullModal() {
    let modal = document.getElementById('null-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'null-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        document.body.appendChild(modal);
    }
    modal.innerHTML = '';
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '20px';
    content.style.borderRadius = '10px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';
    modal.appendChild(content);

    const title = document.createElement('h2');
    title.textContent = 'Choose cards from null';
    content.appendChild(title);

    const cardsContainer = document.createElement('div');
    cardsContainer.style.display = 'flex';
    cardsContainer.style.flexWrap = 'wrap';
    cardsContainer.style.justifyContent = 'center';
    content.appendChild(cardsContainer);

    let selectedCards = [];

    nullCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.style.margin = '5px';
        cardDiv.style.display = 'flex';
        cardDiv.style.flexDirection = 'column';
        cardDiv.style.alignItems = 'center';
        cardDiv.style.cursor = 'pointer';
        cardDiv.style.border = '2px solid transparent';
        cardsContainer.appendChild(cardDiv);

        const img = document.createElement('img');
        img.src = cardImages[card.id] ? cardImages[card.id].src : '';
        img.style.width = '60px';
        img.style.height = '90px';

        cardDiv.onclick = () => {
            if (selectedCards.includes(index)) {
                selectedCards = selectedCards.filter(i => i !== index);
                cardDiv.style.border = '2px solid transparent';
            } else {
                selectedCards.push(index);
                cardDiv.style.border = '2px solid yellow';
            }
        };
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.marginTop = '20px';
    content.appendChild(buttonsDiv);

    const handBtn = document.createElement('button');
    handBtn.textContent = 'Add Selected to Hand';
    handBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const card = nullCards.splice(index, 1)[0];
            handCards.push(card);
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(handBtn);

    const fieldBtn = document.createElement('button');
    fieldBtn.textContent = 'Add Selected to Field';
    fieldBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const card = nullCards.splice(index, 1)[0];
            for (let i = 0; i < fieldCards.length; i++) {
                if (!fieldCards[i]) {
                    fieldCards[i] = card;
                    break;
                }
            }
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(fieldBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    buttonsDiv.appendChild(closeBtn);

    modal.style.display = 'flex';
}

// Modal for changing aside card image
function showChangeImageModal() {
    let modal = document.getElementById('change-image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'change-image-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        document.body.appendChild(modal);
    }
    modal.innerHTML = '';
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '20px';
    content.style.borderRadius = '10px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    modal.appendChild(content);

    const title = document.createElement('h2');
    title.textContent = 'Change Aside Card Image';
    content.appendChild(title);

    const cardsContainer = document.createElement('div');
    cardsContainer.style.display = 'flex';
    cardsContainer.style.flexWrap = 'wrap';
    cardsContainer.style.justifyContent = 'center';
    content.appendChild(cardsContainer);

    lead.forEach((cardId, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.style.margin = '5px';
        cardDiv.style.display = 'flex';
        cardDiv.style.flexDirection = 'column';
        cardDiv.style.alignItems = 'center';
        cardDiv.style.cursor = 'pointer';
        cardDiv.style.border = '2px solid transparent';
        cardsContainer.appendChild(cardDiv);

        const img = document.createElement('img');
        img.src = cardImages[cardId] ? cardImages[cardId].src : '';
        img.style.width = '60px';
        img.style.height = '90px';
        cardDiv.appendChild(img);

        cardDiv.onclick = () => {
            if (asideCards.length > 0) {
                asideCards[0].id = cardId;
            }
            modal.style.display = 'none';
            render();
        };
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    content.appendChild(closeBtn);

    modal.style.display = 'flex';
}

// Modal for choosing cards from aside
function showAsideModal() {
    let modal = document.getElementById('aside-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'aside-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        document.body.appendChild(modal);
    }
    modal.innerHTML = '';
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '20px';
    content.style.borderRadius = '10px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';
    modal.appendChild(content);

    const title = document.createElement('h2');
    title.textContent = 'Choose cards from aside';
    content.appendChild(title);

    const cardsContainer = document.createElement('div');
    cardsContainer.style.display = 'flex';
    cardsContainer.style.flexWrap = 'wrap';
    cardsContainer.style.justifyContent = 'center';
    content.appendChild(cardsContainer);

    let selectedCards = [];

    asideCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.style.margin = '5px';
        cardDiv.style.display = 'flex';
        cardDiv.style.flexDirection = 'column';
        cardDiv.style.alignItems = 'center';
        cardDiv.style.cursor = 'pointer';
        cardDiv.style.border = '2px solid transparent';
        cardsContainer.appendChild(cardDiv);

        const img = document.createElement('img');
        img.src = cardImages[card.id] ? cardImages[card.id].src : '';
        img.style.width = '60px';
        img.style.height = '90px';
        cardDiv.appendChild(img);

        cardDiv.onclick = () => {
            if (selectedCards.includes(index)) {
                selectedCards = selectedCards.filter(i => i !== index);
                cardDiv.style.border = '2px solid transparent';
            } else {
                selectedCards.push(index);
                cardDiv.style.border = '2px solid yellow';
            }
        };
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.marginTop = '20px';
    content.appendChild(buttonsDiv);

    const handBtn = document.createElement('button');
    handBtn.textContent = 'Add Selected to Hand';
    handBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const card = asideCards.splice(index, 1)[0];
            handCards.push(card);
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(handBtn);

    const fieldBtn = document.createElement('button');
    fieldBtn.textContent = 'Add Selected to Field';
    fieldBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const card = asideCards.splice(index, 1)[0];
            for (let i = 0; i < fieldCards.length; i++) {
                if (!fieldCards[i]) {
                    fieldCards[i] = card;
                    break;
                }
            }
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(fieldBtn);

    const nullBtn = document.createElement('button');
    nullBtn.textContent = 'Add Selected to Null';
    nullBtn.onclick = () => {
        selectedCards.sort((a,b) => b - a).forEach(index => {
            const card = asideCards.splice(index, 1)[0];
            nullCards.push(card);
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(nullBtn);

    const flipBtn = document.createElement('button');
    flipBtn.textContent = 'Flip Selected';
    flipBtn.onclick = () => {
        selectedCards.forEach(index => {
            const card = asideCards[index];
            if (lead.includes(card.id)) {
                const otherLeads = lead.filter(id => id !== card.id);
                if (otherLeads.length > 0) {
                    card.id = otherLeads[Math.floor(Math.random() * otherLeads.length)];
                }
            }
        });
        modal.style.display = 'none';
        render();
    };
    buttonsDiv.appendChild(flipBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    buttonsDiv.appendChild(closeBtn);

    modal.style.display = 'flex';
}

// Render function
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hand cards
    ctx.fillStyle = '#333';
    ctx.fillRect(10, canvas.height - cardHeight - 20, canvas.width - 20, cardHeight + 10);
    ctx.fillStyle = 'white';
    ctx.fillText('Hand', 20, canvas.height - cardHeight - 30);

    handCards.forEach((card, index) => {
        const x = 20 + index * (cardWidth + cardSpacing);
        const y = canvas.height - cardHeight - 10;

        if (cardImages[card.id]) {
            ctx.drawImage(cardImages[card.id], x, y, cardWidth, cardHeight);
        } else {
            // Fallback rectangle
            ctx.fillStyle = '#666';
            ctx.fillRect(x, y, cardWidth, cardHeight);
            ctx.fillStyle = 'white';
            ctx.fillText(card.id, x + 10, y + cardHeight / 2);
        }

        // Draw card border
        ctx.strokeStyle = card.selected ? 'yellow' : 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cardWidth, cardHeight);
    });

    // Draw field zones (4 zones)
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 150, canvas.width - 20, cardHeight + 10);
    ctx.fillStyle = 'white';
    ctx.fillText('Field', 20, 140);

    const zoneWidth = (canvas.width - 40) / 4;
    fieldCards.forEach((card, index) => {
        const x = 20 + index * zoneWidth;
        const y = 160;

        // Draw zone background
        ctx.fillStyle = '#444';
        ctx.fillRect(x, y, zoneWidth - cardSpacing, cardHeight);

        if (card) {
            if (cardImages[card.id]) {
                // Apply rotation if tapped
                if (card.tapped) {
                    ctx.save();
                    ctx.translate(x + cardHeight / 2, y + cardWidth);
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(cardImages[card.id], -cardHeight / 2, -cardWidth / 2, cardWidth, cardHeight);
                    ctx.restore();
                } else {
                    ctx.drawImage(cardImages[card.id], x, y, cardWidth, cardHeight);
                }
            } else {
                ctx.fillStyle = '#666';
                ctx.fillRect(x, y, cardWidth, cardHeight);
                ctx.fillStyle = 'white';
                ctx.fillText(card.id, x + 10, y + cardHeight / 2);
            }

            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cardWidth, cardHeight);
        } else {
            // Empty zone
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, zoneWidth - cardSpacing, cardHeight);
            ctx.fillStyle = 'white';
            ctx.fillText('Empty', x + 10, y + cardHeight / 2);
        }
    });

    // Draw aside cards
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, cardWidth + 20, cardHeight + 10);
    ctx.fillStyle = 'white';
    ctx.fillText('Aside', 20, 20);

    asideCards.forEach((card, index) => {
        const x = 20;
        const y = 30 + index * 10; // Slight overlap

        if (cardImages[card.id]) {
            // Apply rotation if tapped
            if (card.tapped) {
                ctx.save();
                ctx.translate(x + cardHeight / 2, y + cardWidth);
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(cardImages[card.id], -cardHeight / 2, -cardWidth / 2, cardWidth, cardHeight);
                ctx.restore();
            } else {
                ctx.drawImage(cardImages[card.id], x, y, cardWidth, cardHeight);
            }
        }
    });

    // Draw null cards
    ctx.fillStyle = '#333';
    ctx.fillRect(canvas.width - cardWidth - 30, 10, cardWidth + 20, cardHeight + 10);
    ctx.fillStyle = 'white';
    ctx.fillText('Null', canvas.width - cardWidth - 20, 20);

    nullCards.forEach((card, index) => {
        const x = canvas.width - cardWidth - 20;
        const y = 30 + index * 10; // Slight overlap

        if (cardImages[card.id]) {
            ctx.drawImage(cardImages[card.id], x, y, cardWidth, cardHeight);
        }
    });

    // Draw deck info
    ctx.fillStyle = 'white';
    ctx.fillText(`Deck: ${deck.length} cards`, 20, 30);
    ctx.fillText(`Hand: ${handCards.length} cards`, 20, 50);
    ctx.fillText(`Field: ${fieldCards.filter(c => c).length} cards`, 20, 70);

    // Draw dragged card
    if (isDragging && draggedImage) {
        ctx.drawImage(draggedImage, mouseX - dragOffsetX, mouseY - dragOffsetY, cardWidth, cardHeight);
    }
}

// Get card at coordinates
function getCardAt(x, y) {
    // Check hand cards
    for (let i = 0; i < handCards.length; i++) {
        const cardX = 20 + i * (cardWidth + cardSpacing);
        const cardY = canvas.height - cardHeight - 10;

        if (x >= cardX && x <= cardX + cardWidth &&
            y >= cardY && y <= cardY + cardHeight) {
            return { type: 'hand', index: i, card: handCards[i] };
        }
    }

    // Check field zones
    const zoneWidth = (canvas.width - 40) / 4;
    for (let i = 0; i < fieldCards.length; i++) {
        const cardX = 20 + i * zoneWidth;
        const cardY = 160;

        if (x >= cardX && x <= cardX + zoneWidth - cardSpacing &&
            y >= cardY && y <= cardY + cardHeight) {
            return { type: 'field', index: i, card: fieldCards[i] };
        }
    }

    // Check aside area
    const asideX = 10;
    const asideY = 10;
    if (x >= asideX && x <= asideX + cardWidth + 20 &&
        y >= asideY && y <= asideY + cardHeight + 10) {
        // Check specific aside cards
        for (let i = asideCards.length - 1; i >= 0; i--) {
            const cardY = 30 + i * 10;
            if (y >= cardY && y <= cardY + cardHeight) {
                return { type: 'aside', index: i, card: asideCards[i] };
            }
        }
        return { type: 'aside', index: -1, card: null };
    }

    // Check null area
    const nullX = canvas.width - cardWidth - 30;
    const nullY = 10;
    if (x >= nullX && x <= nullX + cardWidth + 20 &&
        y >= nullY && y <= nullY + cardHeight + 10) {
        return { type: 'null', index: -1, card: null };
    }

    return null;
}

// Drag and drop handlers
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedCard = getCardAt(x, y);

    if (clickedCard && clickedCard.type === 'hand') {
        isDragging = true;
        draggedCardIndex = clickedCard.index;
        draggedImage = cardImages[clickedCard.card.id];
        dragOffsetX = x - (20 + clickedCard.index * (cardWidth + cardSpacing));
        dragOffsetY = y - (canvas.height - cardHeight - 10);
        mouseX = x;
        mouseY = y;
        render();
    }
});

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    if (isDragging) {
        render();
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const dropTarget = getCardAt(x, y);

        if (dropTarget) {
            if (dropTarget.type === 'field' && !fieldCards[dropTarget.index]) {
                // Drop on empty field zone
                const card = handCards.splice(draggedCardIndex, 1)[0];
                fieldCards[dropTarget.index] = card;
            } else if (dropTarget.type === 'null') {
                // Drop on null area
                const card = handCards.splice(draggedCardIndex, 1)[0];
                nullCards.push(card);
            }
        }

        isDragging = false;
        draggedCardIndex = -1;
        draggedImage = null;
        render();
    }
});

// Click handler for null area and aside area
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedCard = getCardAt(x, y);

    if (clickedCard && clickedCard.type === 'null') {
        showNullModal();
    } else if (clickedCard && clickedCard.type === 'aside') {
        showAsideModal();
    }
});

// Right-click for context menu on field cards and aside cards
canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedCard = getCardAt(x, y);

    if (clickedCard && clickedCard.type === 'field' && fieldCards[clickedCard.index]) {
        showContextMenu(event.clientX, event.clientY, 'field', clickedCard.index);
    } else if (clickedCard && clickedCard.type === 'aside' && clickedCard.index >= 0) {
        showContextMenu(event.clientX, event.clientY, 'aside', clickedCard.index);
    }
});

// Function to show context menu
function showContextMenu(mouseX, mouseY, type, index) {
    // Remove existing menu
    const existingMenu = document.getElementById('context-menu');
    if (existingMenu) {
        document.body.removeChild(existingMenu);
    }

    // Create menu
    const menu = document.createElement('div');
    menu.id = 'context-menu';
    menu.style.position = 'absolute';
    menu.style.left = mouseX + 'px';
    menu.style.top = mouseY + 'px';
    menu.style.backgroundColor = 'white';
    menu.style.border = '1px solid black';
    menu.style.padding = '5px';
    menu.style.zIndex = '2000';
    menu.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.5)';
    //right_menu
    if (type === 'field') {
        // Options for field cards
        const toHandBtn = document.createElement('button');
        toHandBtn.textContent = 'To Hand';
        toHandBtn.onclick = () => {
            const card = fieldCards[index];
            fieldCards[index] = null;
            card.tapped = false;
            handCards.push(card);
            render();
            hideContextMenu();
        };
        menu.appendChild(toHandBtn);

        const toNullBtn = document.createElement('button');
        toNullBtn.textContent = 'To Null';
        toNullBtn.onclick = () => {
            const card = fieldCards[index];
            fieldCards[index] = null;
            nullCards.push(card);
            render();
            hideContextMenu();
        };
        menu.appendChild(toNullBtn);

        const toAsideBtn = document.createElement('button');
        toAsideBtn.textContent = 'To Aside';
        toAsideBtn.onclick = () => {
            const card = fieldCards[index];
            fieldCards[index] = null;
            asideCards.push(card);
            render();
            hideContextMenu();
        };
        menu.appendChild(toAsideBtn);

        const tapBtn = document.createElement('button');
        tapBtn.textContent = fieldCards[index].tapped ? 'Untap' : 'Tap';
        tapBtn.onclick = () => {
            fieldCards[index].tapped = !fieldCards[index].tapped;
            render();
            hideContextMenu();
        };
        menu.appendChild(tapBtn);
    } else if (type === 'aside') {
        // Options for aside cards
        const tapBtn = document.createElement('button');
        tapBtn.textContent = asideCards[index].tapped ? 'Untap' : 'Tap';
        tapBtn.onclick = () => {
            asideCards[index].tapped = !asideCards[index].tapped;
            render();
            hideContextMenu();
        };
        menu.appendChild(tapBtn);
    }

    document.body.appendChild(menu);

    // Hide menu on click outside
    document.addEventListener('click', hideContextMenuOnClick, { once: true });
}

// Function to hide context menu
function hideContextMenu() {
    const menu = document.getElementById('context-menu');
    if (menu) {
        document.body.removeChild(menu);
    }
}

// Function to hide menu on click outside
function hideContextMenuOnClick(event) {
    const menu = document.getElementById('context-menu');
    if (menu && !menu.contains(event.target)) {
        hideContextMenu();
    }
}

// Draw button functionality
draw.onclick = function() {
    if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const cardId = deck[randomIndex];
        
        handCards.push({
            id: cardId,
            selected: false,
            tapped: false
        });
        
        deck.splice(randomIndex, 1);
        render();
    }
};

// Choose button functionality
choose.onclick = function() {
    showChooseModal(1);
};

// Initialize
loadCardImages();

// Initial render with empty state
render();
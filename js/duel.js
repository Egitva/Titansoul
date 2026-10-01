// ============================================================
// НАСТРОЙКИ
// ============================================================
const DB_REPO = "Egitva/TSDB_CG"; // замени на свой репозиторий


// ============================================================
// СОСТОЯНИЕ
// ============================================================
let allCardsDB = [];              // полная база карт (нужна для импорта по ID)
let currentDeck = { main: [], extra: [], leader: [] };
let field = {
    deck: [],
    extra: [],
    null: [],
    aside: [],
    hand: [],
    main: [[], [], [], []],
    sec: [[], [], [], []],
    world: [[], [], [], []]
};
let rotatedCards = new Set();
let activeLeaderIndex = 0;
let flippedCards = new Set();
let activeLeaderSide = 0;


// ============================================================
// ЗАГРУЗКА БАЗЫ КАРТ
// ============================================================
async function loadCardDatabase() {
    try {
        const cached = localStorage.getItem('bebebe');
        if (cached) {
            allCardsDB = JSON.parse(cached);
            return;
        }
    } catch (e) {}


    try {
        const res = await fetch(`https://raw.githubusercontent.com/${DB_REPO}/main/data/cards.db`);
        const json = await res.json();
        allCardsDB = json.data || [];
    } catch (e) {
        console.warn('База карт не найдена в localStorage. Импорт по ID может не сработать.');
    }
}


// ============================================================
// ИМПОРТ КОЛОДЫ
// ============================================================
function importDeckToPlaytest() {
    try {
        const saved = localStorage.getItem('currentDeck');
        if (!saved) {
            alert('Колода не найдена в localStorage.\n\nСначала в Deck Builder:\n1. Собери колоду\n2. Нажми кнопку "Сохранить для Playtest"');
            return;
        }
        const data = JSON.parse(saved);


        if (data.main && data.main[0] && typeof data.main[0] === 'object') {
            currentDeck.main = data.main || [];
            currentDeck.extra = data.extra || [];
            currentDeck.leader = data.leader || [];
        } else {
            if (!allCardsDB.length) {
                alert('База карт не загружена. Не могу восстановить карты по ID.');
                return;
            }
            currentDeck.main = (data.main || []).map(id => allCardsDB.find(c => c.id === id)).filter(Boolean);
            currentDeck.extra = (data.extra || []).map(id => allCardsDB.find(c => c.id === id)).filter(Boolean);
            currentDeck.leader = (data.leader || []).map(id => allCardsDB.find(c => c.id === id)).filter(Boolean);
        }


        field.aside = currentDeck.leader.length > 0 ? [currentDeck.leader[0]] : [];
        field.deck = shuffle([...currentDeck.main]);
        field.extra = [...currentDeck.extra];
        field.null = [];
        field.hand = [];
        field.main = [[], [], [], []];
        field.sec = [[], [], [], []];
        field.world = [[], [], [], []];


        renderAll();
        updateStatus();
        flippedCards.clear();
        activeLeaderSide = 0;
    } catch (e) {
        console.error(e);
        alert('Ошибка импорта: ' + e.message);
    }
}


// ============================================================
// РЕНДЕР
// ============================================================
function renderAll() {
    renderPile('deck', field.deck, true);
    renderPile('extra-deck', field.extra, true);
    renderPile('null', field.null, false);
    renderPile('aside', field.aside, false);


    for (let i = 0; i < 4; i++) {
        renderFieldZone('main' + (i + 1), field.main[i], 'Главная ' + (i + 1));
    }
    for (let i = 0; i < 4; i++) {
        renderFieldZone('sec' + (i + 1), field.sec[i], 'Втор. ' + (i + 1));
    }
    for (let i = 0; i < 4; i++) {
        renderFieldZone('world' + (i + 1), field.world[i], 'Мир ' + (i + 1));
    }
    renderHand();
}


function renderFieldZone(zoneId, cards, labelText) {
    const container = document.getElementById(zoneId);
    if (!container) return;
    container.innerHTML = '';


    const label = document.createElement('span');
    label.className = 'zone-label';
    label.textContent = labelText;
    container.appendChild(label);


    if (!cards || cards.length === 0) return;


    cards.forEach((card, index) => {
        const div = createCardElement(card, false);
        div.style.position = 'absolute';
        div.style.left = (8 + index * 6) + 'px';
        div.style.top = (20 + index * 4) + 'px';
        div.style.zIndex = index + 1;
        container.appendChild(div);
    });
}


function renderPile(zoneId, cards, faceDown = false) {
    const container = document.getElementById(zoneId);
    if (!container) return;


    const label = container.querySelector('.zone-label');
    container.innerHTML = '';
    if (label) container.appendChild(label);


    if (!cards || cards.length === 0) return;


    const topCard = cards[cards.length - 1];
    const div = createCardElement(topCard, faceDown);
    container.appendChild(div);
}


function renderHand() {
    const container = document.getElementById('hand');
    if (!container) return;


    const label = container.querySelector('.zone-label');
    container.innerHTML = '';
    if (label) container.appendChild(label);


    if (!field.hand || field.hand.length === 0) return;


    field.hand.forEach((card) => {
        const div = createCardElement(card, false);
        container.appendChild(div);
    });
}


function createCardElement(card, faceDown = false) {
    const div = document.createElement('div');
    div.className = 'card';
    if (faceDown) div.classList.add('face-down');
    if (rotatedCards.has(card.id)) div.classList.add('rotated');
    div.draggable = true;
    div.dataset.cardId = card.id;


    let displayCard = card;
    let showBack = faceDown;


    if (flippedCards.has(card.id)) {
        if (card.type === 'Лидер' && currentDeck.leader.length === 2) {
            const otherIndex = currentDeck.leader[0].id === card.id ? 1 : 0;
            displayCard = currentDeck.leader[otherIndex];
        } else {
            showBack = true;
        }
    }


    let imgUrl = displayCard.card_images?.[0]?.image_url || '';
    if (imgUrl && !imgUrl.startsWith('http')) {
        imgUrl = `https://raw.githubusercontent.com/${DB_REPO}/main/` + imgUrl;
    }


    if (showBack) {
        div.innerHTML = `<div style="width:100%;height:100%;background:#1a1a2e;display:flex;align-items:center;justify-content:center;font-size:22px;color:#555;border-radius:6px;">?</div>`;
    } else {
        div.innerHTML = `
            <img src="${imgUrl || 'https://via.placeholder.com/85x120/333/fff?text=?'}" 
                 alt="${displayCard.name || ''}" 
                 onerror="this.src='https://via.placeholder.com/85x120/333/fff?text=?'" 
                 draggable="false">
            <div class="card-name">${displayCard.name || 'Без названия'}</div>
        `;
    }


    // Drag
    div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({
            id: card.id,
            fromZone: div.closest('.zone')?.id || 'unknown'
        }));
        e.dataTransfer.effectAllowed = 'move';
        div.classList.add('dragging');
    });
    div.addEventListener('dragend', () => div.classList.remove('dragging'));


    // ЛКМ — меню
    div.onclick = (e) => {
        e.stopPropagation();
        const zoneId = div.closest('.zone')?.id || 'unknown';
        showCardMenu(card, zoneId, e);
    };


    // ПКМ — поворот
    div.oncontextmenu = (e) => {
        e.preventDefault();
        toggleRotate(card.id);
    };


    return div;
}


// ============================================================
// ПЕРЕВОРОТ / ПОВОРОТ
// ============================================================
function toggleFlip(card) {
    if (flippedCards.has(card.id)) {
        flippedCards.delete(card.id);
    } else {
        flippedCards.add(card.id);
    }
    renderAll();
}


function toggleRotate(cardId) {
    if (rotatedCards.has(cardId)) {
        rotatedCards.delete(cardId);
    } else {
        rotatedCards.add(cardId);
    }
    renderAll();
}


// ============================================================
// ПРОСМОТР СПИСКА (PILE MODAL)
// ============================================================
function openPileSearch(zoneKey) {
    let cards = [];
    let title = '';


    switch (zoneKey) {
        case 'deck': cards = field.deck; title = `Колода (${cards.length})`; break;
        case 'extra': cards = field.extra; title = `Extra (${cards.length})`; break;
        case 'null': cards = field.null; title = `Null (${cards.length})`; break;
        case 'aside': cards = field.aside; title = `Aside (${cards.length})`; break;
        case 'hand': cards = field.hand; title = `Рука (${cards.length})`; break;
        default: return;
    }


    if (cards.length === 0) {
        alert('В этой зоне нет карт');
        return;
    }


    const modal = document.getElementById('pile-modal');
    const grid = document.getElementById('modal-grid');
    const titleEl = document.getElementById('modal-title');
    if (!modal || !grid || !titleEl) return;


    titleEl.textContent = title;
    grid.innerHTML = '';


    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'modal-card';
        let imgUrl = card.card_images?.[0]?.image_url || '';
        if (imgUrl && !imgUrl.startsWith('http')) {
            imgUrl = `https://raw.githubusercontent.com/${DB_REPO}/main/` + imgUrl;
        }
        div.innerHTML = `
            <img src="${imgUrl || 'https://via.placeholder.com/100x140/333/fff?text=?'}" 
                 onerror="this.src='https://via.placeholder.com/100x140/333/fff?text=?'">
            <div class="modal-card-name">${card.name || ''}</div>
        `;
        div.onclick = () => {
            takeCardFromPileToHand(card, zoneKey);
            closePileModal();
        };
        grid.appendChild(div);
    });


    modal.style.display = 'flex';
}


function closePileModal() {
    const modal = document.getElementById('pile-modal');
    if (modal) modal.style.display = 'none';
}


function takeCardFromPileToHand(card, zoneKey) {
    if (zoneKey === 'deck') field.deck = field.deck.filter(c => c.id !== card.id);
    else if (zoneKey === 'extra') field.extra = field.extra.filter(c => c.id !== card.id);
    else if (zoneKey === 'null') field.null = field.null.filter(c => c.id !== card.id);
    else if (zoneKey === 'aside') field.aside = field.aside.filter(c => c.id !== card.id);
    else if (zoneKey === 'hand') return;


    field.hand.push(card);
    renderAll();
    updateStatus();
}


// ============================================================
// DRAG AND DROP
// ============================================================
function initDragAndDrop() {
    const zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const cardId = data.id;
                const fromZone = data.fromZone;
                const toZone = zone.id;
                if (fromZone === toZone) return;


                const card = findCardById(cardId);
                if (!card) {
                    console.warn('Карта не найдена', cardId);
                    return;
                }
                moveCardByDrag(card, fromZone, toZone);
            } catch (err) {
                console.error('Ошибка drop:', err);
            }
        });
    });
}


function findCardById(id) {
    const all = [
        ...field.deck, ...field.extra, ...field.null, ...field.aside, ...field.hand,
        ...field.main.flat(), ...field.sec.flat(), ...field.world.flat()
    ];
    return all.find(c => c.id === id);
}


function moveCardByDrag(card, fromZone, toZone) {
    removeFromSource(card, fromZone);
    addToZone(card, toZone);
    renderAll();
    updateStatus();
}


function addToZone(card, zoneId) {
    if (zoneId === 'deck') field.deck.push(card);
    else if (zoneId === 'extra-deck') field.extra.push(card);
    else if (zoneId === 'null') field.null.push(card);
    else if (zoneId === 'aside') field.aside.push(card);
    else if (zoneId === 'hand') field.hand.push(card);
    else if (zoneId.startsWith('main')) {
        const idx = parseInt(zoneId.replace('main', '')) - 1;
        if (field.main[idx]) field.main[idx].push(card);
    } else if (zoneId.startsWith('sec')) {
        const idx = parseInt(zoneId.replace('sec', '')) - 1;
        if (field.sec[idx]) field.sec[idx].push(card);
    } else if (zoneId.startsWith('world')) {
        const idx = parseInt(zoneId.replace('world', '')) - 1;
        if (field.world[idx]) field.world[idx].push(card);
    }
}


// ============================================================
// ПЕРЕМЕЩЕНИЕ КАРТ
// ============================================================
function moveCard(card, fromZone, toZone) {
    removeFromSource(card, fromZone);
    if (toZone === 'null') field.null.push(card);
    else if (toZone === 'aside') field.aside.push(card);
    else if (toZone === 'deck') field.deck.unshift(card);
    else if (toZone === 'extra') field.extra.push(card);
    else if (toZone === 'hand') field.hand.push(card);
    renderAll();
    updateStatus();
}


function removeFromSource(card, zone) {
    if (zone === 'deck') {
        field.deck = field.deck.filter(c => c.id !== card.id);
    } else if (zone === 'extra-deck' || zone === 'extra') {
        field.extra = field.extra.filter(c => c.id !== card.id);
    } else if (zone === 'null') {
        field.null = field.null.filter(c => c.id !== card.id);
    } else if (zone === 'aside') {
        field.aside = field.aside.filter(c => c.id !== card.id);
    } else if (zone === 'hand') {
        field.hand = field.hand.filter(c => c.id !== card.id);
    } else if (zone.startsWith('main')) {
        const idx = parseInt(zone.replace('main', '')) - 1;
        if (field.main[idx]) field.main[idx] = field.main[idx].filter(c => c.id !== card.id);
    } else if (zone.startsWith('sec')) {
        const idx = parseInt(zone.replace('sec', '')) - 1;
        if (field.sec[idx]) field.sec[idx] = field.sec[idx].filter(c => c.id !== card.id);
    } else if (zone.startsWith('world')) {
        const idx = parseInt(zone.replace('world', '')) - 1;
        if (field.world[idx]) field.world[idx] = field.world[idx].filter(c => c.id !== card.id);
    }
}


// ============================================================
// ВЗЯТЬ КАРТУ
// ============================================================
function drawCard() {
    if (field.deck.length === 0) {
        alert('Колода пуста!');
        return;
    }
    const card = field.deck.pop();
    field.hand.push(card);
    renderAll();
    updateStatus();
}


function updateStatus() {
    const el = document.getElementById('status');
    if (el) {
        el.textContent = `Колода: ${field.deck.length} | Рука: ${field.hand.length} | Extra: ${field.extra.length} | Null: ${field.null.length}`;
    }
}


// ============================================================
// СБРОС
// ============================================================
function resetPlaymat() {
    if (!confirm('Сбросить всё поле?')) return;
    field.aside = currentDeck.leader.length > 0 ? [currentDeck.leader[0]] : [];
    field.deck = shuffle([...currentDeck.main]);
    field.extra = [...currentDeck.extra];
    field.null = [];
    field.hand = [];
    field.main = [[], [], [], []];
    field.sec = [[], [], [], []];
    field.world = [[], [], [], []];
    renderAll();
    updateStatus();
    flippedCards.clear();
    activeLeaderSide = 0;
}


// ============================================================
// УТИЛИТЫ
// ============================================================
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// ============================================================
// КОНТЕКСТНОЕ МЕНЮ КАРТЫ (НОВОЕ)
// ============================================================
let currentContextCard = null;
let currentContextZone = null;


function showCardMenu(card, fromZone, event) {
    currentContextCard = card;
    currentContextZone = fromZone;


    let menu = document.getElementById('card-context-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'card-context-menu';
        menu.style.cssText = `
            position: absolute;
            background: #1e1e2e;
            border: 1px solid #444;
            border-radius: 10px;
            padding: 6px 0;
            min-width: 190px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.7);
            z-index: 5000;
            display: none;
            color: #eee;
            font-size: 14px;
            overflow: hidden;
        `;
        document.body.appendChild(menu);
    }


    menu.innerHTML = `
        <div style="padding:8px 15px; border-bottom:1px solid #333; font-weight:bold; color:#facc15; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${card.name || 'Без названия'}</div>
        <div class="menu-item" data-action="show" style="padding:9px 15px; cursor:pointer;">👁️ Показать карту</div>
        <div class="menu-item" data-action="toDeck" style="padding:9px 15px; cursor:pointer;">🔄 Вернуть в колоду</div>
        <div class="menu-item" data-action="flip" style="padding:9px 15px; cursor:pointer;">🔃 Перевернуть</div>
        <div class="menu-item" data-action="rotate" style="padding:9px 15px; cursor:pointer;">↩️ Повернуть (90°)</div>
        <div style="height:1px; background:#333; margin:4px 0;"></div>
        <div class="menu-item" data-action="toHand" style="padding:9px 15px; cursor:pointer;">✋ В руку</div>
        <div class="menu-item" data-action="toNull" style="padding:9px 15px; cursor:pointer;">🚫 В Null</div>
    `;


    menu.querySelectorAll('.menu-item').forEach(item => {
        item.onmouseenter = () => item.style.background = '#333';
        item.onmouseleave = () => item.style.background = 'transparent';
        item.onclick = (e) => {
            e.stopPropagation();
            menuAction(item.dataset.action);
        };
    });


    // Позиционирование
    let x = event.clientX;
    let y = event.clientY;
    menu.style.display = 'block';


    const menuRect = menu.getBoundingClientRect();
    if (x + menuRect.width > window.innerWidth) x = window.innerWidth - menuRect.width - 10;
    if (y + menuRect.height > window.innerHeight) y = window.innerHeight - menuRect.height - 10;
    if (x < 0) x = 10;
    if (y < 0) y = 10;


    menu.style.left = x + 'px';
    menu.style.top = y + 'px';


    setTimeout(() => {
        document.addEventListener('click', closeContextMenu);
    }, 10);
}


function closeContextMenu(e) {
    const menu = document.getElementById('card-context-menu');
    if (menu && !menu.contains(e.target)) {
        menu.style.display = 'none';
        document.removeEventListener('click', closeContextMenu);
    }
}


function menuAction(action) {
    const card = currentContextCard;
    const zone = currentContextZone;
    if (!card || !zone) return;


    switch (action) {
        case 'show': showCardModal(card); break;
        case 'toDeck': moveCard(card, zone, 'deck'); break;
        case 'flip': toggleFlip(card); break;
        case 'rotate': toggleRotate(card.id); break;
        case 'toHand': moveCard(card, zone, 'hand'); break;
        case 'toNull': moveCard(card, zone, 'null'); break;
    }
    const menu = document.getElementById('card-context-menu');
    if (menu) menu.style.display = 'none';
}

function closeModal() {
    document.getElementById('card-bodal').style.display = 'none';
}
// ============================================================
// МОДАЛЬНОЕ ОКНО КАРТЫ
// ============================================================
function showCardModal(card) {
    const modal = document.getElementById('card-bodal');
    const body = document.getElementById('bodal-body');
    if (!modal || !body) {
        alert('Модальное окно не найдено в HTML. Добавь блок #card-modal.');
        return;
    }


    let img = card.card_images?.[0]?.image_url || '';
    if (img && !img.startsWith('http')) {
        img = `https://raw.githubusercontent.com/${DB_REPO}/main/` + img;
    }
    if (!img) img = 'https://via.placeholder.com/280x400/333/fff?text=No+Image';


    body.innerHTML = `
        <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">
            <img src="${img}" 
                 style="width:280px; border-radius:16px; box-shadow:0 4px 10px rgba(0,0,0,0.5);" 
                 onerror="this.src='https://via.placeholder.com/280x400/333/fff?text=Error'">
            <div style="flex:1; min-width:200px;">
                <h2 style="margin-top:0; color:#facc15;">${card.name || 'Без названия'}</h2>
                <p style="color:#aaa; font-style:italic;">${card.type || 'Тип не указан'}</p>
                <div style="padding:15px; background:#222; border-radius:12px; font-size:0.95rem; line-height:1.5;">
                    ${card.desc || 'Описание отсутствует.'}
                </div>
                <div style="margin-top:15px; font-size:0.8rem; color:#666;">
                    ID: ${card.id}
                </div>
            </div>
        </div>
    `;


    modal.style.display = 'flex';
}


function closeCardModal() {
    const modal = document.getElementById('card-modal');
    if (modal) modal.style.display = 'none';
}


// ============================================================
// ЗАПУСК
// ============================================================
window.onload = () => {
    loadCardDatabase();
    initDragAndDrop();
    renderAll();
};
let currentModalCard = null;

const DB_REPO = "Egitva/TSDB_CG";
const DB_URL = `https://raw.githubusercontent.com/${DB_REPO}/main/data/cards.db`;
let allCards = [];


async function loadCards() {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '<p>Загрузка базы карт...</p>';

    try {
        const res = await fetch(DB_URL);
        const json = await res.json();
        allCards = json.data || [];
        
        renderCards(allCards, grid); // показываем все карты сразу
    } catch (e) {
        grid.innerHTML = '<p style="color:red">Ошибка загрузки базы карт</p>';
        console.error(e);
    }
}


// Основная функция поиска
function searchCards() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const typeFilter = document.getElementById('filter-type').value;
    const colorFilter = document.getElementById('filter-color').value;
    const grid = document.getElementById('cards-grid');
    if (!allCards.length) {
        grid.innerHTML = '<p>База карт ещё не загружена</p>';
        return;
    }
    let filtered = allCards.filter(card => {
        // Поиск по имени
        const nameMatch = !query || (card.name && card.name.toLowerCase().includes(query));
        // Фильтр по типу
        const typeMatch = !typeFilter || card.type === typeFilter;
        // Фильтр по цвету (attribute)
        const colorMatch = !colorFilter || card.attribute === colorFilter;
        return nameMatch && typeMatch && colorMatch;
    });
    renderCards(filtered, grid);
}


// Функция рендера (оставляем почти как было)
function renderCards(cards, container) {
    container.innerHTML = '';
    if (!cards || cards.length === 0) {
        container.innerHTML = '<p>Ничего не найдено</p>';
        return;
    }
    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card';
        let imageUrl = card.card_images?.[0]?.image_url || '';
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `https://raw.githubusercontent.com/${DB_REPO}/main/` + imageUrl;
        }
        div.innerHTML = `
            <img src="${imageUrl || 'https://via.placeholder.com/200'}" 
                 alt="${card.name || 'Без названия'}"
                 onerror="this.src='https://via.placeholder.com/200'">
            <h3>${card.name || 'Без названия'}</h3>
        `;
        div.onclick = () => showCardModal(card);
        container.appendChild(div);
    });
}

function showCardModal(card) {
    currentModalCard = card;
    const modal = document.getElementById('card-modal');
    const body = document.getElementById('modal-body');

    let img = card.card_images?.[0]?.image_url || '';
        
    if (img && !img.startsWith('http')) {
        img = `https://raw.githubusercontent.com/${DB_REPO}/main/` + img;
    }
    
    body.innerHTML = `
        <img src="${img}" style="width:280px; float: left; border-radius:16px; margin-right:1rem;">
        <h2 style="text-align:center; margin:10px 0;">${card.name}</h2>
        <p style="text-align:center; color:#facc15;">${card.type}</p>
        <p style="padding:15px; background:#222; border-radius:12px; font-size:0.95rem;">${card.desc}</p>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('card-modal').style.display = 'none';
}

function addCurrentToDeckFromModal() {
    if (currentModalCard) {
        window.parentDeck = window.parentDeck || { main: [], extra: [], side: [] };
        window.parentDeck.main.push(currentModalCard);
        alert(`${currentModalCard.name} добавлена в колоду!`);
        closeModal();
    }
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-color').value = '';
    searchCards();
}

// Загрузка при старте
window.onload = () => {
    loadCards();
    //searchCards();
};
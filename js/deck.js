// === ДАННЫЕ ===
let allCards = [];
let deck = {
  main: [],
  extra: [],
  leader: []
};

// Загрузка карт
async function loadCards() {
  try {
    const res = await fetch(DB_URL); // или укажи прямую ссылку
    const json = await res.json();
    allCards = json.data || [];
    renderAllCards(allCards);
  } catch(e) {
    alert("Ошибка загрузки карт");
    console.error(e);
  }
}

// Рендер всех карт
function renderAllCards(cards) {
  const container = document.getElementById('all-cards');
  container.innerHTML = '';

  cards.forEach(card => {
    const div = createCardElement(card, () => addToDeck(card));
    container.appendChild(div);
  });
}

// Фильтр
function filterCards() {
  const query = document.getElementById('search').value.toLowerCase().trim();
  const filtered = allCards.filter(card => 
    card.name.toLowerCase().includes(query)
  );
  renderAllCards(filtered);
}

// Создание элемента карты
function createCardElement(card, onClick) {
  const div = document.createElement('div');
  div.className = 'card';
  
  let imgUrl = card.card_images?.[0]?.image_url || '';
  if (imgUrl && !imgUrl.startsWith('http')) {
    imgUrl = `https://raw.githubusercontent.com/${DB_REPO}/main/` + imgUrl;
  }

  div.innerHTML = `
    <img src="\( {imgUrl}" alt=" \){card.name}">
    <div class="card-name">${card.name}</div>
  `;
  div.onclick = onClick;
  return div;
}

// Добавление в колоду
function addToDeck(card) {
  if (card.type === "Лидер") {
    if (deck.leader.length >= 2) {
      alert("В Лидерской зоне может быть только 2 карты!");
      return;
    }
    deck.leader.push(card);
    renderDeck('leader');
  } 
  else if (card.type === "ALT" || card.type === "Overlay") {
    deck.extra.push(card);
    renderDeck('extra');
  } 
  else {
    if (deck.main.length >= 100) {
      alert("Main Deck максимум 100 карт!");
      return;
    }
    deck.main.push(card);
    renderDeck('main');
  }
}

// Рендер конкретной колоды
function renderDeck(type) {
  let container, cards, countEl;
  
  if (type === 'main') {
    container = document.getElementById('main-deck');
    cards = deck.main;
    countEl = document.getElementById('main-count');
  } else if (type === 'extra') {
    container = document.getElementById('extra-deck');
    cards = deck.extra;
    countEl = document.getElementById('extra-count');
  } else {
    container = document.getElementById('leader-deck');
    cards = deck.leader;
    countEl = document.getElementById('leader-count');
  }

  container.innerHTML = '';
  cards.forEach((card, index) => {
    const div = createCardElement(card, () => removeFromDeck(type, index));
    container.appendChild(div);
  });


  countEl.textContent = `(\( {cards.length}/ \){type === 'leader' ? 2 : 100})`;
}

// Удаление из колоды
function removeFromDeck(type, index) {
  deck[type].splice(index, 1);
  renderDeck(type);
}

function clearDeck(type) {
  if (confirm(`Очистить ${type === 'leader' ? 'Лидерскую зону' : type + ' Deck'}?`)) {
    deck[type] = [];
    renderDeck(type);
  }
}

// Экспорт
function exportDeck() {
  const deckData = {
    main: deck.main.map(c => c.id),
    extra: deck.extra.map(c => c.id),
    leader: deck.leader.map(c => c.id),
    version: "1.0"
  };
  
  const blob = new Blob([JSON.stringify(deckData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-deck.json';
  a.click();
}

// Импорт
function importDeck() {
  document.getElementById('import-file').click();
}

function handleImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const data = JSON.parse(ev.target.result);
      
      deck.main = [];
      deck.extra = [];
      deck.leader = [];

      data.main?.forEach(id => {
        const card = allCards.find(c => c.id === id);
        if (card) deck.main.push(card);
      });
      data.extra?.forEach(id => {
        const card = allCards.find(c => c.id === id);
        if (card) deck.extra.push(card);
      });
      data.leader?.forEach(id => {
        const card = allCards.find(c => c.id === id);
        if (card) deck.leader.push(card);
      });
      renderDeck('main');
      renderDeck('extra');
      renderDeck('leader');
      alert('Колода успешно загружена!');
    } catch(err) {
      alert('Ошибка импорта колоды');
    }
  };
  reader.readAsText(file);
}
// Запуск
window.onload = loadCards;
// === ДАННЫЕ ===
let allCards = [];
let deck = {
  main: [],
  extra: [],
  leader: []
};
const DB_REPO = "Egitva/TSDB_CG";
const DB_URL = `https://raw.githubusercontent.com/${DB_REPO}/main/data/cards.db`;


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
    renderAllCards(filtered);
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-color').value = '';
    searchCards();
}
// Создание элемента карты
function createCardElement(card, onClick) {
  const div = document.createElement('div');
  div.className = 'card';
  
  let imgUrl = card.card_images?.[0]?.image_url || '';
  console.log(imgUrl);
  if (imgUrl && !imgUrl.startsWith('http')) {
    imgUrl = `https://raw.githubusercontent.com/${DB_REPO}/main` + imgUrl;
    console.log(imgUrl);
  }


  div.innerHTML = `
    <img src="${imgUrl}" alt="${card.name}">
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


  countEl.textContent = `(${cards.length}/ ${type === 'leader' ? 2 : 100})`;
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

async function exportProxyPDF() {
    const totalCards = deck.main.length + deck.extra.length + deck.leader.length;
    if (totalCards === 0) {
        alert("Колода пуста! Добавьте карты перед экспортом.");
        return;
    }

    if (!confirm(`Создать PDF с ${totalCards} картами?`)) {
        return;
    }

    // Проверяем наличие jsPDF
    if (typeof window.jspdf === 'undefined') {
        alert("jsPDF не загружен. Добавьте библиотеку (см. инструкцию ниже).");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const cardWidth = 57;   // мм — стандарт Yu-Gi-Oh
    const cardHeight = 86;  // мм
    const margin = 8;
    const spacingX = 4;
    const spacingY = 6;
    const cardsPerRow = 3;

    let x = margin;
    let y = margin;
    let printed = 0;

    const allCards = [...deck.main, ...deck.extra, ...deck.leader];

    for (let card of allCards) {
        let imgUrl = card.card_images?.[0]?.image_url || '';
        if (imgUrl && !imgUrl.startsWith('http')) {
            imgUrl = `https://raw.githubusercontent.com/${DB_REPO}/main/` + imgUrl;
        }

        if (!imgUrl) continue;

        try {
            const imgData = await getImageAsBase64(imgUrl);
            pdf.addImage(imgData, 'JPEG', x, y, cardWidth, cardHeight);

            // Название карты под прокси (мелко)
            pdf.setFontSize(7);
            pdf.setTextColor(80);
            pdf.text(card.name.substring(0, 28), x + cardWidth/2, y + cardHeight + 4, { align: "center" });

            printed++;
            x += cardWidth + spacingX;

            if (printed % cardsPerRow === 0) {
                x = margin;
                y += cardHeight + spacingY;
            }

            // Новая страница
            if (y + cardHeight > pageHeight - margin) {
                pdf.addPage();
                x = margin;
                y = margin;
            }
        } catch (err) {
            console.warn("Не удалось загрузить изображение:", card.name);
        }
    }

    pdf.save(`proxies_${new Date().toISOString().slice(0,10)}.pdf`);
    alert(`PDF успешно создан! (${printed} карт)`);
}

// Вспомогательная функция
function getImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = url;
    });
}

function saveDeckToLocal() {
  localStorage.setItem('currentDeck', JSON.stringify({
    main: deck.main.map(c => c.id),
    extra: deck.extra.map(c => c.id),
    leader: deck.leader.map(c => c.id)
  }));
}
// Запуск
window.onload = loadCards;
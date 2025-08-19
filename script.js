// Табы и секции
const tabs = document.querySelectorAll('nav a[data-day]');
const sections = [...document.querySelectorAll('main section')];

const mapInits = {
    day1: initDay1Map,
    day2: initDay2Map,
    day3: initDay3Map,
    day4: initDay4Map,
    day5: initDay5Map,
    day6: initDay6Map,
    day7: initDay7Map,
    day8: initDay8Map,
};

function switchTo(id) {
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-day') === id));
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    if (mapInits[id] && !window[`__${id}_map_inited`]) {
        mapInits[id]();
        window[`__${id}_map_inited`] = true;
    }
    history.replaceState(null, '', `#${id}`);
}

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();
        switchTo(tab.getAttribute('data-day'));
    });
});

document.querySelectorAll('.chip[data-day]').forEach(chip => {
    chip.addEventListener('click', e => {
        e.preventDefault();
        switchTo(chip.getAttribute('data-day'));
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const fromHash = location.hash.replace('#', '');
    const initial = sections.some(s => s.id === fromHash) ? fromHash : 'day1';
    switchTo(initial);
});

// ---------------- DAY 1 ----------------
function initDay1Map() {
    const map = L.map('map-day1', {scrollWheelZoom: true}).setView([46.0511, 14.5065], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

    const points = [
        {n: 1, name: "Хостел (Miklošičeva 9)", lat: 46.0536, lng: 14.5064},
        {n: 2, name: "Площадь Прешерна", lat: 46.0511, lng: 14.5065},
        {n: 3, name: "Тройной мост", lat: 46.0510, lng: 14.5075},
        {n: 4, name: "Мост Драконов", lat: 46.0516, lng: 14.5094},
        {n: 5, name: "Фуникулёр к замку", lat: 46.0489, lng: 14.5099},
        {n: 6, name: "Люблянский замок", lat: 46.0477, lng: 14.5094},
        {n: 7, name: "Старый город (Mestni trg)", lat: 46.0503, lng: 14.5079},
        {n: 8, name: "Набережная реки", lat: 46.0507, lng: 14.5085},
        {n: 9, name: "Парк Тиволи", lat: 46.0560, lng: 14.4949},
    ];
    const food = [
        {name: "Gostilna Sokol", lat: 46.0508, lng: 14.5066},
        {name: "Druga Violina", lat: 46.0489, lng: 14.5082},
        {name: "Cafetino", lat: 46.0505, lng: 14.5069},
        {name: "Central Market Street Food", lat: 46.0518, lng: 14.5091},
    ];

    const route = L.polyline(points.map(p => [p.lat, p.lng]), {color: '#2563eb', weight: 4, opacity: .85}).addTo(map);

    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    points.forEach(p => {
        const divIcon = L.divIcon({
            html: `<div class="num">${p.n}</div>`,
            className: '',
            iconSize: [26, 26], iconAnchor: [13, 13]
        });
        L.marker([p.lat, p.lng], {icon: divIcon}).addTo(map).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
    });

    food.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(map).bindPopup(`<strong>${f.name}</strong>`));

    map.fitBounds(route.getBounds(), {padding: [18, 18]});
    setTimeout(() => map.invalidateSize(), 50);
}

// ---------------- DAY 2 ----------------
function initDay2Map() {
    // Общая иконка для еды (зелёный пин)
    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // ---------- Bled ----------
    const bled = L.map('map-day2-bled', {scrollWheelZoom: true}).setView([46.363, 14.093], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(bled);

    const bledPoints = [
        {n: 1, name: 'Bled Bus Station', lat: 46.37046, lng: 14.11333},
        {n: 2, name: 'Lake Bled (набережная)', lat: 46.36344, lng: 14.09474},
        {n: 3, name: 'Bled Island (остров)', lat: 46.36297, lng: 14.09343},
        {n: 4, name: 'Bled Castle (замок)', lat: 46.36919, lng: 14.10107},
    ];

    const bledFood = [
        {name: 'Potičnica (кремшнита)', lat: 46.3699, lng: 14.1042}
    ];

    const bledRoute = L.polyline(bledPoints.map(p => [p.lat, p.lng]), {
        color: '#2563eb',
        weight: 4,
        opacity: .85
    }).addTo(bled);
    bledPoints.forEach(p => {
        const divIcon = L.divIcon({
            html: `<div class="num">${p.n}</div>`,
            className: '',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });
        L.marker([p.lat, p.lng], {icon: divIcon}).addTo(bled).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
    });
    bledFood.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(bled).bindPopup(`<strong>${f.name}</strong>`));

    const bledAll = [...bledPoints.map(p => [p.lat, p.lng]), ...bledFood.map(f => [f.lat, f.lng])];
    bled.fitBounds(bledAll, {padding: [18, 18]});

    // ---------- Mestre ----------
    const mestre = L.map('map-day2-venice', {scrollWheelZoom: true}).setView([45.4827, 12.2346], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(mestre);

    const mestrePoints = [
        {n: 1, name: 'Venezia Mestre FS (вокзал)', lat: 45.4827, lng: 12.2346},
        {n: 2, name: 'Центр Mestre (Piazza Ferretto)', lat: 45.4956, lng: 12.2406},
    ];

    const mestreFood = [
        {name: 'Osteria Vecia Posta (ужин)', lat: 45.4938, lng: 12.2387},
        {name: 'Ristorante Da Michele (пицца/паста)', lat: 45.4870, lng: 12.2372},
    ];

    const mestreRoute = L.polyline(mestrePoints.map(p => [p.lat, p.lng]), {
        color: '#2563eb',
        weight: 4,
        opacity: .85
    }).addTo(mestre);
    mestrePoints.forEach(p => {
        const divIcon = L.divIcon({
            html: `<div class="num">${p.n}</div>`,
            className: '',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });
        L.marker([p.lat, p.lng], {icon: divIcon}).addTo(mestre).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
    });
    mestreFood.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(mestre).bindPopup(`<strong>${f.name}</strong>`));

    const mestreAll = [...mestrePoints.map(p => [p.lat, p.lng]), ...mestreFood.map(f => [f.lat, f.lng])];
    mestre.fitBounds(mestreAll, {padding: [18, 18]});

    setTimeout(() => {
        bled.invalidateSize();
        mestre.invalidateSize();
    }, 50);
}


// ---------------- DAY 3 ----------------
function initDay3Map() {
    // ---------- Утро в Венеции (остров) ----------
    const venEl = document.getElementById('map-day3-venice');
    if (venEl) {
        const ven = L.map(venEl, {scrollWheelZoom: true}).setView([45.4379, 12.3270], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(ven);

        const venPoints = [
            {n: 1, name: 'Stazione Venezia Santa Lucia (вокзал)', lat: 45.4410, lng: 12.3217},
            {n: 2, name: 'Santa Croce (район)', lat: 45.4395, lng: 12.3205},
            {n: 3, name: 'Ponte di Rialto', lat: 45.4381, lng: 12.3358},
            {n: 4, name: 'Piazza San Marco', lat: 45.4340, lng: 12.3390},
            {n: 5, name: 'Stazione Venezia Santa Lucia (возврат)', lat: 45.4410, lng: 12.3217},
        ];

        // еда/кофе в Венеции (завтрак)
        const venFood = [
            {name: 'Caffè del Doge (завтрак)', lat: 45.4370, lng: 12.3370},
            {name: 'Torrefazione Cannaregio (альтернатива)', lat: 45.4446, lng: 12.3277},
        ];

        const venRoute = L.polyline(venPoints.map(p => [p.lat, p.lng]), {
            color: '#2563eb',
            weight: 4,
            opacity: .85
        }).addTo(ven);

        // иконка зелёного пина
        const iconFood = L.icon({
            iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
            iconSize: [25, 41], iconAnchor: [12, 41],
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

        // маркеры маршрута
        venPoints.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(ven).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        // маркеры еды
        venFood.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(ven).bindPopup(`<strong>${f.name}</strong>`));

        // fitBounds по всем точкам
        const venAll = [...venPoints.map(p => [p.lat, p.lng]), ...venFood.map(f => [f.lat, f.lng])];
        ven.fitBounds(venAll, {padding: [18, 18]});
        setTimeout(() => ven.invalidateSize(), 50);
    }

    // ---------- Флоренция ----------
    const floEl = document.getElementById('map-day3');
    if (floEl) {
        const map = L.map(floEl, {scrollWheelZoom: true}).setView([43.7731, 11.2556], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

        const points = [
            {n: 1, name: 'Firenze S. M. Novella (вокзал)', lat: 43.7760, lng: 11.2480},
            {n: 2, name: 'Mercato Centrale', lat: 43.7766, lng: 11.2531},
            {n: 3, name: 'Duomo (Santa Maria del Fiore)', lat: 43.7731, lng: 11.2556},
            {n: 4, name: 'Piazza della Signoria', lat: 43.7696, lng: 11.2558},
            {n: 5, name: 'Basilica di Santa Croce', lat: 43.7689, lng: 11.2627},
            {n: 6, name: 'Uffizi', lat: 43.7687, lng: 11.2550},
            {n: 7, name: 'Ponte Vecchio', lat: 43.7679, lng: 11.2531},
            {n: 8, name: 'Oltrarno (район)', lat: 43.7670, lng: 11.2468},
            {n: 9, name: 'Piazzale Michelangelo', lat: 43.7629, lng: 11.2659},
        ];

        // еда во Флоренции (обед/ужин/перекусы)
        const food = [
            {name: 'Mercato Centrale (обед)', lat: 43.7766, lng: 11.2533},
            {name: 'Trattoria ZaZa (ужин)', lat: 43.7767, lng: 11.2539},
            {name: 'All’Antico Vinaio (перекус)', lat: 43.7702, lng: 11.2578},
            {name: 'Gelateria La Carraia (мороженое)', lat: 43.7670, lng: 11.2464},
        ];

        const route = L.polyline(points.map(p => [p.lat, p.lng]), {
            color: '#2563eb',
            weight: 4,
            opacity: 0.85
        }).addTo(map);

        const iconFood = L.icon({
            iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
            iconSize: [25, 41], iconAnchor: [12, 41],
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

        points.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(map).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        food.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(map).bindPopup(`<strong>${f.name}</strong>`));

        const allLatLngs = [...points.map(p => [p.lat, p.lng]), ...food.map(f => [f.lat, f.lng])];
        map.fitBounds(allLatLngs, {padding: [18, 18]});
        setTimeout(() => map.invalidateSize(), 50);
    }
}

// ---------------- DAY 4 ----------------
function initDay4Map() {
    const el = document.getElementById('map-day4-rome');
    if (!el) return;

    const map = L.map(el, {scrollWheelZoom: true}).setView([41.8986, 12.4769], 14); // центр у Пантеона
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

    // Точки маршрута (номера соответствуют твоему списку)
    const points = [
        {n: 1, name: 'Roma Termini / Отель (старт)', lat: 41.9010, lng: 12.5018},
        {n: 2, name: 'Colosseo (Колизей)', lat: 41.8902, lng: 12.4922},
        {n: 3, name: 'Via dei Fori Imperiali (виды)', lat: 41.8929, lng: 12.4873},
        {n: 4, name: 'Piazza Venezia', lat: 41.8959, lng: 12.4823},
        {n: 5, name: 'Fontana di Trevi', lat: 41.9009, lng: 12.4833},
        {n: 6, name: 'Pantheon', lat: 41.8986, lng: 12.4769},
        {n: 7, name: 'Piazza Navona', lat: 41.8992, lng: 12.4731},
        {n: 8, name: 'Trastevere (ужин/прогулка)', lat: 41.8899, lng: 12.4708}, // Santa Maria in Trastevere
    ];

    // Еда (зелёные пины): траттории Трастевере + джелато по пути
    const food = [
        {name: 'Da Enzo al 29 (римская классика)', lat: 41.8899, lng: 12.4703},
        {name: 'Tonnarello (карбонара/чика)', lat: 41.8906, lng: 12.4709},
        {name: 'Grazia & Graziella (ужин)', lat: 41.8898, lng: 12.4717},
        {name: 'Giolitti (джелато у Пантеона)', lat: 41.9016, lng: 12.4769},
        {name: 'Roscioli (закуски/паста)', lat: 41.8955, lng: 12.4722},
    ];

    // Маршрут
    const route = L.polyline(points.map(p => [p.lat, p.lng]), {color: '#2563eb', weight: 4, opacity: .85}).addTo(map);

    // Иконка еды (зелёный пин)
    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // Маркеры маршрута с номерами
    points.forEach(p => {
        const divIcon = L.divIcon({
            html: `<div class="num">${p.n}</div>`,
            className: '',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });
        L.marker([p.lat, p.lng], {icon: divIcon})
            .addTo(map)
            .bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
    });

    // Маркеры еды
    food.forEach(f =>
        L.marker([f.lat, f.lng], {icon: iconFood})
            .addTo(map)
            .bindPopup(`<strong>${f.name}</strong>`)
    );

    // Авто-обзор по всем точкам и аккуратный рендер
    const allLatLngs = [...points.map(p => [p.lat, p.lng]), ...food.map(f => [f.lat, f.lng])];
    map.fitBounds(allLatLngs, {padding: [18, 18]});
    setTimeout(() => map.invalidateSize(), 50);
}

// ---------------- DAY 5 ----------------
function initDay5Map() {
    // Общая иконка еды (зелёный пин)
    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // ===== Карта 1: Античный Рим (утро) =====
    const elCenter = document.getElementById('map-day5-center');
    if (elCenter) {
        const center = L.map(elCenter, {scrollWheelZoom: true}).setView([41.8926, 12.4870], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(center);

        const pointsCenter = [
            {n: 1, name: 'Colosseo (вход по слоту)', lat: 41.8902, lng: 12.4922},
            {n: 2, name: 'Arco di Costantino', lat: 41.8893, lng: 12.4924},
            {n: 3, name: 'Roman Forum (вход)', lat: 41.8921, lng: 12.4852},
            {n: 4, name: 'Palatino (viewpoints)', lat: 41.8899, lng: 12.4882},
            {n: 5, name: 'Ланч-зона у Форума', lat: 41.8939, lng: 12.4899},
        ];
        const foodCenter = [
            {name: 'La Prezzemolina (пицца al taglio)', lat: 41.8936, lng: 12.4892},
            {name: 'La Taverna dei Fori Imperiali', lat: 41.8939, lng: 12.4885},
            {name: 'Panella – L’Arte del Pane (завтрак)', lat: 41.8984, lng: 12.5052},
        ];

        const routeCenter = L.polyline(pointsCenter.map(p => [p.lat, p.lng]), {
            color: '#2563eb',
            weight: 4,
            opacity: .85
        }).addTo(center);

        pointsCenter.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(center).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        foodCenter.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(center).bindPopup(`<strong>${f.name}</strong>`));

        const centerAll = [...pointsCenter.map(p => [p.lat, p.lng]), ...foodCenter.map(f => [f.lat, f.lng])];
        center.fitBounds(centerAll, {padding: [18, 18]});
        setTimeout(() => center.invalidateSize(), 50);
    }

    // ===== Карта 2: Ватикан (день) =====
    const elVat = document.getElementById('map-day5-vatican');
    if (elVat) {
        const vat = L.map(elVat, {scrollWheelZoom: true}).setView([41.9022, 12.4539], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(vat);

        const pointsVat = [
            {n: 'A', name: 'Piazza San Pietro', lat: 41.9022, lng: 12.4573},
            {n: 'B', name: 'Basilica di San Pietro', lat: 41.9022, lng: 12.4539},
            {n: 'C', name: 'Vatican Museums (вход)', lat: 41.9065, lng: 12.4536},
            {n: 'D', name: 'Castel Sant’Angelo (снаружи)', lat: 41.9031, lng: 12.4663},
        ];
        const foodVat = [
            {name: 'Pizzarium Bonci (пицца)', lat: 41.9076, lng: 12.4459},
            {name: 'Pastasciutta (быстрая паста)', lat: 41.9048, lng: 12.4577},
            {name: 'Old Bridge Gelateria', lat: 41.9055, lng: 12.4568},
        ];

        const routeVat = L.polyline(pointsVat.map(p => [p.lat, p.lng]), {
            color: '#2563eb',
            weight: 4,
            opacity: .85
        }).addTo(vat);

        pointsVat.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(vat).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        foodVat.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(vat).bindPopup(`<strong>${f.name}</strong>`));

        const vatAll = [...pointsVat.map(p => [p.lat, p.lng]), ...foodVat.map(f => [f.lat, f.lng])];
        vat.fitBounds(vatAll, {padding: [18, 18]});
        setTimeout(() => vat.invalidateSize(), 50);
    }
}

// ---------------- DAY 6 ----------------
function initDay6Map() {
    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // ===== ВЕНА =====
    const elVie = document.getElementById('map-day6-vienna');
    if (elVie) {
        const vie = L.map(elVie, {scrollWheelZoom: true}).setView([48.2082, 16.3738], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(vie);

        const ptsVie = [
            {n: 1, name: 'Stephansplatz', lat: 48.2086, lng: 16.3731},
            {n: 2, name: 'Graben → Kohlmarkt', lat: 48.2088, lng: 16.3698},
            {n: 3, name: 'Hofburg (внешний двор)', lat: 48.2065, lng: 16.3656},
            {n: 4, name: 'Ringstraße (опера/ратуша)', lat: 48.2026, lng: 16.3696},
            {n: 5, name: 'Naschmarkt (ланч)', lat: 48.1989, lng: 16.3616},
            {n: 6, name: 'Schönbrunn (сад/дворец)', lat: 48.1845, lng: 16.3122},
            {n: 7, name: 'Wien Hbf (поезд)', lat: 48.1856, lng: 16.3773},
        ];

        const foodVie = [
            {name: 'Café Demel (кофе/штрудель)', lat: 48.2089, lng: 16.3687},
            {name: 'Naschmarkt Food Stalls', lat: 48.1993, lng: 16.3619},
            {name: 'Café Central (альтернатива)', lat: 48.2101, lng: 16.3656},
        ];

        const routeVie = L.polyline(ptsVie.map(p => [p.lat, p.lng]), {
            color: '#2563eb',
            weight: 4,
            opacity: .85
        }).addTo(vie);

        ptsVie.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(vie).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        foodVie.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(vie).bindPopup(`<strong>${f.name}</strong>`));

        const vieAll = [...ptsVie.map(p => [p.lat, p.lng]), ...foodVie.map(f => [f.lat, f.lng])];
        vie.fitBounds(vieAll, {padding: [18, 18]});
        setTimeout(() => vie.invalidateSize(), 50);
    }

    // ===== МЮНХЕН =====
    const elMuc = document.getElementById('map-day6-munich');
    if (elMuc) {
        const muc = L.map(elMuc, {scrollWheelZoom: true}).setView([48.1372, 11.5756], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(muc);

        const ptsMuc = [
            {n: 'A', name: 'München Hbf (прибытие)', lat: 48.1402, lng: 11.5586},
            {n: 'B', name: 'Marienplatz', lat: 48.1372, lng: 11.5756},
            {n: 'C', name: 'Viktualienmarkt', lat: 48.1353, lng: 11.5760},
            {n: 'D', name: 'Hofbräuhaus (ужин)', lat: 48.1374, lng: 11.5796},
            {n: 'E', name: 'Englischer Garten (вход)', lat: 48.1470, lng: 11.5836},
        ];

        const foodMuc = [
            {name: 'Hofbräuhaus München', lat: 48.1374, lng: 11.5796},
            {name: 'Augustiner Stammhaus', lat: 48.1379, lng: 11.5712},
            {name: 'Viktualienmarkt Food Stalls', lat: 48.1356, lng: 11.5762},
        ];

        L.polyline(ptsMuc.map(p => [p.lat, p.lng]), {color: '#2563eb', weight: 4, opacity: .85}).addTo(muc);

        ptsMuc.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(muc).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        foodMuc.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(muc).bindPopup(`<strong>${f.name}</strong>`));

        const mucAll = [...ptsMuc.map(p => [p.lat, p.lng]), ...foodMuc.map(f => [f.lat, f.lng])];
        muc.fitBounds(mucAll, {padding: [18, 18]});
        setTimeout(() => muc.invalidateSize(), 50);
    }
}

// ---------------- DAY 7 ----------------
function initDay7Map() {
    const el = document.getElementById('map-day7-amsterdam');
    if (!el) return;

    const map = L.map(el, {scrollWheelZoom: true}).setView([52.3728, 4.8930], 13.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

    const points = [
        {n: 1, name: 'Dam Square', lat: 52.3731, lng: 4.8922},
        {n: 2, name: 'Jordaan', lat: 52.3770, lng: 4.8830},
        {n: 3, name: 'Anne Frank Huis', lat: 52.3752, lng: 4.8839},
        {n: 4, name: 'De 9 Straatjes', lat: 52.3719, lng: 4.8850},
        {n: 5, name: 'Bloemenmarkt', lat: 52.3667, lng: 4.8910},
        {n: 6, name: 'Rijksmuseum / Van Gogh', lat: 52.3600, lng: 4.8850},
        {n: 7, name: 'Vondelpark (вход)', lat: 52.3579, lng: 4.8680},
        {n: 8, name: 'Amsterdam Centraal', lat: 52.3791, lng: 4.9003},
    ];

    const food = [
        {name: 'Winkel 43 (завтрак/пирог)', lat: 52.3756, lng: 4.8856},
        {name: 'Foodhallen (ланч)', lat: 52.3687, lng: 4.8716},
        {name: 'Van Wonderen Stroopwafels', lat: 52.3709, lng: 4.8894},
        {name: 'Restaurant Blauw (ужин рано)', lat: 52.3477, lng: 4.8577}
    ];

    const route = L.polyline(points.map(p => [p.lat, p.lng]), {color: '#2563eb', weight: 4, opacity: .85}).addTo(map);

    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    points.forEach(p => {
        const divIcon = L.divIcon({
            html: `<div class="num">${p.n}</div>`,
            className: '',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });
        L.marker([p.lat, p.lng], {icon: divIcon}).addTo(map).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
    });
    food.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(map).bindPopup(`<strong>${f.name}</strong>`));

    const all = [...points.map(p => [p.lat, p.lng]), ...food.map(f => [f.lat, f.lng])];
    map.fitBounds(all, {padding: [18, 18]});
    setTimeout(() => map.invalidateSize(), 50);
}

// ---------------- DAY 8 ----------------
function initDay8Map() {
    const iconFood = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-green.png',
        iconSize: [25, 41], iconAnchor: [12, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // ===== Париж (утро) =====
    const elPar = document.getElementById('map-day8-paris');
    if (elPar) {
        const par = L.map(elPar, {scrollWheelZoom: true}).setView([48.8589, 2.3469], 13.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(par);

        const ptsPar = [
            {n: 1, name: 'Notre-Dame', lat: 48.8529, lng: 2.3500},
            {n: 2, name: 'Sainte-Chapelle', lat: 48.8554, lng: 2.3450},
            {n: 3, name: 'Louvre (двор/пирамида)', lat: 48.8610, lng: 2.3358},
            {n: 4, name: 'Jardin des Tuileries', lat: 48.8635, lng: 2.3270},
            {n: 5, name: 'Place de la Concorde', lat: 48.8656, lng: 2.3211},
            {n: 6, name: 'Arc de Triomphe', lat: 48.8738, lng: 2.2950},
            {n: 7, name: 'Gare de Lyon (TGV)', lat: 48.8443, lng: 2.3730},
        ];

        const foodPar = [
            {name: 'Bouillon Chartier', lat: 48.8720, lng: 2.3431},
            {name: 'L’As du Fallafel', lat: 48.8579, lng: 2.3619},
            {name: 'Boulangerie (завтрак у отеля)', lat: 48.8570, lng: 2.3520},
        ];

        L.polyline(ptsPar.map(p => [p.lat, p.lng]), {color: '#2563eb', weight: 4, opacity: .85}).addTo(par);

        ptsPar.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(par).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        foodPar.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(par).bindPopup(`<strong>${f.name}</strong>`));

        const parAll = [...ptsPar.map(p => [p.lat, p.lng]), ...foodPar.map(f => [f.lat, f.lng])];
        par.fitBounds(parAll, {padding: [18, 18]});
        setTimeout(() => par.invalidateSize(), 50);
    }

    // ===== Лион (вечер) =====
    const elLyon = document.getElementById('map-day8-lyon');
    if (elLyon) {
        const lyon = L.map(elLyon, {scrollWheelZoom: true}).setView([45.7600, 4.8357], 13.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(lyon);

        const ptsLyon = [
            {n: 'A', name: 'Place Bellecour', lat: 45.7578, lng: 4.8320},
            {n: 'B', name: 'Vieux Lyon', lat: 45.7620, lng: 4.8270},
            {n: 'C', name: 'Cathédrale Saint-Jean', lat: 45.7606, lng: 4.8277},
            {n: 'D', name: 'Bouchon (ужин)', lat: 45.7628, lng: 4.8272},
        ];

        const foodLyon = [
            {name: 'Le Bouchon des Filles', lat: 45.7706, lng: 4.8359},
            {name: 'Les Lyonnais (альтернатива)', lat: 45.7641, lng: 4.8339},
        ];

        L.polyline(ptsLyon.map(p => [p.lat, p.lng]), {color: '#2563eb', weight: 4, opacity: .85}).addTo(lyon);

        ptsLyon.forEach(p => {
            const divIcon = L.divIcon({
                html: `<div class="num">${p.n}</div>`,
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            L.marker([p.lat, p.lng], {icon: divIcon}).addTo(lyon).bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        foodLyon.forEach(f => L.marker([f.lat, f.lng], {icon: iconFood}).addTo(lyon).bindPopup(`<strong>${f.name}</strong>`));

        const lyonAll = [...ptsLyon.map(p => [p.lat, p.lng]), ...foodLyon.map(f => [f.lat, f.lng])];
        lyon.fitBounds(lyonAll, {padding: [18, 18]});
        setTimeout(() => lyon.invalidateSize(), 50);
    }
}

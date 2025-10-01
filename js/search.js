// Affichage des résultats
const resultsList = document.getElementById("results-list");

function displayResults(data) {
  resultsList.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="result-info">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <p class="price">${item.price} USD</p>
        <p>⭐ ${item.rating}</p>
        <a href="detail.html?id=${item.id}" class="btn">Voir plus</a>
      </div>
    `;
    resultsList.appendChild(card);
  });
}

// Initial load
displayResults(listings);

// Filtres
document.getElementById("applyFilters").addEventListener("click", () => {
  const maxPrice = document.getElementById("priceFilter").value;
  const type = document.getElementById("typeFilter").value;
  const rating = document.getElementById("ratingFilter").value;

  let filtered = listings;
  if (maxPrice) filtered = filtered.filter(l => l.price <= maxPrice);
  if (type) filtered = filtered.filter(l => l.type === type);
  if (rating) filtered = filtered.filter(l => l.rating >= parseFloat(rating));

  displayResults(filtered);
  updateMap(filtered);
});

// ===== Map avec Leaflet =====
const map = L.map("map").setView([-4.325, 15.322], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

function updateMap(data) {
  // Supprimer anciens marqueurs
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) map.removeLayer(layer);
  });

  data.forEach(item => {
    const marker = L.marker([item.coordinates.lat, item.coordinates.lng])
      .addTo(map)
      .bindPopup(`<b>${item.title}</b><br>${item.price} USD`);
  });
}

// Initial map markers
updateMap(listings);

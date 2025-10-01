// Récupération de l'ID dans l'URL
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

// Trouver l'item correspondant
const item = listings.find(l => l.id === itemId);

// Injecter infos
const detailInfo = document.getElementById("detail-info");
if (item) {
  detailInfo.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.description}</p>
    <p>⭐ ${item.rating}</p>
    <p class="price">${item.price} USD</p>
    <a href="booking.html?id=${item.id}" class="btn-reserve">Réserver maintenant</a>
  `;

  // Galerie
  const galleryWrapper = document.getElementById("gallery-wrapper");
  galleryWrapper.innerHTML = `
    <div class="swiper-slide"><img src="${item.image}" alt="${item.title}"></div>
    <div class="swiper-slide"><img src="assets/img/safari.jpg" alt="Photo 2"></div>
    <div class="swiper-slide"><img src="assets/img/hotel.jpg" alt="Photo 3"></div>
  `;

  new Swiper(".mySwiper", {
    pagination: { el: ".swiper-pagination" },
    loop: true
  });

  // Carte
  const map = L.map("detail-map").setView([item.coordinates.lat, item.coordinates.lng], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);
  L.marker([item.coordinates.lat, item.coordinates.lng]).addTo(map)
    .bindPopup(`<b>${item.title}</b>`);

  // Avis (mock simple)
  const reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = `
    <div class="review-card">
      <p>"Super expérience, je recommande vivement !"</p>
      <span>- Alice, France</span>
    </div>
    <div class="review-card">
      <p>"Service impeccable et équipe très professionnelle."</p>
      <span>- Jean, Belgique</span>
    </div>
  `;
} else {
  detailInfo.innerHTML = `<p>⚠️ Détail introuvable</p>`;
}

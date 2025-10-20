// ======= GESTION DES OFFRES AVEC PAGINATION =======

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("offersGrid");
  const searchInput = document.getElementById("searchInput");
  const filterType = document.getElementById("filterType");

  let currentPage = 1;
  const offersPerPage = 6;
  let filteredOffers = [...offers]; // copie de toutes les offres au départ

  // Affiche la page courante
  function displayOffersPage(page) {
    grid.innerHTML = "";

    const startIndex = (page - 1) * offersPerPage;
    const endIndex = startIndex + offersPerPage;
    const pageOffers = filteredOffers.slice(startIndex, endIndex);

    if (pageOffers.length === 0) {
      grid.innerHTML = "<p>Aucune offre trouvée.</p>";
      return;
    }

    pageOffers.forEach((o) => {
      const card = document.createElement("div");
      card.className = "offer-card";
      card.innerHTML = `
        <img src="${o.image}" alt="${o.name}">
        <div class="offer-card-content">
          <h4>${o.name}</h4>
          <p>${o.description}</p>
          <button onclick="bookOffer('${encodeURIComponent(o.name)}')">Réserver</button>
        </div>
      `;
      grid.appendChild(card);
    });

    renderPagination();
  }

  // Fonction de pagination
  function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredOffers.length / offersPerPage);

    if (totalPages <= 1) return; // inutile d’afficher si une seule page

    // Bouton précédent
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "◀";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevBtn);

    // Numéros de page
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => changePage(i);
      pagination.appendChild(btn);
    }

    // Bouton suivant
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "▶";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextBtn);
  }

  // Fonction pour changer de page
  function changePage(page) {
    currentPage = page;
    displayOffersPage(currentPage);
    window.scrollTo({ top: 300, behavior: "smooth" }); // remonte un peu
  }

  // Fonction de filtrage
  window.filterOffers = function () {
    const query = searchInput.value.toLowerCase();
    const type = filterType.value;

    filteredOffers = offers.filter(
      (o) =>
        (o.name.toLowerCase().includes(query) || o.location.toLowerCase().includes(query)) &&
        (type === "" || o.type === type)
    );

    currentPage = 1; // reset à la première page
    displayOffersPage(currentPage);
  };

  // Première affichage
  displayOffersPage(currentPage);
});

// Redirige vers la page de réservation
function bookOffer(name) {
  window.location.href = `booking.html?offer=${name}`;
}

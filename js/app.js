// Exemple simple pour la recherche
document.querySelector(".search-bar").addEventListener("submit", (e) => {
  e.preventDefault();
  const dest = document.getElementById("destination").value;
  const type = document.getElementById("type").value;
  // Pour l'instant, on simule une redirection vers search.html
  window.location.href = `search.html?destination=${dest}&type=${type}`;
});

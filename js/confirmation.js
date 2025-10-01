// Récupérer infos depuis l'URL
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");
const travelerName = params.get("name") || "Voyageur";

// Trouver l’élément réservé
const item = listings.find(l => l.id === itemId);

// Injecter les infos dans la page
document.getElementById("traveler-name").innerText = travelerName;

// Générer un ID de réservation (aléatoire simulé)
const bookingId = "MB" + Math.floor(Math.random() * 1000000);
document.getElementById("booking-id").innerText = bookingId;

// Afficher le résumé
const summaryBox = document.getElementById("summary-box");
if (item) {
  summaryBox.innerHTML = `
    <p><strong>Service :</strong> ${item.title}</p>
    <p><strong>Description :</strong> ${item.description}</p>
    <p><strong>Prix :</strong> ${item.price} USD</p>
    <p><strong>Date :</strong> (simulée)</p>
  `;
}

// === Télécharger le voucher (PDF simple via print) ===
function downloadVoucher() {
  window.print();
}

// === Partage via WhatsApp ===
function shareWhatsApp() {
  const text = `Bonjour, voici ma réservation avec Mobembo : ${item ? item.title : ""} - Numéro ${bookingId}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

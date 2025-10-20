// === Lire l'offre depuis l'URL ===
const params = new URLSearchParams(window.location.search);
const offerName = decodeURIComponent(params.get("offer") || "une offre Mobembo");
document.getElementById("offerTitle").textContent = "Réserver : " + offerName;

// === Confirmation locale ===
const form = document.getElementById("bookingForm");
const confirmation = document.getElementById("confirmationMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    confirmation.textContent = "Veuillez remplir les champs obligatoires.";
    confirmation.classList.add("error");
    confirmation.classList.remove("success");
    return;
  }

  confirmation.textContent = `Merci ${name}! Votre réservation pour "${offerName}" a bien été enregistrée. Vous recevrez une confirmation sur WhatsApp.`;
  confirmation.classList.remove("error");
  confirmation.classList.add("success");

  form.reset();
});

// === Réservation via WhatsApp ===
function bookViaWhatsApp() {
  const name = document.getElementById("name").value.trim() || "Non précisé";
  const phone = document.getElementById("phone").value.trim() || "Non précisé";
  const email = document.getElementById("email").value.trim() || "Non précisé";

  const message = `Bonjour Mobembo,%0AJe souhaite réserver : ${offerName}%0ANom : ${name}%0ATéléphone : ${phone}%0AEmail : ${email}%0A`;
  const whatsappNumber = "243979326506";
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(url, "_blank");
}
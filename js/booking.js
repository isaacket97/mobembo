// Récupération de l'item via URL
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");
const selectedItem = listings.find(l => l.id === itemId);

let currentStep = 1;
let bookingData = {
  item: selectedItem,
  traveler: {},
  extras: [],
  payment: {}
};

const stepsContainer = document.getElementById("booking-steps");

// === Affichage dynamique des étapes ===
function renderStep() {
  stepsContainer.innerHTML = "";
  let stepHtml = "";

  if (currentStep === 1) {
    // Étape 1 : Infos voyageur
    stepHtml = `
      <div class="booking-step">
        <h3>Étape 1 : Informations voyageur</h3>
        <label>Nom complet
          <input type="text" id="travelerName">
        </label>
        <label>Email
          <input type="email" id="travelerEmail">
        </label>
        <label>Téléphone
          <input type="tel" id="travelerPhone">
        </label>
        <div class="step-actions">
          <button class="btn" onclick="nextStep()">Suivant</button>
        </div>
      </div>
    `;
  }

  if (currentStep === 2) {
    // Étape 2 : Extras
    stepHtml = `
      <div class="booking-step">
        <h3>Étape 2 : Options supplémentaires</h3>
        <label>
          <input type="checkbox" id="extraTransport"> Transport privé (+30 USD)
        </label>
        <label>
          <input type="checkbox" id="extraGuide"> Guide local (+20 USD)
        </label>
        <div class="step-actions">
          <button class="btn-secondary" onclick="prevStep()">Retour</button>
          <button class="btn" onclick="nextStep()">Suivant</button>
        </div>
      </div>
    `;
  }

  if (currentStep === 3) {
    // Étape 3 : Récapitulatif
    const basePrice = bookingData.item.price;
    const extras = [];
    let total = basePrice;

    if (bookingData.extras.includes("transport")) {
      extras.push("Transport privé (+30 USD)");
      total += 30;
    }
    if (bookingData.extras.includes("guide")) {
      extras.push("Guide local (+20 USD)");
      total += 20;
    }

    stepHtml = `
      <div class="booking-step">
        <h3>Étape 3 : Récapitulatif</h3>
        <div class="summary">
          <p><strong>Service :</strong> ${bookingData.item.title}</p>
          <p><strong>Voyageur :</strong> ${bookingData.traveler.name}</p>
          <p><strong>Email :</strong> ${bookingData.traveler.email}</p>
          <p><strong>Prix de base :</strong> ${basePrice} USD</p>
          <p><strong>Extras :</strong> ${extras.join(", ") || "Aucun"}</p>
          <p><strong>Total :</strong> ${total} USD</p>
        </div>
        <div class="step-actions">
          <button class="btn-secondary" onclick="prevStep()">Retour</button>
          <button class="btn" onclick="nextStep()">Procéder au paiement</button>
        </div>
      </div>
    `;
  }

  if (currentStep === 4) {
    // Étape 4 : Paiement mock
    stepHtml = `
      <div class="booking-step">
        <h3>Étape 4 : Paiement</h3>
        <label>Méthode de paiement
          <select id="paymentMethod">
            <option value="card">Carte bancaire</option>
            <option value="mobile">Mobile Money</option>
          </select>
        </label>
        <div class="step-actions">
          <button class="btn-secondary" onclick="prevStep()">Retour</button>
          <button class="btn" onclick="confirmBooking()">Confirmer</button>
        </div>
      </div>
    `;
  }

  stepsContainer.innerHTML = stepHtml;
}

// === Navigation entre étapes ===
function nextStep() {
  if (currentStep === 1) {
    bookingData.traveler = {
      name: document.getElementById("travelerName").value,
      email: document.getElementById("travelerEmail").value,
      phone: document.getElementById("travelerPhone").value
    };
  }
  if (currentStep === 2) {
    bookingData.extras = [];
    if (document.getElementById("extraTransport").checked) {
      bookingData.extras.push("transport");
    }
    if (document.getElementById("extraGuide").checked) {
      bookingData.extras.push("guide");
    }
  }
  currentStep++;
  renderStep();
}

function prevStep() {
  currentStep--;
  renderStep();
}

// === Confirmation ===
function confirmBooking() {
  const method = document.getElementById("paymentMethod").value;
  bookingData.payment = { method };

  // Redirection vers confirmation
  window.location.href = `confirmation.html?id=${bookingData.item.id}&name=${bookingData.traveler.name}`;
}

// Initialiser
renderStep();
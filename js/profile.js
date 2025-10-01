// Gestion des onglets
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Simulation des réservations utilisateur
const bookingsList = document.getElementById("bookings-list");

const myBookings = [
  {
    id: "MB10234",
    service: "Hôtel Grand Kinshasa",
    date: "2025-11-12",
    status: "Confirmée"
  },
  {
    id: "MB10256",
    service: "Safari Parc de la N'sele",
    date: "2025-12-05",
    status: "En attente"
  }
];

myBookings.forEach(b => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${b.id}</td>
    <td>${b.service}</td>
    <td>${b.date}</td>
    <td>${b.status}</td>
  `;
  bookingsList.appendChild(row);
});

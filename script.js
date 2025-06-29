let andmed = [];
let markerid = [];
let kaart;

window.addEventListener("DOMContentLoaded", () => {
  const otsing = document.getElementById("otsing");
  const tbody = document.querySelector("#tabel tbody");

  // Oletame, et sinu automaatide andmed on sellisel kujul:
const pakiautomaadid = [
  {
    companyName: "DPD automaat",
    street: "Virbi 10",
    addressLine2: "Tallinn",
    countryCode: "EE",
    lat: 59.4264,
    lng: 24.7932
  },
  {
    companyName: "DPD automaat",
    street: "Tartu mnt 87",
    addressLine2: "Tallinn",
    countryCode: "EE",
    lat: 59.4281,
    lng: 24.7784
  }
  // ... lisa siia kõik automaadid
];

// Loo Leafleti kaart
const kaart = L.map('kaart').setView([58.8, 25.5], 7); // Keskpunkt Eestile

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(kaart);

// Lisa iga automaadi kohta marker kaardile
pakiautomaadid.forEach(p => {
  if (p.lat && p.lng) {
    L.marker([p.lat, p.lng])
      .addTo(kaart)
      .bindPopup(`<b>${p.companyName}</b><br>${p.street}, ${p.addressLine2}<br>Riik: ${p.countryCode}`);
  }
});
  kaart = L.map("kaart").setView([58.5953, 25.0136], 6); // Eesti keskpunkt
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(kaart);

  fetch("pakiautomaadid.json")
    .then(res => res.json())
    .then(data => {
      andmed = data;
      uuendaAndmed(andmed);
    });

  otsing.addEventListener("input", () => {
    const q = otsing.value.toLowerCase();
    const filtreeritud = andmed.filter(p =>
      (p.companyName + p.street + p.addressLine2 + p.countryCode).toLowerCase().includes(q)
    );
    uuendaAndmed(filtreeritud);
  });

  function uuendaAndmed(punktid) {
    tbody.innerHTML = "";
    markerid.forEach(m => kaart.removeLayer(m));
    markerid = [];

    if (punktid.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">Ei leitud ühtegi tulemust</td></tr>`;
      return;
    }

    punktid.forEach(p => {
      const rida = document.createElement("tr");
      rida.innerHTML = `
        <td>${p.companyName || "-"}</td>
        <td>${p.street || "-"}</td>
        <td>${p.addressLine2 || "-"}</td>
        <td>${p.countryCode || "-"}</td>
      `;
      tbody.appendChild(rida);

      if (p.Latitude && p.Longitude) {
        const marker = L.marker([p.Latitude, p.Longitude])
          .addTo(kaart)
          .bindPopup(`<strong>${p.companyName}</strong><br>${p.street}, ${p.addressLine2}`);
        markerid.push(marker);
      }
    });

    if (punktid[0].Latitude && punktid[0].Longitude) {
      kaart.setView([punktid[0].Latitude, punktid[0].Longitude], 10);
    }
  }
});

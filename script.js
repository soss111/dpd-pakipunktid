let pakikapid = [];

window.addEventListener("DOMContentLoaded", () => {
  const otsing = document.getElementById("otsing");
  const tbody = document.querySelector("#tabel tbody");

  fetch("pakiautomaadid.json")
    .then(res => res.json())
    .then(data => {
      pakikapid = data;
      kuvaTulemused(data);
    })
    .catch(() => {
      tbody.innerHTML = `<tr><td colspan="4">❌ Andmete laadimine ebaõnnestus</td></tr>`;
    });

  otsing.addEventListener("input", () => {
    const filtritud = pakikapid.filter(p =>
      (p.companyName + p.street + p.City + p.countryCode).toLowerCase().includes(otsing.value.toLowerCase())
    );
    kuvaTulemused(filtritud);
  });

  function kuvaTulemused(andmed) {
    tbody.innerHTML = "";
    if (andmed.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">😕 Vastet ei leitud</td></tr>`;
      return;
    }

    andmed.forEach(p => {
      const rida = document.createElement("tr");
      rida.innerHTML = `
        <td>${p.companyName}</td>
        <td>${p.streets}</td>
        <td>${p.City}</td>
        <td>${p.countryCode}</td>
      `;
      tbody.appendChild(rida);
    });
  }
});

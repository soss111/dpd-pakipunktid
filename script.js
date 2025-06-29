let kõikPakiautomaadid = [];
const otsingVäli = document.getElementById("otsing");
const tulemusteTabel = document.querySelector("#tabel tbody");

// Lae andmestik JSON-ist
fetch("https://dpdbaltics.com/PickupParcelShopData.json")
  .then(res => res.json())
  .then(data => {
    kõikPakiautomaadid = data;
    kuvaTulemused(data);
  })
  .catch(err => {
    tulemusteTabel.innerHTML = `<tr><td colspan="4">Andmete laadimine ebaõnnestus 😞</td></tr>`;
    console.error("Viga:", err);
  });

// Otsingufunktsioon
function filtreeri() {
  const sisestus = otsingVäli.value.trim().toLowerCase();
  const tulemused = kõikPakiautomaadid.filter(p =>
    (p.Name + p.Address + p.City + p.Country).toLowerCase().includes(sisestus)
  );
  kuvaTulemused(tulemused);
}

// Kuvab tabelina
function kuvaTulemused(andmed) {
  tulemusteTabel.innerHTML = "";

  if (andmed.length === 0) {
    tulemusteTabel.innerHTML = `<tr><td colspan="4">Ei leitud ühtegi vastet 🙁</td></tr>`;
    return;
  }

  andmed.forEach(punkt => {
    const rida = document.createElement("tr");
    rida.innerHTML = `
      <td>${punkt.Name}</td>
      <td>${punkt.Address}</td>
      <td>${punkt.City}</td>
      <td>${punkt.Country}</td>
    `;
    tulemusteTabel.appendChild(rida);
  });
}

let kõikPakiautomaadid = [];
const otsingVäli = document.getElementById("otsing");
const tulemusteTabel = document.querySelector("#tabel tbody");

// Lae pakiautomaatide andmestik
fetch("https://dpdbaltics.com/PickupParcelShopData.json")
  .then(res => res.json())
  .then(data => {
    kõikPakiautomaadid = data;
    kuvaTulemused(data);
  })
  .catch(err => {
    tulemusteTabel.innerHTML = `<tr><td colspan="4">❌ Andmete laadimine ebaõnnestus</td></tr>`;
    console.error("Viga:", err);
  });

// Filtreeri otsingu põhjal
function filtreeri() {
  const sisend = otsingVäli.value.trim().toLowerCase();
  const tulemused = kõikPakiautomaadid.filter(p =>
    (p.Name + p.Address + p.City + p.Country).toLowerCase().includes(sisend)
  );
  kuvaTulemused(tulemused);
}

// Kuvab andmed tabelina
function kuvaTulemused(andmed) {
  tulemusteTabel.innerHTML = "";

  if (andmed.length === 0) {
    tulemusteTabel.innerHTML = `<tr><td colspan="4">😕 Ühtegi vastet ei leitud</td></tr>`;
    return;
  }

  andmed.forEach(p => {
    const rida = document.createElement("tr");
    rida.innerHTML = `
      <td>${p.Name}</td>
      <td>${p.Address}</td>
      <td>${p.City}</td>
      <td>${p.Country}</td>
    `;
    tulemusteTabel.appendChild(rida);
  });
}

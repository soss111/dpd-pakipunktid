fetch('https://dpdbaltics.com/PickupParcelShopData.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#tabel tbody");

    data.forEach(punkt => {
      const rida = document.createElement("tr");
      rida.innerHTML = `
        <td>${punkt.Name}</td>
        <td>${punkt.Address}</td>
        <td>${punkt.City}</td>
        <td>${punkt.Country}</td>
      `;
      tbody.appendChild(rida);
    });
  })
  .catch(err => {
    console.error("Viga andmete laadimisel:", err);
  });

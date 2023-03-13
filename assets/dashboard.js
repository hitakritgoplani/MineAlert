function generateItems() {
  let ref = rtdb.ref("groups");
  ref.on("value", (snapshot) => {
    let ss = snapshot.val().sort((a, b) => a.gid - b.gid);
    let items = [];
    ss.forEach((element) => {
      let status = "";
      let curr_temp =
        element.temperature[
          Object.keys(element.temperature)[
            Object.keys(element.temperature).length - 1
          ]
        ];
      let curr_smoke =
        element.smoke[
          Object.keys(element.smoke)[Object.keys(element.smoke).length - 1]
        ];

      if (curr_temp < body_temperature_lower_threshold) {
        status += "Temperature higher than threshold";
      } else if (curr_temp > body_temperature_upper_threshold) {
        status += "Temperature lower than threshold";
      }
      if (curr_smoke > smoke_threshold) {
        status += "Smoke higher than threshold";
      }
      items.push({
        gid: element.gid,
        temperature: curr_temp,
        smoke: curr_smoke,
        status: status,
      });
    });
    generateHtml(items);
  });
}

function generateHtml(items) {
  let itemsHtml = "";
  items.forEach((item) => {
    itemsHtml += `
    <div class="box">
        <div class="text">
            <h2 class="topic-heading">Team ${item.gid}</h2>
            <p class="topic">Current Temperature</p>
            <span class="values">
                <strong>${item.temperature} °C</strong>
            </span>
            <p class="topic">Gas Concentration</p>
            <span>
            <strong>${item.smoke} ppm</strong>
            </span>
        </div>
    </div>
    `;
  });
  document.querySelector(".box-container").innerHTML = itemsHtml;
}


generateItems()

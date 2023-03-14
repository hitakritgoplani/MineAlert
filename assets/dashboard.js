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

      if (curr_temp < temperature_lower_threshold) {
        status += "<strong style='color:red'>Temperature lower than threshold<br></strong>"
      } else if (curr_temp > temperature_upper_threshold) {
        status += "<strong style='color:red'>Temperature higher than threshold<br></strong>"
      } else {
        status += "<p style='color:green'>Temperature within threshold<br></p>"
      }
      if (curr_smoke > smoke_threshold) {
        status += "<strong style='color:red'>Smoke higher than threshold<br></strong>";
      } else {
        status += "<p style='color:green'>Smoke within threshold<br></p>"
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
            <h2 class="topic-heading">Group ${item.gid}</h2>
            <p class="topic">Current Temperature</p>
            <span class="values">
                <strong>${item.temperature} °C</strong>
            </span>
            <p class="topic">Gas Concentration</p>
            <span>
            <strong>${item.smoke} ppm</strong>
            </span>
            <span>
            <p class="topic">Note</p>
            </span>
            <span>
            ${item.status}
            </span>
        </div>
    </div>
    `;
  });
  document.querySelector(".box-container").innerHTML = itemsHtml;
}


generateItems()

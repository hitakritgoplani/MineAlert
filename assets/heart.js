function generateItems() {
  let ref = rtdb.ref("miners");
  ref.on("value", (snapshot) => {
    let ss = snapshot.val().sort((a, b) => a.heartrate - b.heartrate);
    let items = [];
    ss.forEach((element) => {
      let status = "";
      if (element.heartrate * -1 > 120) {
        status = "Very High";
      } else {
        status = "Normal";
      }
      items.push({
        ...element,
        status: status,
      });
    });
	generateHtml(items);
  });
}

function generateHtml(items) {
  $("tbody#childTableTag").remove();
  $("table#new-table").append('<tbody id="childTableTag"></tbody>');
  let itemsHtml = "";
  items.forEach((item) => {
    if (item.heartrate * -1 > 120) {
      var itemsHtml =
        "<tr>" +
        "<td>" +
        item.mid +
        "</td>" +
        "<td>" +
        item.gid +
        "</td>" +
        "<td>" +
        item.mname +
        "</td>" +
        "<td>" +
        item.heartrate * -1 +
        "</td>" +
        '<td style="color:red;">' +
        item.status +
        "</td>" +
        "</tr>";
    } else {
      var itemsHtml =
        "<tr>" +
        "<td>" +
        item.mid +
        "</td>" +
        "<td>" +
        item.gid +
        "</td>" +
        "<td>" +
        item.mname +
        "</td>" +
        "<td>" +
        item.heartrate * -1 +
        "</td>" +
        '<td style="color:green;">' +
        item.status +
        "</td>" +
        "</tr>";
    }
    $("#childTableTag").append(itemsHtml);
  });
  document.querySelector(".childTableTag").innerHTML = itemsHtml;
}

generateItems();

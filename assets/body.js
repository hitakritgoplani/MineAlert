var filter_temp = "temperature";

$("#mid").click(function (event) {
  event.preventDefault();
  ref_temp.off("value");
  filter_temp = "mid";
  generateItems();
});
$("#gid").click(function (event) {
  event.preventDefault();
  ref_temp.off("value");
  filter_temp = "gid";
  generateItems();
});
$("#mname").click(function (event) {
  event.preventDefault();
  ref_temp.off("value");
  filter_temp = "mname";
  generateItems();
});
$("#temperature").click(function (event) {
  event.preventDefault();
  ref_temp.off("value");
  filter_temp = "temperature";
  generateItems();
});

var ref_temp = rtdb.ref("miners");

function generateItems() {
  ref_temp.on("value", (snapshot) => {
    let ss;
    if (filter_temp === "temperature") {
      ss = snapshot.val().sort((a, b) => a.temperature - b.temperature);
    } else if (filter_temp === "mid") {
      ss = snapshot.val().sort((a, b) => a.mid - b.mid);
    } else if (filter_temp === "gid") {
      ss = snapshot.val().sort((a, b) => a.gid - b.gid);
    } else if (filter_temp === "mname") {
      ss = snapshot.val().sort((a, b) => a.mname.localeCompare(b.mname));
    }
    let items = [];
    ss.forEach((element) => {
      let status = "";
      if (element.temperature * -1 <= 34) {
        status = "Very Low";
      } else if (
        element.temperature * -1 < 37.6 &&
        element.temperature * -1 > 34
      ) {
        status = "Normal";
      } else if (
        element.temperature * -1 > 37.6 &&
        element.temperature * -1 < 40
      ) {
        status = "High";
      } else {
        status = "Very High";
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
    if (item.temperature * -1 < 37.6) {
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
        item.temperature * -1 +
        "</td>" +
        '<td style="color:green;">' +
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
        item.temperature * -1 +
        "</td>" +
        '<td style="color:red;">' +
        item.status +
        "</td>" +
        "</tr>";
    }
    $("#childTableTag").append(itemsHtml);
  });
  document.querySelector(".childTableTag").innerHTML = itemsHtml;
}

generateItems();

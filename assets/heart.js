var filter_hr = "heartrate"

$("#mid").click(function (event) {
  event.preventDefault();
  ref_hr.off("value")
  filter_hr = "mid"
  generateItems()
});
$("#gid").click(function (event) {
  event.preventDefault();
  ref_hr.off("value")
  filter_hr = "gid"
  generateItems()
});
$("#mname").click(function (event) {
  event.preventDefault();
  ref_hr.off("value")
  filter_hr = "mname"
  generateItems()
});
$("#heartrate").click(function (event) {
  event.preventDefault();
  ref_hr.off("value")
  filter_hr = "heartrate"
  generateItems()
});


var ref_hr = rtdb.ref("miners");

function generateItems() {
  ref_hr.on("value", (snapshot) => {
    let ss;
    if (filter_hr === "heartrate"){
      ss = snapshot.val().sort((a, b) => a.heartrate - b.heartrate);
    } else if(filter_hr === "mid"){
      ss = snapshot.val().sort((a, b) => a.mid - b.mid);
    } else if (filter_hr === "gid") {
      ss = snapshot.val().sort((a, b) => a.gid - b.gid);
    } else if (filter_hr === "mname") {
      ss = snapshot.val().sort((a, b) => a.mname.localeCompare(b.mname));
    }
    let items = [];
    ss.forEach((element) => {
      let status = "";
      if (element.heartrate * -1 > heartrate_upper_threshold) {
        status = "Very High";
      } else if (element.heartrate * -1 < heartrate_lower_threshold){
        status = "Very Low";
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
    if (item.heartrate * -1 > heartrate_upper_threshold || item.heartrate * -1 < heartrate_lower_threshold) {
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

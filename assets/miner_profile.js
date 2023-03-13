var mname = sessionStorage.getItem("mname");

function generateItems() {
  let ref = rtdb.ref("miners")
  ref.on("value", (snapshot) => {
    snapshot.val().forEach(element => {
      if (element.mname === mname) {
        let status = "";
        if (element.heartrate*-1 > 120) {
          status = "Very High";
        } else {
          status = "Normal";
        }
        document.getElementById("minerid").innerText = element.mid;
        document.getElementById("minername").innerText = element.mname;
        document.getElementById("groupid").innerText = element.gid;
        document.getElementById("heartvalue").innerText = element.heartrate*-1;
        document.getElementById("accvalue").innerText = element.accelerometer;
      }
    });
  });
}

generateItems();

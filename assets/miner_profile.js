var docId = sessionStorage.getItem("docId");

function generateItems() {
  db.collection("miners")
    .doc(docId)
    .onSnapshot((doc) => {
      let status = "";
      if (doc.data().heartrate > 120) {
        status = "Very High";
      } else {
        status = "Normal";
      }
      document.getElementById("minerid").innerText = doc.data().mid;
      document.getElementById("minername").innerText = doc.data().mname;
      document.getElementById("groupid").innerText = doc.data().gid;
      document.getElementById("heartvalue").innerText = doc.data().heartrate;
      document.getElementById("accvalue").innerText = doc.data().accelerometer;
    });
}

generateItems();

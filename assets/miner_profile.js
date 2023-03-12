var docId = sessionStorage.getItem("docId");

function generateItems() {
  db.collection("miners")
    .doc(docId)
    .onSnapshot((doc) => {
      document.getElementById("minerid").innerText = doc.data().mid;
      document.getElementById("minername").innerText = doc.data().mname;
      document.getElementById("groupid").innerText = doc.data().gid;
      document.getElementById("heartvalue").innerText = doc.data().heartrate*-1;
      document.getElementById("accvalue").innerText = doc.data().accelerometer;
    });
}

generateItems();

function generateItems() {
  db.collection("groups")
    .orderBy("gid")
    .onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data().gid , " => ",doc.data().temperature)
      });
    }); 
}

generateItems()


var ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

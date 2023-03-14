function generateItems() {
  let ref = rtdb.ref("groups")
  ref.on("value", (snapshot) => {
    let ss = snapshot.val().sort((a, b) => a.gid - b.gid)
    let i = 0
    ss.forEach(element => {
      i += 1
      let ls = []
      for(let i in element.temperature){
        ls.push(element.temperature[i])
      }
      getTempChart(i, ls.slice(-9), element.gid);
    });
  });
}

function getDates() {
  const myArray = [];
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  myArray.push(currentTime);

  for (let i = 8; i >= 0; i--) {
    const prevTime = new Date(now.getTime() - i * 60000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    myArray.unshift(prevTime);
  }

  myArray.pop();
  myArray.reverse();
  return myArray;
}

function getTempChart(i, tempData, gid) {
  const dates = getDates();

  let temps = [];

  if (tempData.length < 9) {
    for (let i = 0; i < 9 - tempData.length; i++) {
      temps.push(0);
    }
    temps.push(...tempData);
  } else {
    temps = tempData;
  }

  const data = {
    labels: dates,
    datasets: [
      {
        borderWidth: 4,
        label: "Surrounding Temperatures of Group: " + gid + " (In °C)",
        data: temps,
        backgroundColor: "#567189",
        borderColor: "#567189",
        lineWidth: 5,
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {
      scales: {
        x: {
          grid: {
            color: "#909090",
          },
        },
        y: {
          grid: {
            color: "#909090",
          },
          beginAtZero: true,
        },
      },
    },
  };

  const div = document.getElementById("temp").children;
  if (div.length === 0) {
    $("div.tempchart").append(`<canvas id="myTempChart${i}"></canvas>`);
  } else {
    $("canvas#myTempChart" + i).remove();
    $("div.tempchart").append(
      `<canvas style="margin-top:100px" id="myTempChart${i}"></canvas>`
    );
  }

  const myChart = new Chart(document.getElementById("myTempChart" + i), config);
}

generateItems();

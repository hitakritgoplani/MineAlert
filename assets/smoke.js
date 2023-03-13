function generateItems() {
  let ref = rtdb.ref("groups")
  ref.on("value", (snapshot) => {
    let ss = snapshot.val().sort((a, b) => a.gid - b.gid)
    let i = 0
    ss.forEach(element => {
      i += 1
      console.log(element.smoke)
      let ls = []
      for(let i in element.smoke){
        ls.push(element.smoke[i])
      }
      getSmokeChart(i, ls.slice(-9), element.gid);
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

function getSmokeChart(i, smokeData, gid) {
  const dates = getDates();

  let temps = [];

  if (smokeData.length < 9) {
    for (let i = 0; i < 9 - smokeData.length; i++) {
      temps.push(0);
    }
    temps.push(...smokeData);
  } else {
    temps = smokeData;
  }

  const data = {
    labels: dates,
    datasets: [
      {
        borderWidth: 4,
        label: "Surrounding Gas Concentration of Group: " + gid,
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

  const div = document.getElementById("smoke").children;
  if (div.length === 0) {
    $("div.smokechart").append(`<canvas id="mySmokeChart${i}"></canvas>`);
  } else {
    $("canvas#mySmokeChart" + i).remove();
    $("div.smokechart").append(
      `<canvas style="margin-top:100px" id="mySmokeChart${i}"></canvas>`
    );
  }

  const myChart = new Chart(
    document.getElementById("mySmokeChart" + i),
    config
  );
}

generateItems();

var personal_conditions = [];
var group_conditions = [];

var sound = new Audio();
sound.src = "../buzzer.mp3";
sound.loop = false;

function generateItems() {
  group_conditions.slice(0, group_conditions.length);
  personal_conditions.slice(0, personal_conditions.length);

  rtdb.ref("miners").on("value", (snapshot) => {
    snapshot.val().forEach((element) => {
      if (
        element.heartrate * -1 >= heartrate_upper_threshold ||
        element.heartrate * -1 <= heartrate_lower_threshold
      ) {
        personal_conditions.push(
          `${element.mname}<br>Heart Rate: ${element.heartrate}<br>Risk: High`
        );
      } else if (element.accelerometer >= accelerometer_threshold) {
        personal_conditions.push(
          `${element.mname}<br>Sudden Acceleration Rate: ${element.accelerometer}<br>Possibility of Fall: High`
        );
      }
    });
    if (personal_conditions.length > 0) {
      $(".alert-popup-personal").css("display", "block");
      createPersonalConditionsList();
      sound.play();
    } else {
      $(".alert-popup-personal").css("display", "none");
      sound.pause();
    }
  });

  rtdb.ref("groups").on("value", (snapshot) => {
    snapshot.val().forEach((element) => {
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
      if (curr_temp >= temperature_upper_threshold) {
        group_conditions.push(
          `Group ${element.gid}<br>Temperature: ${curr_temp}<br>Temperature has crossed upper threshold`
        );
      } else if (curr_temp <= temperature_lower_threshold) {
        group_conditions.push(
          `Group ${element.gid}<br>Temperature: ${curr_temp}<br>Temperature has crossed lower threshold`
        );
      } else if (curr_smoke >= smoke_threshold) {
        group_conditions.push(
          `Group ${element.gid}<br>Gas Concentration: ${curr_smoke}<br>Gas concentration has crossed upper threshold.`
        );
      }
    });
    if (group_conditions.length > 0) {
      $(".alert-popup-groups").css("display", "block");
      createGroupConditionsList();
      sound.play();
    } else {
      $(".alert-popup-groups").css("display", "none");
      sound.pause();
    }
  });
}

function createPersonalConditionsList() {
  let itemsHtml = `<div style="display:flex; justify-content:space-between">
  <h3>Personal Alerts</h3><br>
	<button id="per" onclick="personal_dismiss()">Dismiss</button>
</div>`;
  var newArray = personal_conditions.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  newArray.forEach((item) => {
    itemsHtml += `
		<p>${item}</p>
    `;
  });
  document.querySelector(".alert-popup-personal").innerHTML = itemsHtml;
}

function createGroupConditionsList() {
  let itemsHtml = `<div style="display:flex; justify-content:space-between">
  <h3>Group Alerts</h3><br>
	<button id="grp" onclick="group_dismiss()">Dismiss</button>
</div>`;
  var newArray = group_conditions.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  newArray.forEach((item) => {
    itemsHtml += `
	<p>${item}</p>
	  `;
  });
  document.querySelector(".alert-popup-groups").innerHTML = itemsHtml;
}

function personal_dismiss() {
  personal_conditions.slice(0, personal_conditions.length);
  $(".alert-popup-personal").css("display", "none");
  sound.pause();
}

function group_dismiss() {
  group_conditions.slice(0, group_conditions.length);
  $(".alert-popup-groups").css("display", "none");
  sound.pause();
}

generateItems();

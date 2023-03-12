let suggestions = [];

function generateItems() {
  db.collection("miners")
    .orderBy("mid")
    .onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        suggestions.push(doc.data().mname);
      });
    }); 
}

generateItems();

async function getIdUsingName(mname){
  let docId = ""
  await db.collection("miners")
    .where("mname", "==", mname)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docId = doc.id;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  return docId;
}

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = (e) => {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    icon.onclick = async () => {
        sessionStorage.setItem("docId", await getIdUsingName(userData));
        loadContent("../pages/miner_profile.html");
    }
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li class="search-miner">${data}</li>`);
    });
    searchWrapper.classList.add("active");
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active");
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = async ()=>{
    sessionStorage.setItem("docId", await getIdUsingName(selectData));
    loadContent("../pages/miner_profile.html");
  }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}

function loadContent(url) {
    $.ajax({
      url: url,
      type: "GET",
      success: function (data) {
        $("#content-container").html(data);
      },
      error: function () {
        console.log("Error loading content");
      },
    });
  }

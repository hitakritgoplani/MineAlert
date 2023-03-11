function generateItems() {
  db.collection("miners").orderBy("mid").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      let status = "";
      if (doc.data().heartrate > 120) {
        status = "Very High";
      } else {
        status = "Normal";
      }
      items.push({
        id: doc.id,
        ...doc.data(),
        status: status,
      });
    });
    generateHtml(items);
  });
}

function generateHtml(items) {
  let itemsHtml = "";
  items.forEach((item) => {
    itemsHtml += `
                <div class="item1">
                  <h3 class="t-op-nextlvl">${item.mid}</h3>
                  <h3 class="t-op-nextlvl">${item.gid}</h3>
                  <h3 class="t-op-nextlvl">${item.mname}</h3>
                  <h3 class="t-op-nextlvl">${item.heartrate}</h3>
                  <h3 class="t-op-nextlvl label-tag">${item.status}</h3>
                </div>
            `;
  });
  document.querySelector(".heart_items").innerHTML = itemsHtml;
}

generateItems();
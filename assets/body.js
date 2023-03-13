function generateItems() {
	let ref = rtdb.ref("miners");
	ref.on("value", (snapshot) => {
		let ss = snapshot.val().sort((a, b) => a.temperature - b.temperature);
		let items = [];
		ss.forEach((element) => {
			let status = "";
			if (element.temperature *-1 < 34) {
				status = "Very Low";
			} else if(element.temperature *-1 < 37.6 && element.temperature *-1 > 34) {
				status = "Normal";
			}
			else if(element.temperature *-1 > 37.6 && element.temperature *-1  < 40) {
				status = "High";
			}
			else{
				status="Very High"
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
		if (item.temperature *-1 < 37.6) {
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
				item.temperature *-1+
				"</td>" +
				'<td style="color:green;">' +
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
				item.temperature *-1+
				"</td>" +
				'<td style="color:red;">' +
				item.status +
				"</td>" +
				"</tr>";
		}
		$("#childTableTag").append(itemsHtml);
	});
	document.querySelector(".childTableTag").innerHTML = itemsHtml;
}

generateItems();

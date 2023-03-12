function generateItems() {
	db.collection("miners").orderBy("heartrate").onSnapshot((snapshot) => {
		let items = [];
		snapshot.docs.forEach((doc) => {
			let status = "";
			if (doc.data().heartrate*-1 > 120) {
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
	$('tbody#childTableTag').remove();
	$('table#new-table').append('<tbody id="childTableTag"></tbody>');
	let itemsHtml = "";
	items.forEach((item) => {
		if(item.heartrate*-1 > 120){
			var itemsHtml = '<tr>' +
			'<td>' + item.mid + '</td>' +
			'<td>' + item.gid + '</td>' +
			'<td>' + item.mname + '</td>' +
			'<td>' + item.heartrate * -1 + '</td>' +
			'<td style="color:red;">' + item.status + '</td>' +
			'</tr>';
		}
		else{
			var itemsHtml = '<tr>' +
			'<td>' + item.mid + '</td>' +
			'<td>' + item.gid + '</td>' +
			'<td>' + item.mname + '</td>' +
			'<td>' + item.heartrate * -1 + '</td>' +
			'<td style="color:green;">' + item.status + '</td>' +
			'</tr>';
		}
		$('#childTableTag').append(itemsHtml);

	});
	document.querySelector(".childTableTag").innerHTML = itemsHtml;
}

generateItems();